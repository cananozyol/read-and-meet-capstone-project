package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.Genre;
import de.neuefische.readandmeet.backend.model.Status;
import de.neuefische.readandmeet.backend.repository.BookRepo;
import de.neuefische.readandmeet.backend.security.MongoUser;
import de.neuefische.readandmeet.backend.security.MongoUserRepository;
import de.neuefische.readandmeet.backend.service.BookService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;


@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private BookService bookService;

    @Autowired
    private MongoUserRepository userRepository;

    @Test
    @DirtiesContext
    @WithMockUser(username = "booklover", password = "booklover123")
    void expectBookList_whenGETBookList() throws Exception {
        //GIVEN
        MongoUser user = new MongoUser("123", "booklover", "booklover123");
        userRepository.save(user);

        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(new Book("1", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE,  Status.READ,4, "123"));
        expectedBooks.add(new Book("2", "Resonance Surge", "Nalini Singh", Genre.FANTASY, Status.READ,4, "123"));

        bookRepo.insert(expectedBooks);

        String expected = """
                [
                  {
                    "id": "1",
                    "title": "Pride and Prejudice",
                    "author": "Jane Austen",
                    "genre": "ROMANCE"
                  },
                  {
                    "id": "2",
                    "title": "Resonance Surge",
                    "author": "Nalini Singh",
                    "genre": "FANTASY"
                  }
                ]
                """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books").contentType(MediaType.APPLICATION_JSON))

                //THEN
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectBookCreated_whenPOSTNewBook() throws Exception {
        //GIVEN
        String bookWithoutId = """
                            {
                                "title": "The Great Gatsby",
                                "author": "F. Scott Fitzgerald",
                                "genre": "CLASSIC",
                                "status": "NOT_READ",
                                "rating": null
                            }
                           """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/books").content(bookWithoutId).contentType(MediaType.APPLICATION_JSON).with(csrf()))

                //THEN
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("The Great Gatsby"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].author").value("F. Scott Fitzgerald"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].genre").value("CLASSIC"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].status").value("NOT_READ"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].rating").value(0))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectBookUpdated_whenPUTBook() throws Exception {
        //GIVEN
        List<Book> initialBooks = new ArrayList<>();
        initialBooks.add(new Book("1", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.NOT_READ, 0, "123"));
        bookRepo.insert(initialBooks);
        String bookId = bookService.list().get(0).getId();

        String updatedBook = """
                {
                    "title": "Pride and Prejudice",
                    "author": "Jane Austen",
                    "genre": "ROMANCE",
                    "status": "READ",
                    "rating": 5
                }
                """;

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/books/" + bookId)
                        .content(updatedBook)
                        .contentType(MediaType.APPLICATION_JSON).with(csrf()))

                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(updatedBook));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectBookDeleted_whenDELETEBook() throws Exception {
        //GIVEN
        List<Book> initialBooks = new ArrayList<>();
        initialBooks.add(new Book("1", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4, "123"));
        bookRepo.insert(initialBooks);
        String bookId = bookService.list().get(0).getId();

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/" + bookId).with(csrf()))

                //THEN
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        //VERIFY
        assertFalse(bookService.list().stream().anyMatch(book -> book.getId().equals(bookId)));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectBookById_whenGETBookById() throws Exception {
        //GIVEN
        String bookWithoutId = """
                {
                    "title": "Pride and Prejudice",
                    "author": "Jane Austen",
                    "genre": "ROMANCE",
                    "status": "READ",
                    "rating": 4
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/books").content(bookWithoutId).contentType(MediaType.APPLICATION_JSON).with(csrf()));

        String bookId = bookService.list().get(0).getId();

        String expected = """
                {
                    "id": "%s",
                    "title": "Pride and Prejudice",
                    "author": "Jane Austen",
                    "genre": "ROMANCE",
                    "status": "READ",
                    "rating": 4
                }
                """.formatted(bookId);

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/" + bookId))

                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expected));
    }

    @Test
    @WithMockUser
    void expectNotFoundStatus_whenGetBookByIdWithNonexistentId() throws Exception {
        //GIVEN
        String nonExistentId = "non_existent_id";

        //WHEN & THEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/" + nonExistentId))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
