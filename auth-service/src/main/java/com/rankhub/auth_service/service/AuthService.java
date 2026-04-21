package com.rankhub.auth_service.service;

import com.rankhub.auth_service.dto.AuthResponse;
import com.rankhub.auth_service.dto.LoginRequest;
import com.rankhub.auth_service.dto.RegisterRequest;
import com.rankhub.auth_service.entity.AuthProvider;
import com.rankhub.auth_service.entity.User;
import com.rankhub.auth_service.exception.EmailAlreadyExistsException;
import com.rankhub.auth_service.exception.InvalidCredentialsException;
import com.rankhub.auth_service.exception.OAuth2AuthenticationProcessingException;
import com.rankhub.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import java.util.Locale;



@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ObjectProvider<AuthenticationManager> authenticationManagerProvider;

    
    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = normalizeEmail(request.getEmail());

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new EmailAlreadyExistsException("Email already in use");
        }

        User user = User.builder()
                .email(normalizedEmail)
                .password(passwordEncoder.encode(request.getPassword()))
                .provider(AuthProvider.LOCAL)
                .emailVerified(true)
                .build();

        User savedUser = userRepository.save(user);
        return buildAuthResponse(savedUser);
    }

    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = normalizeEmail(request.getEmail());

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new InvalidCredentialsException("This account uses Google login");
        }

        try {
            authenticationManagerProvider.getObject().authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedEmail, request.getPassword())
            );
        } catch (BadCredentialsException ex) {
            throw new InvalidCredentialsException("Invalid email or password");
        } catch (AuthenticationException ex) {
            throw new InvalidCredentialsException("Authentication failed");
        }

        return buildAuthResponse(user);
    }

    public User handleGoogleLogin(OAuth2User oauth2User) {
        String email = normalizeEmail(oauth2User.getAttribute("email"));
        String googleSub = oauth2User.getAttribute("sub");
        Boolean emailVerified = oauth2User.getAttribute("email_verified");

        if (email == null || email.isBlank() || googleSub == null || googleSub.isBlank()) {
            throw new OAuth2AuthenticationProcessingException("Google response is missing required claims");
        }

        userRepository.findByGoogleSub(googleSub).ifPresent(existingByGoogleSub -> {
            if (!existingByGoogleSub.getEmail().equalsIgnoreCase(email)) {
                throw new OAuth2AuthenticationProcessingException("Google account already linked to another user");
            }
        });

        User user = userRepository.findByEmail(email)
                .map(existingUser -> linkGoogleAccount(existingUser, googleSub, emailVerified))
                .orElseGet(() -> createGoogleUser(email, googleSub, emailVerified));

        return userRepository.save(user);
    }

    private User linkGoogleAccount(User existingUser, String googleSub, Boolean emailVerified) {
        if (existingUser.getGoogleSub() == null || existingUser.getGoogleSub().isBlank()) {
            existingUser.setGoogleSub(googleSub);
        }

        if (existingUser.getProvider() == null) {
            existingUser.setProvider(AuthProvider.LOCAL);
        }

        if (Boolean.TRUE.equals(emailVerified)) {
            existingUser.setEmailVerified(true);
        }

        return existingUser;
    }

    private User createGoogleUser(String email, String googleSub, Boolean emailVerified) {
        return User.builder()
                .email(email)
                .password(null)
                .provider(AuthProvider.GOOGLE)
                .googleSub(googleSub)
                .emailVerified(Boolean.TRUE.equals(emailVerified))
                .build();
    }

    private AuthResponse buildAuthResponse(User user) {
        String token = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .expiresIn(jwtService.getExpirationSeconds())
                .email(user.getEmail())
                .build();
    }

    private String normalizeEmail(String email) {
        if (email == null) {
            return null;
        }
        return email.trim().toLowerCase(Locale.ROOT);
    }

}