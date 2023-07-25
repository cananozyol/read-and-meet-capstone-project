package de.neuefische.readandmeet.backend.repository;

import de.neuefische.readandmeet.backend.model.Meeting;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepo extends MongoRepository<Meeting, String> {
}
