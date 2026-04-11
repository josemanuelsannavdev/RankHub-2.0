package com.rankhub.ranking_service.utils;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
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

    // ⚠️ MUST be the same secret as Auth Service
    private final String SECRET_KEY = "r7AzZORXtBbbyTduBIxAqK2x76JK75C0cimql1v8JPQ";

    /**
     * Extract all data from token.
     */
    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
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