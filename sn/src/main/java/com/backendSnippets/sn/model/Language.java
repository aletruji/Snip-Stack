package com.backendSnippets.sn.model;

import jakarta.persistence.*;

@Entity
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String logo; // z.B. Emoji oder Symbol

    public Language() {
    }

    public Language(String name, String logo) {
        this.name = name;
        this.logo = logo;
    }

    // Getter + Setter
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLogo() {
        return logo;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }
}
