package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.MeetingWithoutId;
import de.neuefische.readandmeet.backend.service.MeetingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping
    public List<Meeting> listOfMeetings() {
        return this.meetingService.list();
    }

    @PostMapping
    public List<Meeting> addNewMeeting(@RequestBody MeetingWithoutId meetingWithoutId) {
        this.meetingService.add(meetingWithoutId);
        return this.meetingService.list();
    }
}
