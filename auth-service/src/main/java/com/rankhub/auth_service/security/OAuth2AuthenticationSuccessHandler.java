package com.rankhub.auth_service.security;

import com.rankhub.auth_service.dto.AuthResponse;
import com.rankhub.auth_service.entity.User;
import com.rankhub.auth_service.service.AuthService;
import com.rankhub.auth_service.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final AuthService authService;
    private final JwtService jwtService;

    @Value("${app.oauth.frontend-callback-url:http://localhost:5173/oauth/callback}")
    private String frontendCallbackUrl;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        User user = authService.handleGoogleLogin(oauthUser);
        String token = jwtService.generateToken(user);

        AuthResponse authResponse = AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .expiresIn(jwtService.getExpirationSeconds())
                .email(user.getEmail())
                .build();

        String redirectUrl = UriComponentsBuilder
                .fromUriString(frontendCallbackUrl)
                .queryParam("token", authResponse.getToken())
                .queryParam("email", authResponse.getEmail())
                .queryParam("provider", "google")
                .build()
                .toUriString();
                
        response.sendRedirect(redirectUrl);
    }
}