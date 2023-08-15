package de.neuefische.readandmeet.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;


public class BookCoverDoc {

    @JsonProperty("cover_i")
    private Integer coverId;

    public Integer getCoverId() {
        return coverId;
    }

    public void setCoverId(int i) {
    }
}
