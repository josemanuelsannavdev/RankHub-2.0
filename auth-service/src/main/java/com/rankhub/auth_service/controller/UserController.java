package com.rankhub.auth_service.controller;


import com.rankhub.auth_service.dto.MeResponse;
import com.rankhub.auth_service.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public MeResponse me() {
        return userService.getCurrentUser();
    }

    // 🛡️ SOLO ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String adminOnly() {
        return "Solo ADMIN puede ver esto";
    }

    // 👥 USER o ADMIN
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/dashboard")
    public String dashboard() {
        return "Dashboard accesible";
    }
}
