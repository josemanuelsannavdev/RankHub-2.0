package com.rankhub.gateway.utils;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

/**
 * JWT utility used ONLY in Gateway.
 * 
 * Responsibility:
 * - Validate token
 * - Extract user identity
 */
@Component
@Slf4j
public class JwtUtil {

    @Value("${jwt.secret:${JWT_SECRET:r7AzZORXtBbbyTduBIxAqK2x76JK75C0cimql1v8JPQ}}")
    private String jwtSecret;

    private SecretKey signingKey;

    @PostConstruct
    void init() {
        if (jwtSecret == null || jwtSecret.trim().length() < 32) {
            throw new IllegalStateException("JWT secret must be at least 32 characters long");
        }
        signingKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Extract all data from token.
     */
    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(signingKey)
            .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Extract user ID (stored in "sub").
     */
    public String getUserId(String token) {
        Claims claims = getClaims(token);
        Object uid = claims.get("uid");
        if (uid != null) {
            return uid.toString();
        }
        return claims.getSubject();
    }

    /**
     * Check if token is valid.
     */
    public boolean isValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            log.debug("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }
}