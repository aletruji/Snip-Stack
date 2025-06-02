package com.backendSnippets.sn;

import com.backendSnippets.sn.model.Language;
import com.backendSnippets.sn.repository.LanguageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final LanguageRepository languageRepository;

    public DatabaseSeeder(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    @Override
    public void run(String... args) {
        if (1 == 2) {
            languageRepository.saveAll(List.of(
                    new Language("Java", "☕"),
                    new Language("JavaScript", "🟨"),
                    new Language("Python", "🐍"),
                    new Language("C#", "💻"),
                    new Language("C++", "🔧"),
                    new Language("C", "🧱"),
                    new Language("Kotlin", "🧬"),
                    new Language("Swift", "🦅"),
                    new Language("Go", "🐹"),
                    new Language("Rust", "🦀"),
                    new Language("TypeScript", "🔵"),
                    new Language("PHP", "🐘"),
                    new Language("Ruby", "💎"),
                    new Language("Scala", "🔺"),
                    new Language("Perl", "🦪"),
                    new Language("Shell", "📟"),
                    new Language("Bash", "💻"),
                    new Language("Haskell", "📐"),
                    new Language("Dart", "🎯"),
                    new Language("Elixir", "🧪"),
                    new Language("F#", "🎼"),
                    new Language("Objective-C", "🍏"),
                    new Language("SQL", "🗄️"),
                    new Language("HTML", "🌐"),
                    new Language("CSS", "🎨"),
                    new Language("Assembly", "⚙️"),
                    new Language("R", "📊"),
                    new Language("Matlab", "📈"),
                    new Language("Lua", "🌙"),
                    new Language("Groovy", "🎷")
            ));
        }
    }
}
