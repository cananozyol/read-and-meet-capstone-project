package de.neuefische.readandmeet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "books")
public class Book {

    @Id
    private final String id;
    private final String title;
    private final String author;
    private Genre genre;
    private Status status;
    private int rating;
    String userId;
}
