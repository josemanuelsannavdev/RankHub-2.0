package com.rankhub.auth_service.controller;

import com.rankhub.auth_service.dto.LoginRequest;
import com.rankhub.auth_service.dto.RegisterRequest;
import com.rankhub.auth_service.dto.UserResponse;
import com.rankhub.auth_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public UserResponse register(@Valid @RequestBody RegisterRequest request) { // ese valid activa las validaciones del DTO
                                                                        // RequestBody
        return userService.register(request);
    }

    @PostMapping("/login")
    public UserResponse login(@Valid @RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
