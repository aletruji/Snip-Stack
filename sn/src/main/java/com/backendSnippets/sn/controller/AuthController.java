package com.backendSnippets.sn.controller;

import com.backendSnippets.sn.jwt.JwtService;
import com.backendSnippets.sn.model.User;
import com.backendSnippets.sn.repository.UserRepository;
import com.backendSnippets.sn.service.AuthService;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> user) {
        try {
            authService.register(user.get("email"), user.get("password"));
            return ResponseEntity.ok("Verification code sent to email.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String, String> body) {
        try {
            System.out.println("Email: " + body.get("email") + ", Code: " + body.get("code"));
            authService.verify(body.get("email"), body.get("code"));
            return ResponseEntity.ok("User verified");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        if (!passwordEncoder.matches(user.getPassword(), foundUser.get().getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        if (!foundUser.get().isVerified()) {
            return ResponseEntity.status(403).body("Please verify your email before logging in");
        }

        String jwt = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(Map.of(
                "token", jwt,
                "email", user.getEmail()
        ));
    }
}
