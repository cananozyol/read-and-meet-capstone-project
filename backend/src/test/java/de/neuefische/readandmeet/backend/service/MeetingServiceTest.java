package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.exceptions.NoSuchMeetingException;
import de.neuefische.readandmeet.backend.model.*;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class MeetingServiceTest {


    MeetingRepo meetingRepo = mock(MeetingRepo.class);
    UuIdService uuIdService = mock(UuIdService.class);
    MeetingService meetingService = new MeetingService(meetingRepo, uuIdService);
    Book book = new Book("b001", "The Great Gatsby", "F. Scott Fitzgerald", Genre.CLASSIC, Status.NOT_READ, 0);

    @Test
    void expectListOfAllMeetings() {
        //GIVEN
        Meeting meeting = new Meeting("123", "book", LocalDate.now(), "online", book);
        List<Meeting> expected = new ArrayList<>(List.of(meeting));

        //WHEN
        when(meetingRepo.findAll()).thenReturn(expected);
        List<Meeting> actual = meetingService.list();

        //THEN
        verify(meetingRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void expectId_whenMeetingIsAdded() {
        //GIVEN
        String expected = "123";

        //WHEN
        when(uuIdService.getRandomId()).thenReturn("123");
        String actual = uuIdService.getRandomId();

        //THEN
        verify(uuIdService).getRandomId();
        assertEquals(expected, actual);
    }

    @Test
    void expectMeeting_whenAddingMeeting() {
        //GIVEN
        MeetingWithoutId meetingWithoutId = new MeetingWithoutId("book", LocalDate.now(), "online", book);
        Meeting expected = new Meeting("123", "book", LocalDate.now(), "online", book);

        //WHEN
        when(uuIdService.getRandomId()).thenReturn("123");
        when(meetingRepo.insert(expected)).thenReturn(expected);
        Meeting actual = meetingService.add(meetingWithoutId);

        //THEN
        verify(uuIdService).getRandomId();
        verify(meetingRepo).insert(expected);
        assertEquals(expected, actual);
    }

    @Test
    void expectMeeting_whenMeetingGetById() {
        //GIVEN
        String id = "123";
        Meeting expected = new Meeting(id, "book", LocalDate.now(), "online", book);

        //WHEN
        when(meetingRepo.findById(id)).thenReturn(Optional.of(expected));
        Meeting actual = meetingService.getDetails(id);

        //THEN
        verify(meetingRepo).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void expectDeletingMethod_whenDeleteMethodIsCalled() {
        //GIVEN
        String id = "123";
        Meeting expected = new Meeting("123", "book", LocalDate.now(), "online", book);

        //WHEN
        when(meetingRepo.findById(id)).thenReturn(Optional.of(expected));
        doNothing().when(meetingRepo).delete(expected);

        meetingService.delete(id);

        //THEN
        verify(meetingRepo).findById(id);
        verify(meetingRepo).delete(expected);
    }

    @Test
    void expectEditedMeeting_whenEditingMeeting () {
        //GIVEN
        String id = "123";
        Meeting existingMeeting = new Meeting("123", "book", LocalDate.now(), "online", book);
        MeetingWithoutId updatedMeeting = new MeetingWithoutId("books", LocalDate.now(), "home", book);
        Meeting expected = new Meeting("123", "books", LocalDate.now(), "home", book);

        //WHEN
        when(meetingRepo.findById(id)).thenReturn(Optional.of(existingMeeting));
        when(meetingRepo.save(expected)).thenReturn(expected);
        Meeting actual = meetingService.editMeetingById(updatedMeeting, id);

        //THEN
        verify(meetingRepo).findById(id);
        verify(meetingRepo).save(expected);
        assertEquals(expected, actual);
    }
    @Test
    void expectNoSuchMeetingException_whenGetMeetingByIdWithNonexistentId() {
        //GIVEN
        String nonExistentId = "non_existent_id";

        //WHEN & THEN
        assertThrows(NoSuchMeetingException.class, () -> {
            meetingService.getDetails(nonExistentId);
        });
    }
}
