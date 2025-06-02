package com.backendSnippets.sn.controller;

import com.backendSnippets.sn.model.UserLanguage;
import com.backendSnippets.sn.repository.UserLanguageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-languages")
@CrossOrigin(origins = "http://localhost:3000")
public class UserLanguageController {

    private final UserLanguageRepository repo;

    public UserLanguageController(UserLanguageRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<UserLanguage> getByEmail(@RequestParam String email) {
        return repo.findByEmail(email);
    }

    @PostMapping
    public ResponseEntity<UserLanguage> add(@RequestBody UserLanguage lang) {
        UserLanguage saved = repo.save(lang);
        return ResponseEntity.ok(saved); // <-- wichtig: gespeichertes Objekt zurückgeben
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
