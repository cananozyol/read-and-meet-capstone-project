package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.exceptions.NoSuchBookException;
import de.neuefische.readandmeet.backend.model.*;
import de.neuefische.readandmeet.backend.repository.BookRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class BookServiceTest {

    BookRepo bookRepo = mock(BookRepo.class);

    UuIdService uuIdService = mock(UuIdService.class);

    BookService bookService = new BookService(bookRepo, uuIdService);

    @Test
    void listShouldReturnListOfAllBooks() {
        //GIVEN
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(new Book("1", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4));
        expectedBooks.add(new Book("2", "Resonance Surge", "Nalini Singh", Genre.FANTASY, Status.READING, 4));

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
        Book expectedBook = new Book("b001", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4);

        //WHEN
        when(uuIdService.getRandomId()).thenReturn("b001");
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
        Book existingBook = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READING, 4);
        BookEditData updatedBook = new BookEditData(Genre.FANTASY, Status.READ, 5);
        Book expectedBook = new Book("b001", "Pride and Prejudice", "Jane Austen", Genre.FANTASY,  Status.READ, 5);

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
        Book expectedBook = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4);

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
        Book existingBook = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4);

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
