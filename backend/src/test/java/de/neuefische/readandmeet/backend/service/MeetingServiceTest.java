package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.MeetingWithoutId;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MeetingServiceTest {

    MeetingRepo meetingRepo = mock(MeetingRepo.class);
    UuIdService uuIdService = mock(UuIdService.class);
    MeetingService meetingService = new MeetingService(meetingRepo, uuIdService);

    @Test
    void expectListOfAllMeetings() {
        //GIVEN
        Meeting meeting = new Meeting("123", "book", LocalDate.now(), "online");
        List<Meeting> expected = new ArrayList<>(List.of(meeting));

        //WHEN
        when(meetingRepo.findAll()).thenReturn(expected);
        List<Meeting> actual = meetingService.list();

        //THEN
        verify(meetingRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void whenMeetingAdded_ThenReturnId() {
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
    void expectMeeting_whenPOSTingMeeting() {
        //GIVEN
        MeetingWithoutId meetingWithoutId = new MeetingWithoutId("book", LocalDate.now(), "online");
        Meeting expected = new Meeting("123", "book", LocalDate.now(), "online");

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
    void expectMeeting_whenGETMeetingById() {
        //GIVEN
        Meeting expected = new Meeting("123", "book", LocalDate.now(), "online");

        //WHEN
        when(meetingRepo.findById("abc")).thenReturn(Optional.of(expected));
        Meeting actual = meetingService.getDetails("abc");

        //THEN
        verify(meetingRepo).findById("abc");
        assertEquals(expected, actual);
    }

    @Test
    void expectDeletingMethod_whenDeleteMethodIsCalled() {
        // GIVEN
        String id = "123";
        Meeting expected = new Meeting("123", "book", LocalDate.now(), "online");

        // WHEN
        when(meetingRepo.findById(id)).thenReturn(Optional.of(expected));
        doNothing().when(meetingRepo).delete(expected);

        meetingService.delete(id);

        // THEN
        verify(meetingRepo).findById(id);
        verify(meetingRepo).delete(expected);
    }


    @Test
    void expectEditedMeeting_whenEditingMeeting () {
        //GIVEN
        String id = "123";
        MeetingWithoutId meetingWithoutId = new MeetingWithoutId("book", LocalDate.now(), "online");
        Meeting expected = new Meeting("123", "book", LocalDate.now(), "online");

        //WHEN
        when(meetingRepo.findById(id)).thenReturn(Optional.of(expected));
        when(meetingRepo.save(expected)).thenReturn(expected);
        Meeting actual = meetingService.editMeetingById(meetingWithoutId, id);

        //THEN
        verify(meetingRepo).findById(id);
        verify(meetingRepo).save(expected);
        assertEquals(expected, actual);
    }
}
