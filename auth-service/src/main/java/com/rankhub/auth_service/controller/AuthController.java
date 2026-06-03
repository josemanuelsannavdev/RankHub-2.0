package com.rankhub.auth_service.controller;

import com.rankhub.auth_service.dto.AuthResponse;
import com.rankhub.auth_service.dto.LoginRequest;
import com.rankhub.auth_service.dto.RegisterRequest;
import com.rankhub.auth_service.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController

@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/auth/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/auth/me")
    public ResponseEntity<Map<String, String>> me(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(Map.of("email", userDetails.getUsername()));
    }

    @GetMapping("/auth/google")
    public ResponseEntity<Map<String, String>> googleLoginUrl() {
        
        return ResponseEntity.ok(Map.of("authorizationUrl", "/oauth2/authorization/google"));
    }

    //Quiero pasar una lista de ids de usuariso y que me devuelva una lista de emails
    @PostMapping("/auth/emails")
    public ResponseEntity<Map<UUID, String>> getEmailsByIds(@RequestBody Map<String, List<UUID>> request) {
        Map<UUID, String> emails = authService.getEmailsByIds(request.get("ids"));
        return ResponseEntity.ok(emails);
    }

    @GetMapping("/auth/user-id")
    public UUID getUserIdWithEmail(@RequestParam String email) {
        
        return authService.getUserIdByEmail(email);
    }
}
