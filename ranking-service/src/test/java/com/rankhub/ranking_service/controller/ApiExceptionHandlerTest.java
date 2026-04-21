package com.rankhub.ranking_service.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.lang.reflect.Method;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import com.rankhub.ranking_service.dto.ApiErrorDto;

import jakarta.validation.ConstraintViolationException;

class ApiExceptionHandlerTest {

    private ApiExceptionHandler handler;

    @BeforeEach
    void setUp() {
        handler = new ApiExceptionHandler();
    }

    @Test
    void handleValidation_returnsBadRequestWithFieldErrors() throws Exception {
        Method method = DummyInput.class.getDeclaredMethod("validate", String.class);
        MethodParameter methodParameter = new MethodParameter(method, 0);

        BeanPropertyBindingResult bindingResult = new BeanPropertyBindingResult(new DummyInput(), "dummyInput");
        bindingResult.addError(new FieldError("dummyInput", "name", "must not be blank"));

        MethodArgumentNotValidException ex = new MethodArgumentNotValidException(methodParameter, bindingResult);

        ResponseEntity<ApiErrorDto> response = handler.handleValidation(ex);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Validation failed", response.getBody().getError());
        assertNotNull(response.getBody().getFields());
        assertEquals("must not be blank", response.getBody().getFields().get("name"));
    }

    @Test
    void handleConstraintViolation_returnsBadRequestWithMessage() {
        ConstraintViolationException ex = new ConstraintViolationException("invalid query parameter", Collections.emptySet());

        ResponseEntity<ApiErrorDto> response = handler.handleConstraintViolation(ex);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Validation failed", response.getBody().getError());
        assertEquals("invalid query parameter", response.getBody().getMessage());
    }

    @Test
    void handleIllegalArgument_returnsBadRequestWithMessage() {
        IllegalArgumentException ex = new IllegalArgumentException("invalid user id");

        ResponseEntity<ApiErrorDto> response = handler.handleIllegalArgument(ex);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Bad request", response.getBody().getError());
        assertEquals("invalid user id", response.getBody().getMessage());
        assertTrue(response.getBody().getFields() == null || response.getBody().getFields().isEmpty());
    }

    private static final class DummyInput {
        @SuppressWarnings("unused")
        void validate(String name) {
        }
    }
}
