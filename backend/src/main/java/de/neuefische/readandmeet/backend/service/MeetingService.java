package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.exceptions.NoSuchBookException;
import de.neuefische.readandmeet.backend.exceptions.NoSuchMeetingException;
import de.neuefische.readandmeet.backend.model.Book;
import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.MeetingWithoutId;
import de.neuefische.readandmeet.backend.repository.BookRepo;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService {

    private final MeetingRepo meetingRepo;
    private final BookRepo bookRepo;

    private final UuIdService uuIdService;

    public MeetingService(MeetingRepo meetingRepo, BookRepo bookRepo, UuIdService uuIdService) {
        this.meetingRepo = meetingRepo;
        this.bookRepo = bookRepo;
        this.uuIdService = uuIdService;
    }

    public List<Meeting> list() {
        return this.meetingRepo.findAll();
    }

    public Meeting add(MeetingWithoutId meetingWithoutId) {
        String id = uuIdService.getRandomId();
        Meeting meeting = new Meeting(id, meetingWithoutId.getTitle(), meetingWithoutId.getDate(), meetingWithoutId.getLocation(), meetingWithoutId.getBook());
        return this.meetingRepo.insert(meeting);
    }

    public Meeting getDetails(String id) {
        return this.meetingRepo.findById(id).orElseThrow(() -> new NoSuchMeetingException(id));
    }

    public void delete(String id) {
        Meeting meeting = this.meetingRepo.findById(id)
                .orElseThrow(() -> new NoSuchMeetingException(id));
        this.meetingRepo.delete(meeting);
    }

    public Meeting editMeetingById(MeetingWithoutId meetingWithoutId, String id) {
        Meeting meeting = this.meetingRepo.findById(id)
                .orElseThrow(() -> new NoSuchMeetingException(id));

        Meeting editedMeeting = new Meeting(meeting.getId(), meetingWithoutId.getTitle(), meetingWithoutId.getDate(), meetingWithoutId.getLocation(), meetingWithoutId.getBook());

        return this.meetingRepo.save(editedMeeting);
    }

    public List<Book> getBookByMeetingId(String id) {
        meetingRepo.findById(id)
                .orElseThrow(() -> new NoSuchBookException(id));
        return bookRepo.findAll();
    }

}
