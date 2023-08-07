package de.neuefische.readandmeet.backend.controller;

import de.neuefische.readandmeet.backend.exceptions.NoSuchMeetingException;
import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.MeetingWithoutId;
import de.neuefische.readandmeet.backend.service.MeetingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<Meeting>> addNewMeeting(@RequestBody MeetingWithoutId meetingWithoutId) {
        this.meetingService.add(meetingWithoutId);
        List<Meeting> meetings = this.meetingService.list();
        return ResponseEntity.status(HttpStatus.CREATED).body(meetings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable String id) {
        try {
            Meeting meeting = this.meetingService.getDetails(id);
            return ResponseEntity.ok(meeting);
        } catch (NoSuchMeetingException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        try {
            this.meetingService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchMeetingException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meeting> updateMeetingById(@PathVariable String id, @RequestBody MeetingWithoutId meetingWithoutId) {
        try {
            Meeting updatedMeeting = this.meetingService.editMeetingById(meetingWithoutId, id);
            return ResponseEntity.ok(updatedMeeting);
        } catch (NoSuchMeetingException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/books")
    public ResponseEntity<List<Book>> getBooksForMeeting(@PathVariable String id) {
        try {
            List<Book> booksForMeeting = meetingService.getBookByMeetingId(id);

            return ResponseEntity.ok(booksForMeeting);
        } catch (NoSuchMeetingException e) {
            return ResponseEntity.notFound().build();
        }
    }


}
