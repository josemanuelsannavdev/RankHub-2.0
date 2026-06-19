package com.rankhub.invitation_service.controller;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;
import com.rankhub.invitation_service.exception.BadRequestException;
import com.rankhub.invitation_service.exception.ConflictException;
import com.rankhub.invitation_service.exception.NotFoundException;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private static final String TIMESTAMP = "timestamp";
    private static final String STATUS = "status";
    private static final String ERROR = "error";
    private static final String MESSAGE = "message";
    private static final String PATH = "path";

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleBadRequest(IllegalArgumentException ex, HttpServletRequest req) {
        log.warn("Bad request for {}: {}", req.getRequestURI(), ex.getMessage());
        Map<String, Object> body = new LinkedHashMap<>();
        body.put(TIMESTAMP, Instant.now().toString());
        body.put(STATUS, HttpStatus.BAD_REQUEST.value());
        body.put(ERROR, "Bad Request");
        body.put(MESSAGE, ex.getMessage());
        body.put(PATH, req.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntime(RuntimeException ex, HttpServletRequest req) {
        log.error("Unhandled exception for {}: {}", req.getRequestURI(), ex.getMessage());
        Map<String, Object> body = new LinkedHashMap<>();
        body.put(TIMESTAMP, Instant.now().toString());
        body.put(STATUS, HttpStatus.INTERNAL_SERVER_ERROR.value());
        body.put(ERROR, "Internal Server Error");
        body.put(MESSAGE, ex.getMessage());
        body.put(PATH, req.getRequestURI());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNotFound(NotFoundException ex, HttpServletRequest req) {
        log.warn("Not found {}: {}", req.getRequestURI(), ex.getMessage());
        Map<String, Object> body = new LinkedHashMap<>();
        body.put(TIMESTAMP, Instant.now().toString());
        body.put(STATUS, HttpStatus.NOT_FOUND.value());
        body.put(ERROR, "Not Found");
        body.put(MESSAGE, ex.getMessage());
        body.put(PATH, req.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<Map<String, Object>> handleConflict(ConflictException ex, HttpServletRequest req) {
        log.warn("Conflict {}: {}", req.getRequestURI(), ex.getMessage());
        Map<String, Object> body = new LinkedHashMap<>();
        body.put(TIMESTAMP, Instant.now().toString());
        body.put(STATUS, HttpStatus.CONFLICT.value());
        body.put(ERROR, "Conflict");
        body.put(MESSAGE, ex.getMessage());
        body.put(PATH, req.getRequestURI());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<Map<String, Object>> handleBadRequestCustom(BadRequestException ex, HttpServletRequest req) {
        log.warn("Bad request {}: {}", req.getRequestURI(), ex.getMessage());
        Map<String, Object> body = new LinkedHashMap<>();
        body.put(TIMESTAMP, Instant.now().toString());
        body.put(STATUS, HttpStatus.BAD_REQUEST.value());
        body.put(ERROR, "Bad Request");
        body.put(MESSAGE, ex.getMessage());
        body.put(PATH, req.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

}
