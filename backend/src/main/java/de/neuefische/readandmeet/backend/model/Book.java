package de.neuefische.readandmeet.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "books")
public class Book {

    @Id
    private final String id;
    private final String title;
    private final String author;
    private Genre genre;
    private Status status;
    private int rating;

    public Book(String id, String title, String author, Genre genre, int rating, Status status) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.status = status;
        this.rating = rating;
    }

    public String getId() { return id;}

    public String getTitle() { return title;}

    public String getAuthor() { return author;}

    public Genre getGenre() { return genre;}

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Status getStatus() { return status;}

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getRating() { return rating;}

    public void setRating(int rating) {
        this.rating = rating;
    }

}
