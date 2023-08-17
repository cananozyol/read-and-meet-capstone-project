package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.exceptions.NoSuchMeetingException;
import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.MeetingWithoutId;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import de.neuefische.readandmeet.backend.security.MongoUserService;
import de.neuefische.readandmeet.backend.security.MongoUserWithoutPassword;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MeetingService {

    private final MeetingRepo meetingRepo;
    private final UuIdService uuIdService;
    private final MongoUserService mongoUserService;


    public List<Meeting> list() {
        return this.meetingRepo.findAll();
    }

    public Meeting add(MeetingWithoutId meetingWithoutId) {
        String id = uuIdService.getRandomId();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUserWithoutPassword user = mongoUserService.findByUsername(username);
        Meeting meeting = new Meeting(id, meetingWithoutId.getTitle(), meetingWithoutId.getDate(), meetingWithoutId.getLocation(), meetingWithoutId.getBook(), user.id());
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
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MongoUserWithoutPassword user = mongoUserService.findByUsername(username);

        Meeting meeting = this.meetingRepo.findById(id)
                .orElseThrow(() -> new NoSuchMeetingException(id));

        Meeting editedMeeting = new Meeting(meeting.getId(), meetingWithoutId.getTitle(), meetingWithoutId.getDate(), meetingWithoutId.getLocation(), meetingWithoutId.getBook(), user.id());

        return this.meetingRepo.save(editedMeeting);
    }

}
