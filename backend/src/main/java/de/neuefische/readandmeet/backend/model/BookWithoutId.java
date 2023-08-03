package de.neuefische.readandmeet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookWithoutId {

    private final String title;
    private final String author;
    private Genre genre;
    private Status status;
    private int rating;
}
