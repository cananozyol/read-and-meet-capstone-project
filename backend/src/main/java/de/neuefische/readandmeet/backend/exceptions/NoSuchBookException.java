package de.neuefische.readandmeet.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = NoSuchBookException.NOT_FOUND_MESSAGE)
public class NoSuchBookException extends RuntimeException {
    public static final String NOT_FOUND_MESSAGE = "Book not found!";

    public NoSuchBookException(String id) {
        super("Book not found for ID: " + id);
    }
}
