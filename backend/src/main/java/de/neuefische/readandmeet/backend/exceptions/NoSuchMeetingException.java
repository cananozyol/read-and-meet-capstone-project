package de.neuefische.readandmeet.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Meeting not found!")
public class NoSuchMeetingException extends RuntimeException {
    public NoSuchMeetingException(String id) {
        super("Meeting not found for ID: " + id);
    }
}

