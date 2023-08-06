package de.neuefische.readandmeet.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = NoSuchMeetingException.NOT_FOUND_MESSAGE)
public class NoSuchMeetingException extends RuntimeException {
    public static final String NOT_FOUND_MESSAGE = "Meeting not found!";

    public NoSuchMeetingException(String id) {
        super("Meeting not found for ID: " + id);
    }
}
