package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.exceptions.NoSuchBookException;
import de.neuefische.readandmeet.backend.model.*;
import de.neuefische.readandmeet.backend.repository.BookRepo;
import de.neuefische.readandmeet.backend.security.MongoUserService;
import de.neuefische.readandmeet.backend.security.MongoUserWithoutPassword;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class BookServiceTest {

    BookRepo bookRepo = mock(BookRepo.class);

    UuIdService uuIdService = mock(UuIdService.class);
    MongoUserService mongoUserService = mock(MongoUserService.class);

    Authentication authentication = mock(Authentication.class);

    SecurityContext securityContext = mock(SecurityContext.class);

    BookService bookService = new BookService(bookRepo, uuIdService, mongoUserService);

    String username = "Henry";

    @BeforeEach
    void setUp() {
        when(authentication.getName()).thenReturn(username);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
    }


    @Test
    void listShouldReturnListOfAllBooks() {
        //GIVEN
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(new Book("1", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4, "123"));
        expectedBooks.add(new Book("2", "Resonance Surge", "Nalini Singh", Genre.FANTASY, Status.READING, 4, "123"));

        //WHEN
        when(bookRepo.findAll()).thenReturn(expectedBooks);
        List<Book> actualBooks = bookService.list();

        //THEN
        verify(bookRepo).findAll();
        assertEquals(expectedBooks, actualBooks);
    }

    @Test
    void addBookShouldReturnAddedBook() {
        //GIVEN
        BookWithoutId bookWithoutId = new BookWithoutId("Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4);
        Book expectedBook = new Book("b001", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4, "123");
        MongoUserWithoutPassword mockUser = new MongoUserWithoutPassword("123", "user");

        //WHEN
        when(authentication.getName()).thenReturn("user");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(uuIdService.getRandomId()).thenReturn("b001");
        when(mongoUserService.findByUsername("user")).thenReturn(mockUser);
        when(bookRepo.insert(expectedBook)).thenReturn(expectedBook);
        Book actualBook = bookService.addBook(bookWithoutId);

        //THEN
        verify(uuIdService).getRandomId();
        verify(bookRepo).insert(expectedBook);
        assertEquals(expectedBook, actualBook);
    }

    @Test
    void updateBookShouldReturnUpdatedBook() {
        //GIVEN
        String bookId = "b001";
        Book existingBook = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READING, 4, "123");
        BookEditData updatedBook = new BookEditData(Status.READ, 5);
        Book expectedBook = new Book("b001", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE,  Status.READ, 5, "123");

        //WHEN
        when(bookRepo.findById(bookId)).thenReturn(Optional.of(existingBook));
        when(bookRepo.save(expectedBook)).thenReturn(expectedBook);
        Book actualBook = bookService.updateBook(bookId, updatedBook);

        //THEN
        verify(bookRepo).findById(bookId);
        verify(bookRepo).save(expectedBook);
        assertEquals(expectedBook, actualBook);
    }

    @Test
    void getBookByIdShouldReturnBookWithMatchingId() {
        //GIVEN
        String bookId = "b001";
        Book expectedBook = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4, "123");

        //WHEN
        when(bookRepo.findById(bookId)).thenReturn(Optional.of(expectedBook));
        Book actualBook = bookService.getBookById(bookId);

        //THEN
        verify(bookRepo).findById(bookId);
        assertEquals(expectedBook, actualBook);
    }

    @Test
    void deleteBookShouldDeleteBookWithMatchingId() {
        //GIVEN
        String bookId = "1";
        Book existingBook = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4, "123");

        //WHEN
        when(bookRepo.findById(bookId)).thenReturn(Optional.of(existingBook));
        doNothing().when(bookRepo).delete(existingBook);
        bookService.deleteBook(bookId);

        //THEN
        verify(bookRepo).findById(bookId);
        verify(bookRepo).delete(existingBook);
    }

    @Test
    void expectNoSuchBookException_whenGetBookByIdWithNonexistentId() {
        //GIVEN
        String nonExistentId = "non_existent_id";

        //WHEN & THEN
        assertThrows(NoSuchBookException.class, () -> bookService.getBookById(nonExistentId));

    }
    @Test
    void testGetLabel() {
        // GIVEN
        Status notRead = Status.NOT_READ;
        Status reading = Status.READING;
        Status read = Status.READ;

        // WHEN
        String notReadLabel = notRead.getLabel();
        String readingLabel = reading.getLabel();
        String readLabel = read.getLabel();

        // THEN
        assertEquals("Not Read", notReadLabel);
        assertEquals("Reading", readingLabel);
        assertEquals("Read", readLabel);
    }
}
