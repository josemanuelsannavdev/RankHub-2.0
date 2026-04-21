package com.rankhub.ranking_service.utils;


import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * JWT utility used ONLY in Gateway.
 * 
 * Responsibility:
 * - Validate token
 * - Extract user identity
 */
@Component
public class JwtUtil {

    @Value("${JWT_SECRET:replace-with-strong-jwt-secret-min-32-characters}")
    private String secret;

    private SecretKey secretKey;

    @PostConstruct
    void init() {
        if (secret == null || secret.trim().length() < 32) {
            throw new IllegalStateException("security.jwt.secret debe tener al menos 32 caracteres");
        }
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Extract all data from token.
     */
    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Extract user ID (stored in "sub").
     */
    public String getUserId(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * Check if token is valid.
     */
    public boolean isValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}