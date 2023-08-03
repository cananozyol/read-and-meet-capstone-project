package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.exceptions.NoSuchBookException;
import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.BookWithoutId;
import de.neuefische.readandmeet.backend.repository.BookRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepo bookRepo;
    private final UuIdService uuIdService;

    public BookService(BookRepo bookRepo, UuIdService uuIdService) {
        this.bookRepo = bookRepo;
        this.uuIdService = uuIdService;
    }

    public List<Book> list() {
        return bookRepo.findAll();
    }

    public Book addBook(BookWithoutId b) {
        String id = uuIdService.getRandomId();
        Book book = new Book(id, b.getTitle(), b.getAuthor(), b.getGenre(), b.getRating(), b.getStatus());
        return bookRepo.insert(book);
    }

    public Book updateBook(String bookId, BookWithoutId b) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new NoSuchBookException("Book with ID " + bookId + " not found"));

        book.setGenre(b.getGenre());
        book.setStatus(b.getStatus());
        book.setRating(b.getRating());

        return bookRepo.save(book);
    }

    public void deleteBook(String bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new NoSuchBookException("Book with ID " + bookId + " not found"));

        bookRepo.delete(book);
    }

    public Book getBookById(String bookId) {
        return bookRepo.findById(bookId)
                .orElseThrow(() -> new NoSuchBookException("Book with ID " + bookId + " not found"));
    }
}

