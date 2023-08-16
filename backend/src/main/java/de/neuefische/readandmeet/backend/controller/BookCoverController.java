package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.BookCoverInfo;
import de.neuefische.readandmeet.backend.service.BookCoverService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class BookCoverController {

    private final BookCoverService bookCoverService;

    public BookCoverController(BookCoverService bookCoverService) {
        this.bookCoverService = bookCoverService;
    }

    @GetMapping("/bookcover")
    public BookCoverInfo fetchFirstCoverInfo(@RequestParam String title, @RequestParam String author) {
        return bookCoverService.fetchFirstCoverInfo(title, author);
    }
}
