package com.backendSnippets.sn.model;

import jakarta.persistence.*;

@Entity
public class Snippet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String code;
    private String language;

    public Snippet() {}

    public Snippet(String title, String code, String language) {
        this.title = title;
        this.code = code;
        this.language = language;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCode() { return code; }
    public String getLanguage() { return language; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setCode(String code) { this.code = code; }
    public void setLanguage(String language) { this.language = language; }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
