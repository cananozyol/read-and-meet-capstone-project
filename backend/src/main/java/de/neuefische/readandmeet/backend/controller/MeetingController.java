package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.MeetingWithoutId;
import de.neuefische.readandmeet.backend.service.MeetingService;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    public List<Meeting> addNewMeeting(@RequestBody MeetingWithoutId meetingWithoutId) {
        this.meetingService.add(meetingWithoutId);
        return this.meetingService.list();
    }

    @GetMapping("/{id}")
    public Meeting getMeetingById(@PathVariable String id) {
        return this.meetingService.getDetails(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable String id) {
        this.meetingService.delete(id);
    }

    @PutMapping("/{id}")
    public Meeting updateMeetingById(@PathVariable String id, @RequestBody MeetingWithoutId meetingWithoutId) {
        return this.meetingService.editMeetingById(meetingWithoutId, id);
    }

    @GetMapping("/{id}/books")
    public List<Book> getBooksForMeeting(@PathVariable String id) {
        return meetingService.getBookByMeetingId(id);
    }
}
