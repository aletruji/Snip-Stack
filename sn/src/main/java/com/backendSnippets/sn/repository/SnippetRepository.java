package com.backendSnippets.sn.repository;

import com.backendSnippets.sn.model.Snippet;
import org.springframework.data.jpa.repository.JpaRepository;
import com.backendSnippets.sn.model.User;
import java.util.List;


public interface SnippetRepository extends JpaRepository<Snippet, Long> {
    List<Snippet> findByUser(User user);
    List<Snippet> findByUserAndLanguage(User user, String language);
}