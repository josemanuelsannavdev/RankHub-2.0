package com.rankhub.auth_service.service;

import com.rankhub.auth_service.dto.LoginRequest;
import com.rankhub.auth_service.dto.RegisterRequest;
import com.rankhub.auth_service.dto.UserResponse;
import com.rankhub.auth_service.entity.User;
import com.rankhub.auth_service.exception.InvalidCredentialsException;
import com.rankhub.auth_service.exception.UserAlreadyExistsException;
import com.rankhub.auth_service.exception.UserNotFoundException;
import com.rankhub.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
                .provider("LOCAL")
                .build();

        User savedUser = userRepository.save(user);
        return mapToResponse(savedUser);
    }

    public UserResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Usuario no encontrado"));

        // comprobar que sea usuario LOCAL
        if (!"LOCAL".equals(user.getProvider())) {
            throw new InvalidCredentialsException("Este usuario usa login con Google");
        }

        // validar contraseña
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Contraseña incorrecta");
        }

        return mapToResponse(user);
    }

    private UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .build();
    }
}