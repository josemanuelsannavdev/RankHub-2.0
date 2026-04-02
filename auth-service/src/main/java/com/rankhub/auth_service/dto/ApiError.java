package com.rankhub.auth_service.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiError {
    private String message;
    private int status;
}