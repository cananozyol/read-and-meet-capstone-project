package de.neuefische.readandmeet.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookCoverDoc {

    @JsonProperty("cover_i")
    private Integer coverId;

    public Integer getCoverId() {
        return coverId;
    }

}
