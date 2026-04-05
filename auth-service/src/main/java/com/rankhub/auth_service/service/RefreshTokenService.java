package com.rankhub.auth_service.service;

import com.rankhub.auth_service.entity.RefreshToken;
import com.rankhub.auth_service.entity.User;
import com.rankhub.auth_service.exception.InvalidRefreshTokenException;
import com.rankhub.auth_service.exception.RefreshTokenExpiredException;
import com.rankhub.auth_service.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@Slf4j
public class RefreshTokenService {

    private final RefreshTokenRepository repository;

    private static final long REFRESH_DURATION = 1000L * 60 * 60 * 24 * 7; // 7 días

    public RefreshTokenService(RefreshTokenRepository repository) {
        this.repository = repository;
    }

    public RefreshToken createRefreshToken(User user) {

        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Instant.now().plusMillis(REFRESH_DURATION));

        return repository.save(token);
    }

    public RefreshToken verifyToken(String token) {

        RefreshToken refreshToken = repository.findByToken(token)
                .orElseThrow(() -> new InvalidRefreshTokenException("Refresh token inválido"));

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            repository.delete(refreshToken);
            throw new RefreshTokenExpiredException("Refresh token expirado");
        }

        return refreshToken;
    }

    @Transactional
    public void invalidateUserTokens(String email) {
        log.info("Invalidating all refresh tokens for {}", email);
        repository.deleteByUserEmail(email);
    }

    public void logout(String token) {

        RefreshToken refreshToken = repository.findByToken(token)
                .orElseThrow(() -> new InvalidRefreshTokenException("Refresh token no encontrado"));

        repository.delete(refreshToken);
    }
}
