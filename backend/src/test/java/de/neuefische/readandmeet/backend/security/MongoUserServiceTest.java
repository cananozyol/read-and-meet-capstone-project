package de.neuefische.readandmeet.backend.security;

import de.neuefische.readandmeet.backend.exceptions.UsernameAlreadyExistsException;
import de.neuefische.readandmeet.backend.service.UuIdService;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MongoUserServiceTest {

    private final MongoUserRepository userRepository = mock(MongoUserRepository.class);
    private final UuIdService uuIdService = mock(UuIdService.class);
    private final MongoUserService userService = new MongoUserService(userRepository, uuIdService);


    @Test
    void expectUserWithoutPassword() {
        //GIVEN
        MongoUser expected = new MongoUser("123", "booklover", "booklover123");
        String username = "booklover";
        //WHEN
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(expected));
        MongoUserWithoutPassword actual = userService.findByUsername(username);
        //THEN
        verify(userRepository, times(2)).findByUsername(username);
        assertEquals(expected.id(), actual.id());
    }

    @Test
    void expectUserUsernameAlreadyExistsException_whenRegisteringWithExistingUsername() {
        //GIVEN
        String username = "booklover";
        MongoUserWithoutId user = new MongoUserWithoutId("booklover", "booklover123");
        UsernameAlreadyExistsException exception = new UsernameAlreadyExistsException();
        //WHEN
        when(userRepository.findByUsername(username)).thenThrow(exception);
        //THEN
        assertThrows(RuntimeException.class, () -> userService.registerUser(user));
        assertInstanceOf(RuntimeException.class, exception);
    }

    @Test
    void testExceptionConstructorWithMessageAndCause() {
        //GIVEN
        String message = "Username already exists!";
        Throwable cause = new RuntimeException("Some cause");
        UsernameAlreadyExistsException exception = new UsernameAlreadyExistsException(message, cause);
        //THEN
        assertEquals(message, exception.getMessage());
        assertEquals(cause, exception.getCause());
    }

    @Test
    void testExceptionConstructorWithCause() {
        //GIVEN
        Throwable cause = new RuntimeException("Some cause");
        UsernameAlreadyExistsException exception = new UsernameAlreadyExistsException(cause);
        //THEN
        assertEquals(cause, exception.getCause());
    }

    @Test
    void testUpdateUser() {
        //GIVEN
        String userId = "123";
        String username = "booklover";
        String password = "booklover123";

        MongoUserWithoutPassword inputUser = new MongoUserWithoutPassword(userId, username);
        MongoUser existingUser = new MongoUser(userId, "oldUsername", password);
        MongoUser updatedUser = new MongoUser(userId, username, password);

        //WHEN
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(updatedUser)).thenReturn(updatedUser);
        MongoUserWithoutPassword resultUser = userService.updateUser(inputUser);

        //THEN
        assertEquals(userId, resultUser.id());
        assertEquals(username, resultUser.username());
        verify(userRepository).findById(userId);
        verify(userRepository).save(updatedUser);
    }

    @Test
    void testUpdateUserNotFound() {
        //GIVEN
        String userId = "123";
        String username = "booklover";

        //WHEN
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        MongoUserWithoutPassword inputUser = new MongoUserWithoutPassword(userId, username);

        //THEN
        assertThrows(UsernameNotFoundException.class, () -> userService.updateUser(inputUser));
        verify(userRepository).findById(userId);
        verify(userRepository, never()).save(any());
    }
}
