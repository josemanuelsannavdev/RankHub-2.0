package com.rankhub.ranking_service.dto;

import java.util.Map;

public class ApiErrorDto {
    private String error;
    private String message;
    private Map<String, String> fields;

    public ApiErrorDto() {
    }

    public ApiErrorDto(String error, String message, Map<String, String> fields) {
        this.error = error;
        this.message = message;
        this.fields = fields;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getFields() {
        return fields;
    }

    public void setFields(Map<String, String> fields) {
        this.fields = fields;
    }
}