package de.neuefische.readandmeet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Meeting {

    @Id
    private String id;
    private String title;
    private LocalDate date;
    private String location;
}
