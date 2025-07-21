package com.backendSnippets.sn.controller;

import com.backendSnippets.sn.model.Language;
import com.backendSnippets.sn.repository.LanguageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
@CrossOrigin(origins = {"http://localhost:3000",
        "https://snipstack.net"})
public class LanguageController {

    private final LanguageRepository languageRepository;

    public LanguageController(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    @GetMapping
    public List<Language> getAllLanguages() {
        return languageRepository.findAll();
    }

   /* @PostMapping
    public ResponseEntity<?> addLanguage(@RequestBody Language language) {
        if (languageRepository.existsByName(language.getName())) {
            return ResponseEntity.badRequest().body("Language already exists");
        }
        Language saved = languageRepository.save(language);
        return ResponseEntity.ok(saved);
    }*/

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLanguage(@PathVariable Long id) {
        if (!languageRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        languageRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
