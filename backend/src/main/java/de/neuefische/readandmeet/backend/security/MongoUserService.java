package de.neuefische.readandmeet.backend.security;

import de.neuefische.readandmeet.backend.exceptions.UsernameAlreadyExistsException;
import de.neuefische.readandmeet.backend.service.UuIdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class MongoUserService {

    private final MongoUserRepository mongoUserRepository;
    private final UuIdService uuIdService;

    public MongoUserWithoutPassword findByUsername(String username) {
        if (mongoUserRepository.findByUsername(username).isEmpty()) {
            return new MongoUserWithoutPassword("unknown", "anonymousUser");
        }
        MongoUser mongoUser = mongoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));

        return new MongoUserWithoutPassword(mongoUser.id(), mongoUser.username());
    }

    public void registerUser(MongoUserWithoutId mongoUserWithoutId) {
        if (mongoUserRepository.findByUsername(mongoUserWithoutId.username()).isPresent()) {
            throw new UsernameAlreadyExistsException("User already exists");
        }

        PasswordEncoder encoder = new Argon2PasswordEncoder(16, 32, 8, 1 << 16, 4);
        String encodedPassword = encoder.encode(mongoUserWithoutId.password());

        MongoUser newUser = new MongoUser(uuIdService.getRandomId(), mongoUserWithoutId.username(), encodedPassword);
        mongoUserRepository.insert(newUser);
    }

    public MongoUserWithoutPassword updateUser(MongoUserWithoutPassword mongoUserWithoutPassword) {
        MongoUser mongoUser = mongoUserRepository.findById(mongoUserWithoutPassword.id()).orElseThrow(() -> new UsernameNotFoundException("Username " + mongoUserWithoutPassword.username() + " not found"));
        MongoUser updatedUser = new MongoUser(
                mongoUserWithoutPassword.id(),
                mongoUserWithoutPassword.username(),
                mongoUser.password());

        MongoUser returnUser = mongoUserRepository.save(updatedUser);
        return new MongoUserWithoutPassword(returnUser.id(), returnUser.username());
    }
}
