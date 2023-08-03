package de.neuefische.readandmeet.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.BookWithoutId;
import de.neuefische.readandmeet.backend.model.Genre;
import de.neuefische.readandmeet.backend.model.Status;
import de.neuefische.readandmeet.backend.repository.BookRepo;
import de.neuefische.readandmeet.backend.service.BookService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private BookService bookService;

    @Test
    @DirtiesContext
    void expectBookList_whenGETBookList() throws Exception {
        //GIVEN
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(new Book("1", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, 4, Status.READ));
        expectedBooks.add(new Book("2", "Resonance Surge", "Nalini Singh", Genre.FANTASY, 4, Status.READ));

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
    void expectBookCreated_whenPOSTNewBook() throws Exception {
        // GIVE
        BookWithoutId newBook = new BookWithoutId("The Great Gatsby", "F. Scott Fitzgerald", Genre.CLASSIC, Status.NOT_READ, 3);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(newBook)))

                // THEN
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    void expectUpdatedBook_whenPUTBook() throws Exception {
        // GIVE
        BookWithoutId initialBook = new BookWithoutId("Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(initialBook)))
                .andExpect(MockMvcResultMatchers.status().isOk());

        String bookId = bookService.list().get(0).getId();

        BookWithoutId updatedBook = new BookWithoutId("Updated Book", "Author Updated", Genre.FANTASY, Status.READING, 5);
        String updatedBookJson = toJson(updatedBook);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/books/" + bookId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedBookJson))

                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(updatedBookJson));

        // VERIFY DATABASE
        Book updatedBookInDatabase = bookRepo.findById(bookId).orElse(null);
        assertNotNull(updatedBookInDatabase);
        assertEquals("Updated Book", updatedBookInDatabase.getTitle());
        assertEquals("Author Updated", updatedBookInDatabase.getAuthor());
        assertEquals(Genre.FANTASY, updatedBookInDatabase.getGenre());
        assertEquals(Status.READING, updatedBookInDatabase.getStatus());
        assertEquals(5, updatedBookInDatabase.getRating());
    }


    @Test
    void expectNoContent_whenDELETEBook() throws Exception {
        // GIVE
        String bookId = "1";

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/" + bookId)
                        .contentType(MediaType.APPLICATION_JSON))

                // THEN
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    void expectBook_whenGETBookById() throws Exception {
        // GIVE
        String bookId = "1";
        Book book = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, 4, Status.READ);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/" + bookId)
                        .contentType(MediaType.APPLICATION_JSON))

                // THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(toJson(book)));
    }

    private String toJson(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }

}