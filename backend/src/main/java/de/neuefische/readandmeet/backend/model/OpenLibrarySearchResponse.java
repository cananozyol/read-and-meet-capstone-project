package de.neuefische.readandmeet.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class OpenLibrarySearchResponse {

    @JsonProperty("docs")
    private List<SearchDoc> docs;

    public List<SearchDoc> getDocs() {
        return docs;
    }

    public void setDocs(List<SearchDoc> docs) {
        this.docs = docs;
    }

}
