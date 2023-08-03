package de.neuefische.readandmeet.backend.model;

public enum Status {
    NOT_READ("Not Read"),
    READING("Reading"),
    READ("Read");

    private final String label;

    Status(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
