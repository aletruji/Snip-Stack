package com.backendSnippets.sn.controller;

import com.backendSnippets.sn.model.Snippet;
import com.backendSnippets.sn.repository.SnippetRepository;
import com.backendSnippets.sn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backendSnippets.sn.model.User;

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

    // Alle Snippets eines Users
    @GetMapping
    public List<Snippet> getSnippets(@RequestParam String email, @RequestParam(required = false) String language) {
        User user = userRepository.findByEmail(email).orElseThrow();
        if (language != null) {
            return snippetRepository.findByUserAndLanguage(user, language);
        }
        return snippetRepository.findByUser(user);
    }

    // Neues Snippet anlegen
    @PostMapping
    public Snippet createSnippet(@RequestParam String email, @RequestBody Snippet snippet) {
        User user = userRepository.findByEmail(email).orElseThrow();
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
