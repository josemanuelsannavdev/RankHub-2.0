package com.rankhub.auth_service.controller;

import com.rankhub.auth_service.dto.AuthResponse;
import com.rankhub.auth_service.dto.LoginRequest;
import com.rankhub.auth_service.dto.RefreshTokenRequest;
import com.rankhub.auth_service.dto.RegisterRequest;
import com.rankhub.auth_service.dto.UserResponse;
import com.rankhub.auth_service.entity.RefreshToken;
import com.rankhub.auth_service.service.JwtService;
import com.rankhub.auth_service.service.RateLimiterService;
import com.rankhub.auth_service.service.RefreshTokenService;
import com.rankhub.auth_service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;
    private final RateLimiterService rateLimiterService;

    @PostMapping("/register")
    public UserResponse register(HttpServletRequest request, @Valid @RequestBody RegisterRequest requestBody) {
        rateLimiterService.consume(request);
        log.info("Register attempt from {} for email {}", request.getRemoteAddr(), requestBody.getEmail());
        return userService.register(requestBody);
    }

    @PostMapping("/login")
    public AuthResponse login(HttpServletRequest request, @Valid @RequestBody LoginRequest requestBody) {
        rateLimiterService.consume(request);
        log.info("Login attempt from {} for email {}", request.getRemoteAddr(), requestBody.getEmail());
        return userService.login(requestBody);
    }

    @PostMapping("/refresh")
    public AuthResponse refresh(@Valid @RequestBody RefreshTokenRequest request) {

        RefreshToken token = refreshTokenService.verifyToken(request.refreshToken());
        var user = token.getUser();

        String newAccessToken = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name());

        return new AuthResponse(newAccessToken, request.refreshToken());
    }

    @PostMapping("/logout")
    public String logout(@Valid @RequestBody RefreshTokenRequest request) {
        refreshTokenService.logout(request.refreshToken());
        return "Logout realizado correctamente";
    }
}
