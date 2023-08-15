package de.neuefische.readandmeet.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class OpenLibrarySearchResponse {

    @JsonProperty("docs")
    private List<BookCoverDoc> docs;

    public List<BookCoverDoc> getDocs() {
        return docs;
    }
}
