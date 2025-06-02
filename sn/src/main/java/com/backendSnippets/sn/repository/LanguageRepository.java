package com.backendSnippets.sn.repository;

import com.backendSnippets.sn.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Long> {
    boolean existsByName(String name);
}
