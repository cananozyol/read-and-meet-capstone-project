package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MeetingServiceTest {

    MeetingRepo meetingRepo = mock(MeetingRepo.class);

    MeetingService meetingService = new MeetingService(meetingRepo);

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
}