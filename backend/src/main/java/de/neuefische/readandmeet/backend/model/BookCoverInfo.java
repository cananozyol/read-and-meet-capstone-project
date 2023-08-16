package de.neuefische.readandmeet.backend.model;


public class BookCoverInfo {
    private Integer coverId;
    private String coverUrl;

    public BookCoverInfo(Integer coverId, String coverUrl) {
        this.coverId = coverId;
        this.coverUrl = coverUrl;
    }

    public Integer getCoverId() {
        return coverId;
    }

    public String getCoverUrl() {
        return coverUrl;
    }
}
