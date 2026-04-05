package com.rankhub.auth_service.controller;

import com.rankhub.auth_service.dto.AuthResponse;
import com.rankhub.auth_service.dto.LoginRequest;
import com.rankhub.auth_service.dto.RegisterRequest;
import com.rankhub.auth_service.dto.UserResponse;
import com.rankhub.auth_service.entity.RefreshToken;
import com.rankhub.auth_service.entity.User;
import com.rankhub.auth_service.service.JwtService;
import com.rankhub.auth_service.service.OAuthService;
import com.rankhub.auth_service.service.RefreshTokenService;
import com.rankhub.auth_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final OAuthService oAuthService;
    private final UserService userService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public UserResponse register(@Valid @RequestBody RegisterRequest request) { // ese valid activa las validaciones del
                                                                                // DTO
        // RequestBody
        return userService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request);
    }

    @PostMapping("/refresh")
    public AuthResponse refresh(@RequestBody String refreshToken) {

        RefreshToken token = refreshTokenService.verifyToken(refreshToken);

        String newAccessToken = jwtService.generateToken(
                token.getEmail(),
                "USER");

        return new AuthResponse(newAccessToken, refreshToken);
    }

    @PostMapping("/logout")
    public String logout(@RequestBody String refreshToken) {
        refreshTokenService.logout(refreshToken);
        return "Logout realizado correctamente";
    }

    @GetMapping("/oauth2/success")
    public AuthResponse oauthSuccess(@RequestParam String email) {

        // 👇 aquí usas tu lógica limpia
        User user = oAuthService.processOAuthUser(email);

        String accessToken = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name());

        String refreshToken = refreshTokenService
                .createRefreshToken(user.getEmail())
                .getToken();

        return new AuthResponse(accessToken, refreshToken);
    }
}
