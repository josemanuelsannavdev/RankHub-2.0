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

class RankingRequestValidationTest {

    private static Validator validator;

    @BeforeAll
    static void initValidator() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void rankingRequest_whenNameTooLong_hasViolation() {
        RankingRequest request = new RankingRequest("a".repeat(81), "icon");

        Set<ConstraintViolation<RankingRequest>> violations = validator.validate(request);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> "name".equals(v.getPropertyPath().toString())));
    }

    @Test
    void rankingRequest_whenValid_hasNoViolations() {
        RankingRequest request = new RankingRequest("Liga", "icon");

        Set<ConstraintViolation<RankingRequest>> violations = validator.validate(request);

        assertTrue(violations.isEmpty());
    }
}
