package com.backendSnippets.sn.controller;

import com.backendSnippets.sn.model.Snippet;
import com.backendSnippets.sn.repository.SnippetRepository;
import com.backendSnippets.sn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.backendSnippets.sn.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
@RestController
@RequestMapping("/api/snippets")
@CrossOrigin(origins = "http://localhost:3000") // oder 3001 je nach Frontend
public class SnippetController {

    private final SnippetRepository snippetRepository;
    private final UserRepository userRepository;

    public SnippetController(SnippetRepository snippetRepository, UserRepository userRepository) {
        this.snippetRepository = snippetRepository;
        this.userRepository = userRepository;
    }

    // all snippets from User
    @GetMapping
    public List<Snippet> getSnippets(@RequestParam(required = false) String language) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername(); // Falls du UserDetails benutzt
        } else if (principal instanceof User) {
            email = ((User) principal).getEmail(); // Falls dein eigenes User-Objekt
        } else {
            throw new RuntimeException("Unbekannter Principal-Typ: " + principal);
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Benutzer mit E-Mail " + email + " nicht gefunden"));


        if (language != null) {
            return snippetRepository.findByUserIdAndLanguage(user.getId(), language);
        }
        return snippetRepository.findByUserId(user.getId());
    }



    @PostMapping
    public Snippet createSnippet(@RequestBody Snippet snippet) {
       // Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername(); // Falls du UserDetails benutzt
        } else if (principal instanceof User) {
            email = ((User) principal).getEmail(); // Falls dein eigenes User-Objekt
        } else {
            throw new RuntimeException("Unbekannter Principal-Typ: " + principal);
        }


        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        snippet.setUser(user);
        return snippetRepository.save(snippet);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Snippet> updateSnippet(
            @PathVariable Long id,
            @RequestBody Snippet updatedSnippet) {

        return snippetRepository.findById(id)
                .map(snippet -> {
                    snippet.setTitle(updatedSnippet.getTitle());
                    snippet.setCode(updatedSnippet.getCode());
                    snippet.setLanguage(updatedSnippet.getLanguage());
                    Snippet saved = snippetRepository.save(snippet);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
