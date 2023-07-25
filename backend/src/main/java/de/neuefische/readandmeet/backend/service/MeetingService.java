package de.neuefische.readandmeet.backend.service;

import de.neuefische.readandmeet.backend.model.Meeting;
import de.neuefische.readandmeet.backend.repository.MeetingRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService {

    private final MeetingRepo meetingRepo;


    public MeetingService(MeetingRepo meetingRepo) {
        this.meetingRepo = meetingRepo;
    }

    public List<Meeting> list() {
        return this.meetingRepo.findAll();
    }
}
