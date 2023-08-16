package de.neuefische.readandmeet.backend.security;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record MongoUserWithoutId(
        @NotEmpty
        @Size(min=3, max=13, message = "Username must be between 3 and 13 characters")
        String username,

        @NotBlank
        @Size(min = 3, max = 25, message = "Invalid password")
        String password
) {
}
