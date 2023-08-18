package de.neuefische.readandmeet.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MongoUserTest {

    private MongoUser user;

    @BeforeEach
    void setUp() {
        user = new MongoUser("123", "booklover", "booklover123");
    }

    @Test
    void id() {
        assertEquals("123", this.user.id());
    }

    @Test
    void username() {
        assertEquals("booklover", this.user.username());
    }

    @Test
    void password() {
        assertEquals("booklover123", this.user.password());
    }
}
