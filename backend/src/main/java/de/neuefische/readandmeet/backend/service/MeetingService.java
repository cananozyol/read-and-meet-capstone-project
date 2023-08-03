package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.exceptions.NoSuchMeetingException;
import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.MeetingWithoutId;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MeetingService {

    private final MeetingRepo meetingRepo;

    private final UuIdService uuIdService;


    public MeetingService(MeetingRepo meetingRepo, UuIdService uuIdService) {
        this.meetingRepo = meetingRepo;
        this.uuIdService = uuIdService;
    }

    public List<Meeting> list() {
        return this.meetingRepo.findAll();
    }

    public Meeting add(MeetingWithoutId m) {
        String id = uuIdService.getRandomId();
        Meeting meeting = new Meeting(id, m.getTitle(), m.getDate(), m.getLocation(), m.getBookId());
        return this.meetingRepo.insert(meeting);
    }
    public Meeting getDetails(String id) {
        return this.meetingRepo.findById(id).orElseThrow(() -> new NoSuchMeetingException(id));
    }

    public void delete(String id) {
        Meeting meeting = this.meetingRepo.findById(id)
                .orElseThrow(() -> new NoSuchMeetingException("Meeting with ID " + id + " not found"));
        this.meetingRepo.delete(meeting);
    }

    public Meeting editMeetingById(MeetingWithoutId m, String id) {
        Meeting meeting = this.meetingRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Meeting with ID " + id + " not found"));

        Meeting editedMeeting = new Meeting(meeting.getId(), m.getTitle(), m.getDate(), m.getLocation(), m.getBookId());

        return this.meetingRepo.save(editedMeeting);
    }
}
