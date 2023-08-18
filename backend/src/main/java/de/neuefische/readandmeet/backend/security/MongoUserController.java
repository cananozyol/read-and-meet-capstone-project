package de.neuefische.readandmeet.backend.security;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class MongoUserController {

    private final MongoUserService mongoUserService;


    @GetMapping("/me")
    public MongoUserWithoutPassword getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return mongoUserService.findByUsername(username);
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody MongoUserWithoutId mongoUserWithoutId) {
        mongoUserService.registerUser(mongoUserWithoutId);
        return "registered";
    }
}
