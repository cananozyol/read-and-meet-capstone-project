package de.neuefische.readandmeet.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "Username already exists!")

public class UsernameAlreadyExistsException extends RuntimeException {

    public UsernameAlreadyExistsException() {
    }

    public UsernameAlreadyExistsException(String message) {
        super(message);
    }

    public UsernameAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public UsernameAlreadyExistsException(Throwable cause) {
        super(cause);
    }
}
