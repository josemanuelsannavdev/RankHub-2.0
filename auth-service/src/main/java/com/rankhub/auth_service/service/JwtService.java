package com.rankhub.auth_service.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

/**
 * Service responsible for generating and validating JWT tokens.
 */
@Service
public class JwtService {

    // ⚠️ In production, store this in environment variables
    @Value("${jwt.secret}")
    private  String secretKey ;

    // Token validity (e.g., 1 hour)
    private final long EXPIRATION_TIME = 1000 * 60 * 60;

    /**
     * Generates a JWT token for a user.
     */
    public String generateToken(UUID userId, String email) {

        return Jwts.builder()
                .setSubject(userId.toString()) // user ID
                .claim("email", email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /**
     * Extracts user ID from token.
     */
    public String extractUserId(String token) {
        return extractClaims(token).getSubject();
    }

    /**
     * Validates token (basic).
     */
    public boolean isValid(String token) {
        try {
            extractClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
}