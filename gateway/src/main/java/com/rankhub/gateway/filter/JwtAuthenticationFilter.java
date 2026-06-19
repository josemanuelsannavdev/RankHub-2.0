package com.rankhub.gateway.filter;

import com.rankhub.gateway.utils.JwtUtil;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.UUID;

/**
 * This filter runs for EVERY request going through the Gateway.
 */
@Component
public class JwtAuthenticationFilter implements GlobalFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        // 1. Get request path (we will use it later)
        String path = exchange.getRequest().getURI().getPath();

        // 2. Skip authentication for public endpoints (auth + oauth entry points)
        if (isPublicPath(path)) {
            return chain.filter(exchange);
        }
       

        // 3. Get Authorization header
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);
        // 4. Require Bearer token for all protected endpoints
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange, "Missing or invalid Authorization header");
        }
        // 5. Extract token
        String token = authHeader.substring(7);
        if (token.isBlank() || "null".equalsIgnoreCase(token) || "undefined".equalsIgnoreCase(token)) {
            return unauthorized(exchange, "Missing or invalid Authorization header");
        }
        // 6. Validate token
        if (!jwtUtil.isValid(token)) {
            return unauthorized(exchange, "Invalid JWT token");
        }

        // 7. Extract userId from token
        String userId = jwtUtil.getUserId(token);

        if (userId == null || userId.isBlank()) {
            return unauthorized(exchange, "JWT subject is missing");
        }

        try {
            UUID.fromString(userId);
        } catch (IllegalArgumentException exception) {
            return unauthorized(exchange, "JWT subject is not a valid UUID");
        }

        // 8. Replace any inbound X-User-Id header with the authenticated value
        ServerHttpRequest mutatedRequest = exchange.getRequest()
                .mutate()
            .headers(headers -> {
                headers.remove("X-User-Id");
                headers.set("X-User-Id", userId);
            })
                .build();

        // 9. Forward modified request
        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }

    private boolean isPublicPath(String path) {
        return path.startsWith("/auth")
                || path.startsWith("/auth-service/auth")
                || path.startsWith("/auth-service/oauth2")
                || path.startsWith("/auth-service/login/oauth2")
                || path.startsWith("/oauth2")
                || path.startsWith("/login/oauth2")
                || path.startsWith("/error");
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        byte[] bytes = message.getBytes(StandardCharsets.UTF_8);
        return exchange.getResponse().writeWith(Mono.just(exchange.getResponse()
                .bufferFactory()
                .wrap(bytes)));
    }
}