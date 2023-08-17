package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.exceptions.NoSuchBookException;
import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.BookEditData;
import de.neuefische.readandmeet.backend.model.BookWithoutId;
import de.neuefische.readandmeet.backend.repository.BookRepo;
import de.neuefische.readandmeet.backend.security.MongoUserService;
import de.neuefische.readandmeet.backend.security.MongoUserWithoutPassword;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepo bookRepo;
    private final UuIdService uuIdService;
    private final MongoUserService mongoUserService;

    public List<Book> list() {
        return bookRepo.findAll();
    }

    public Book addBook(BookWithoutId bookWithoutId) {
        String id = uuIdService.getRandomId();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUserWithoutPassword user = mongoUserService.findByUsername(username);
        Book book = new Book(id, bookWithoutId.getTitle(), bookWithoutId.getAuthor(), bookWithoutId.getGenre(), bookWithoutId.getStatus(), bookWithoutId.getRating(), user.id());
        return bookRepo.insert(book);
    }

    public Book updateBook(String bookId, BookEditData bookEditData) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new NoSuchBookException(bookId));

        book.setStatus(bookEditData.getStatus());
        book.setRating(bookEditData.getRating());

        return bookRepo.save(book);
    }

    public void deleteBook(String bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new NoSuchBookException(bookId));

        bookRepo.delete(book);
    }

    public Book getBookById(String bookId) {
        return bookRepo.findById(bookId)
                .orElseThrow(() -> new NoSuchBookException(bookId));
    }

}
