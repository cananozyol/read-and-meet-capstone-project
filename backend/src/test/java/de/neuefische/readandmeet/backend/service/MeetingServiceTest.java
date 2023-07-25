package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.MeetingWithoutId;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
        assertEquals(expected, actual);
        verify(meetingRepo).findAll();
    }

    @Test
    void whenMeetingAdded_ThenReturnId() {
        //GIVEN
        String expected = "123";

        //WHEN
        when(uuIdService.getRandomId()).thenReturn("123");
        String actual = uuIdService.getRandomId();

        //THEN
        assertEquals(expected, actual);
        verify(uuIdService).getRandomId();
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
        assertEquals(expected, actual);
        verify(uuIdService).getRandomId();
        verify(meetingRepo).insert(expected);
    }
}