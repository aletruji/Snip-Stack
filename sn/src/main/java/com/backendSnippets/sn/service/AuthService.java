package com.backendSnippets.sn.service;

import com.backendSnippets.sn.model.User;
import com.backendSnippets.sn.model.VerificationCode;
import com.backendSnippets.sn.repository.UserRepository;
import com.backendSnippets.sn.repository.VerificationCodeRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired private UserRepository userRepo;
    @Autowired private VerificationCodeRepository codeRepo;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JavaMailSender mailSender;

    public void register(String email, String password) {
        if (userRepo.findByEmail(email).isPresent())
            throw new RuntimeException("User already exists");

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setVerified(false);
        userRepo.save(user);

        String code = String.format("%06d", new SecureRandom().nextInt(1_000_000));
        codeRepo.deleteByEmail(email);
        codeRepo.save(new VerificationCode(email, code, LocalDateTime.now()));

        SimpleMailMessage msg = new SimpleMailMessage();
        try {
            msg.setTo(email);
            msg.setSubject("Your SnippetApp Verification Code");
            msg.setText("Here is your verification code: " + code);
            mailSender.send(msg);
        } catch (Exception e) {
            System.err.println("Mailversand fehlgeschlagen: " + e.getMessage());
            e.printStackTrace(); // für volle Fehlermeldung
        }
    }
    @Transactional
        public void verify(String email, String code) {
        System.out.println("E-Mail: '" + email + "'");
        System.out.println("Code: '" + code + "'");

        Optional<VerificationCode> match = codeRepo.findByEmailAndCode(email.trim(), code.trim());

        System.out.println("Match vorhanden? " + match.isPresent());

        if (match.isEmpty()) throw new RuntimeException("Invalid code");

        User user = userRepo.findByEmail(email).orElseThrow();
        user.setVerified(true);
        userRepo.save(user);
        codeRepo.deleteByEmail(email);
    }
}
