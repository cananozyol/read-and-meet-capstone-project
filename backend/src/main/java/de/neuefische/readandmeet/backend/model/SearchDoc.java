package de.neuefische.readandmeet.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SearchDoc {

    @JsonProperty("cover_i")
    private Integer coverId;

    public Integer getCoverId() {
        return coverId;
    }

    public void setCoverId(Integer coverId) {
        this.coverId = coverId;
    }
}
