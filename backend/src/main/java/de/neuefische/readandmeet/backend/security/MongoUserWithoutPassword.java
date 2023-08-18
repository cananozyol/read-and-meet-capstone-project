package de.neuefische.readandmeet.backend.security;

public record MongoUserWithoutPassword(

        String id,
        String username
) {
}
