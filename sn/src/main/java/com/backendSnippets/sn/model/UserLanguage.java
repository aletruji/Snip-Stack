package com.backendSnippets.sn.model;

import jakarta.persistence.*;

@Entity
public class UserLanguage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String name;
    private String logo;

    public UserLanguage() {}

    public UserLanguage(String email, String name, String logo) {
        this.email = email;
        this.name = name;
        this.logo = logo;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getLogo() {
        return logo;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
