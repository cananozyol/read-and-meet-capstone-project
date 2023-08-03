package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.BookWithoutId;
import de.neuefische.readandmeet.backend.model.Genre;
import de.neuefische.readandmeet.backend.model.Status;
import de.neuefische.readandmeet.backend.repository.BookRepo;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BookServiceTest {

    BookRepo bookRepo = mock(BookRepo.class);

    UuIdService uuIdService = mock(UuIdService.class);

    BookService bookService = new BookService(bookRepo, uuIdService);

    @Test
    void listShouldReturnListOfAllBooks() {
        // GIVE
        List<Book> expectedBooks = new ArrayList<>();
        expectedBooks.add(new Book("1", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, 4, Status.READ));
        expectedBooks.add(new Book("2", "Resonance Surge", "Nalini Singh", Genre.FANTASY, 4, Status.READ));

        //WHEN
        when(bookRepo.findAll()).thenReturn(expectedBooks);
        List<Book> actualBooks = bookService.list();

        //THEN
        verify(bookRepo).findAll();
        assertEquals(expectedBooks, actualBooks);
    }

    @Test
    void addBookShouldReturnAddedBook() {
        // GIVE
        BookWithoutId bookWithoutId = new BookWithoutId("Pride and Prejudice", "Jane Austen", Genre.ROMANCE, Status.READ, 4);

        String generatedId = "1";
        when(uuIdService.getRandomId()).thenReturn(generatedId);

        Book expectedBook = new Book("1", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, 4, Status.READ);
        when(bookRepo.insert(any(Book.class))).thenReturn(expectedBook);

        // WHEN
        Book actualBook = bookService.addBook(bookWithoutId);

        // THEN
        verify(uuIdService).getRandomId();
        verify(bookRepo).insert(any(Book.class));
        assertEquals(expectedBook, actualBook);
    }

    @Test
    void updateBookShouldReturnUpdatedBook() {
        // GIVE
        String bookId = "1";
        BookWithoutId updatedBook = new BookWithoutId("Resonance Surge", "Nalini Singh", Genre.FANTASY, Status.READ, 4);

        Book existingBook = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, 4, Status.READ);
        when(bookRepo.findById(bookId)).thenReturn(Optional.of(existingBook));

        Book expectedBook = new Book("1", "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, 4, Status.READ);
        when(bookRepo.save(any(Book.class))).thenReturn(expectedBook);

        // WHEN
        Book actualBook = bookService.updateBook(bookId, updatedBook);

        // THEN
        verify(bookRepo).findById(bookId);
        verify(bookRepo).save(any(Book.class));
        assertEquals(expectedBook, actualBook);
    }

    @Test
    void getBookByIdShouldReturnBookWithMatchingId() {
        // GIVE
        String bookId = "1";
        Book expectedBook = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, 4, Status.READ);
        when(bookRepo.findById(bookId)).thenReturn(Optional.of(expectedBook));

        // WHEN
        Book actualBook = bookService.getBookById(bookId);

        // THEN
        verify(bookRepo).findById(bookId);
        assertEquals(expectedBook, actualBook);
    }

    @Test
    void deleteBookShouldDeleteBookWithMatchingId() {
        // GIVE
        String bookId = "1";
        Book existingBook = new Book(bookId, "Pride and Prejudice", "Jane Austen", Genre.ROMANCE, 4, Status.READ);
        when(bookRepo.findById(bookId)).thenReturn(Optional.of(existingBook));

        // WHEN
        bookService.deleteBook(bookId);

        // THEN
        verify(bookRepo).findById(bookId);
        verify(bookRepo).delete(existingBook);
    }


}