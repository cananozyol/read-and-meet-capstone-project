package de.neuefische.readandmeet.backend.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Book not found!")
public class NoSuchBookException extends RuntimeException {
    public NoSuchBookException(String id) {
        super("Book not found for ID: " + id);
    }
}
