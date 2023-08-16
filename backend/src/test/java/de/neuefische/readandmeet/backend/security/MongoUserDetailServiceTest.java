package de.neuefische.readandmeet.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MongoUserDetailServiceTest {
    private final MongoUserRepository userRepository = mock(MongoUserRepository.class);
    private final MongoUserDetailService userDetailService = new MongoUserDetailService(userRepository);

    @Test
    void loadUserByUsername() {
        //GIVEN
        MongoUser expected = new MongoUser("123", "booklover", "booklover123");
        String username = "booklover";
        //WHEN
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(expected));
        UserDetails actual = userDetailService.loadUserByUsername("booklover");
        //THEN
        assertEquals(expected.username(), actual.getUsername());
        verify(userRepository).findByUsername(username);
    }

}

