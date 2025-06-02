package com.backendSnippets.sn.repository;

import com.backendSnippets.sn.model.UserLanguage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLanguageRepository extends JpaRepository<UserLanguage, Long> {
    List<UserLanguage> findByEmail(String email);
}
