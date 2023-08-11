package de.neuefische.readandmeet.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        return new ErrorMessage(exception.getAllErrors().get(0).getDefaultMessage());
    }

    @ExceptionHandler({NoSuchMeetingException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchMeetingException(NoSuchMeetingException exception) {
        return new ErrorMessage(exception.getMessage());
    }

    @ExceptionHandler({NoSuchBookException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchBookException(NoSuchBookException exception) {
        return new ErrorMessage(exception.getMessage());
    }
}
