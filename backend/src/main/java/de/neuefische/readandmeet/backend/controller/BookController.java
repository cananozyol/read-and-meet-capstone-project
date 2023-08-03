package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.exceptions.NoSuchBookException;
import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.BookWithoutId;
import de.neuefische.readandmeet.backend.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> listOfBooks() {
        return this.bookService.list();
    }

    @PostMapping
    public ResponseEntity<List<Book>> addNewBook(@RequestBody BookWithoutId bookWithoutId) {
        this.bookService.addBook(bookWithoutId);
        List<Book> books = this.bookService.list();
        return ResponseEntity.status(HttpStatus.CREATED).body(books);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody BookWithoutId bookWithoutId) {
        try {
            Book updatedBook = this.bookService.updateBook(id, bookWithoutId);
            return ResponseEntity.ok(updatedBook);
        } catch (NoSuchBookException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        try {
            this.bookService.deleteBook(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchBookException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        try {
            Book book = this.bookService.getBookById(id);
            return ResponseEntity.ok(book);
        } catch (NoSuchBookException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
