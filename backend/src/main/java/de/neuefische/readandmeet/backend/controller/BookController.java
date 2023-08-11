package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.BookEditData;
import de.neuefische.readandmeet.backend.model.BookWithoutId;
import de.neuefische.readandmeet.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<Book> listOfBooks() {
        return this.bookService.list();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<Book> addNewBook(@RequestBody BookWithoutId bookWithoutId) {
        this.bookService.addBook(bookWithoutId);
        return this.bookService.list();
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable String id, @RequestBody BookEditData bookEditData) {
        return this.bookService.updateBook(id, bookEditData);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBook(@PathVariable String id) {
        this.bookService.deleteBook(id);
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return this.bookService.getBookById(id);
    }
}
