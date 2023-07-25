package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.service.MeetingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
