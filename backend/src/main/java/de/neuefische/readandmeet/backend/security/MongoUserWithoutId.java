package de.neuefische.readandmeet.backend.security;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record MongoUserWithoutId(
        @NotEmpty
        @Size(min=3, max=13, message = "Username must be between 3 and 13 characters")
        String username,

        @NotBlank
        @Size(min = 3, max = 13, message = "Invalid password")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$", message = "Password must contain at least one lowercase letter, one uppercase letter, and one digit")
        String password
) {
}
