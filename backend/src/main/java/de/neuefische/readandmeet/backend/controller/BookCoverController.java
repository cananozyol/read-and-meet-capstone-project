package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.service.BookCoverService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BookCoverController {

    private final BookCoverService bookCoverService;

    public BookCoverController(BookCoverService bookCoverService) {
        this.bookCoverService = bookCoverService;
    }

    @GetMapping("/bookcovers")
    public List<String> fetchAndGenerateCoverUrls(@RequestParam String title, @RequestParam String author) {
        return bookCoverService.fetchAndGenerateCoverUrls(title, author);
    }

}
