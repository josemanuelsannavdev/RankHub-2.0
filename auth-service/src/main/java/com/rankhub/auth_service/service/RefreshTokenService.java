package com.rankhub.auth_service.service;

import com.rankhub.auth_service.entity.RefreshToken;
import com.rankhub.auth_service.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository repository;

    private static final long REFRESH_DURATION = 1000L * 60 * 60 * 24 * 7; // 7 días

    public RefreshTokenService(RefreshTokenRepository repository) {
        this.repository = repository;
    }

    public RefreshToken createRefreshToken(String email) {

        RefreshToken token = new RefreshToken();
        token.setEmail(email);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Instant.now().plusMillis(REFRESH_DURATION));

        return repository.save(token);
    }

    public RefreshToken verifyToken(String token) {

        RefreshToken refreshToken = repository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Refresh token inválido"));

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            repository.delete(refreshToken);
            throw new RuntimeException("Refresh token expirado");
        }

        return refreshToken;
    }

    public void logout(String token) {

        RefreshToken refreshToken = repository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Refresh token no encontrado"));

        repository.delete(refreshToken);
    }
}
