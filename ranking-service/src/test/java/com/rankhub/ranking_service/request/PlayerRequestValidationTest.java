package com.rankhub.ranking_service.request;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Set;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

class PlayerRequestValidationTest {

    private static Validator validator;

    @BeforeAll
    static void initValidator() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void playerRequest_whenPointsNegative_hasViolation() {
        PlayerRequest request = new PlayerRequest("Ana", -1.0, null, null, null, null);

        Set<ConstraintViolation<PlayerRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> "points".equals(v.getPropertyPath().toString())));
    }

    @Test
    void playerRequest_whenNameTooLong_hasViolation() {
        PlayerRequest request = new PlayerRequest("a".repeat(81), 3.0, null, null, null, null);

        Set<ConstraintViolation<PlayerRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> "name".equals(v.getPropertyPath().toString())));
    }

    @Test
    void playerRequest_whenValid_hasNoViolations() {
        PlayerRequest request = new PlayerRequest("Ana", 0.0, null, null, null, null);

        Set<ConstraintViolation<PlayerRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }
}
