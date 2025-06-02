package com.backendSnippets.sn.jwt;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY = "megageheimespasswort1234567890supersecure"; // min. 256 Bit (32 Zeichen)

    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    //token wird erzeugt
    public String generateToken(String email){
        long expirationMillis = 1000 * 60 * 60 * 24;

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    //email aus token rauslesen
    public String extractEmail(String token){
        return parseToken(token).getBody().getSubject();
    }
    //ueberpruefen ob token gueltig ist
    public boolean isTokenValid(String token){
        try{
            parseToken(token);
            return true; }
        catch (JwtException | IllegalArgumentException e){
            return false; }
        }
        private Jws<Claims> parseToken(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);

        }
    }


