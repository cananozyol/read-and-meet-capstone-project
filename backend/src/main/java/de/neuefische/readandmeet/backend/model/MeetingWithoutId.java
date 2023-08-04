package de.neuefische.readandmeet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetingWithoutId {

    private String title;
    private LocalDate date;
    private String location;
    private Book book;
}
