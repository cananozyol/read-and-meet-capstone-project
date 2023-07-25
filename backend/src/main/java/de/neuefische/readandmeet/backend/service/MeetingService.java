package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.model.MeetingWithoutId;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import org.springframework.stereotype.Service;

import java.util.List;

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
        Meeting meeting = new Meeting(id, m.getTitle(), m.getDate(), m.getLocation());
        return this.meetingRepo.insert(meeting);
    }
}
