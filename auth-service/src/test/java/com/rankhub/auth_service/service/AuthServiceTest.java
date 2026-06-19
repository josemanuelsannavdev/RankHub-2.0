package com.rankhub.auth_service.service;

import com.rankhub.auth_service.dto.AuthResponse;
import com.rankhub.auth_service.dto.LoginRequest;
import com.rankhub.auth_service.dto.RegisterRequest;
import com.rankhub.auth_service.entity.AuthProvider;
import com.rankhub.auth_service.entity.User;
import com.rankhub.auth_service.exception.EmailAlreadyExistsException;
import com.rankhub.auth_service.exception.InvalidCredentialsException;
import com.rankhub.auth_service.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Optional;
import java.util.UUID;
import java.util.Iterator;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private OAuth2User oAuth2User;

    @Mock
    private JwtService jwtService;

    private AuthService authService;


    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setEmail("test@example.com");
        registerRequest.setPassword("Password123");

        // jwtService is a Mockito mock (see @Mock above)
        when(jwtService.generateToken(any(User.class))).thenReturn("jwt-token");
        when(jwtService.getExpirationSeconds()).thenReturn(3600L);

        ObjectProvider<AuthenticationManager> authManagerProvider = new ObjectProvider<>() {
            @Override
            public AuthenticationManager getObject(Object... args) {
                return authenticationManager;
            }

            @Override
            public AuthenticationManager getIfAvailable() {
                return authenticationManager;
            }

            @Override
            public AuthenticationManager getIfUnique() {
                return authenticationManager;
            }

            @Override
            public AuthenticationManager getObject() {
                return authenticationManager;
            }

            @Override
            public Iterator<AuthenticationManager> iterator() {
                return java.util.List.of(authenticationManager).iterator();
            }
        };

        authService = new AuthService(userRepository, passwordEncoder, jwtService, authManagerProvider);
    }

    @Test
    void registerShouldCreateUserAndReturnToken() {
        User saved = User.builder()
                .id(UUID.randomUUID())
                .email("test@example.com")
                .password("encoded")
                .provider(AuthProvider.LOCAL)
                .emailVerified(true)
                .build();

        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("Password123")).thenReturn("encoded");
        when(userRepository.save(any(User.class))).thenReturn(saved);

        AuthResponse response = authService.register(registerRequest);

        assertEquals("jwt-token", response.getToken());
        assertEquals("Bearer", response.getTokenType());
        assertEquals(3600L, response.getExpiresIn());
        assertEquals("test@example.com", response.getEmail());
    }

    @Test
    void registerShouldFailWhenEmailAlreadyExists() {
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> authService.register(registerRequest));
    }

    @Test
    void loginShouldFailWhenAccountIsGoogleOnly() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("Password123");

        User googleUser = User.builder()
                .id(UUID.randomUUID())
                .email("test@example.com")
                .password(null)
                .provider(AuthProvider.GOOGLE)
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(googleUser));

        assertThrows(InvalidCredentialsException.class, () -> authService.login(loginRequest));
    }

    @Test
    void handleGoogleLoginShouldCreateUserWhenNotExists() {
        when(oAuth2User.getAttribute("email")).thenReturn("google@example.com");
        when(oAuth2User.getAttribute("sub")).thenReturn("google-sub");
        when(oAuth2User.getAttribute("email_verified")).thenReturn(true);
        when(userRepository.findByGoogleSub("google-sub")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("google@example.com")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        User user = authService.handleGoogleLogin(oAuth2User);

        assertEquals("google@example.com", user.getEmail());
        assertEquals("google-sub", user.getGoogleSub());
        assertEquals(AuthProvider.GOOGLE, user.getProvider());
        assertTrue(user.isEmailVerified());
    }
}