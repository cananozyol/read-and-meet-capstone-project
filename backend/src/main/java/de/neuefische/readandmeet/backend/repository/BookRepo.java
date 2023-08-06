package de.neuefische.readandmeet.backend.repository;

import de.neuefische.readandmeet.backend.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends MongoRepository<Book, String> {
}
