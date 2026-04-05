package com.rankhub.auth_service.service;

import com.rankhub.auth_service.dto.AuthResponse;
import com.rankhub.auth_service.dto.LoginRequest;
import com.rankhub.auth_service.dto.MeResponse;
import com.rankhub.auth_service.dto.RegisterRequest;
import com.rankhub.auth_service.dto.UserResponse;
import com.rankhub.auth_service.entity.RefreshToken;
import com.rankhub.auth_service.entity.User;
import com.rankhub.auth_service.exception.InvalidCredentialsException;
import com.rankhub.auth_service.exception.UserAlreadyExistsException;
import com.rankhub.auth_service.exception.UserNotFoundException;
import com.rankhub.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rankhub.auth_service.entity.Role;

import org.springframework.security.core.Authentication;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    
    public UserResponse register(RegisterRequest request) {

        // comprobar si ya existe el usuario con ese email
        userRepository.findByEmail(request.getEmail())
                .ifPresent(user -> {
                    throw new UserAlreadyExistsException("El email ya está registrado");
                });

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(Role.USER)
                .provider("LOCAL")
                .build();

        User savedUser = userRepository.save(user);
        return mapToResponse(savedUser);
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Credenciales incorrectas");
        }

        String accessToken = jwtService.generateToken(user.getEmail(), user.getRole().name());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getEmail());

        return new AuthResponse(accessToken, refreshToken.getToken());
    }

    private UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .build();
    }

    public MeResponse getCurrentUser() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return MeResponse.builder()
                .email(auth.getName())
                .authenticated(true)
                .build();
    }
}