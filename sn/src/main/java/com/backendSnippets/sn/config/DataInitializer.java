package com.backendSnippets.sn.config;

import com.backendSnippets.sn.model.User;
import com.backendSnippets.sn.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("test@test.de").isEmpty()) {
                User user = new User("test@test.de", passwordEncoder.encode("test123"));
                user.setVerified(true);
                userRepository.save(user);
                System.out.println("🔐 Testnutzer erstellt: test@test.de / test123");
            }
        };
    }
}
