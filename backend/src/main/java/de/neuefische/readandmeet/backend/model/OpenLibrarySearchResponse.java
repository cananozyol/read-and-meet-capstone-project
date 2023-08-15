package de.neuefische.readandmeet.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class OpenLibrarySearchResponse {

    @JsonProperty("docs")
    private List<BookCoverDoc> docs;

    public List<BookCoverDoc> getDocs() {
        return docs;
    }

    public void setDocs(List<BookCoverDoc> docs) {
        this.docs = docs;
    }
}
