package de.neuefische.readandmeet.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookEditData {

    private Genre genre;
    private Status status;
    private int rating;

}
