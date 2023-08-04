package de.neuefische.readandmeet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Document(collection = "meetings")
public class Meeting {

    @Id
    private final String id;
    private String title;
    private LocalDate date;
    private String location;
    private Book book;
}
