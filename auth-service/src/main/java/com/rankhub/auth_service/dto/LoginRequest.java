package com.rankhub.auth_service.dto;
import lombok.Data;

/**
 * DTO used for login requests.
 */
@Data
public class LoginRequest {

    private String email;
    private String password;

    
}