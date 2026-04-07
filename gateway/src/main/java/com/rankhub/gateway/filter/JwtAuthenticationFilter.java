package com.rankhub.gateway.filter;

import com.rankhub.gateway.utils.JwtUtil;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

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

        // 2. Skip authentication for auth endpoints
        if (path.startsWith("/auth")) {
            return chain.filter(exchange);
        }

        // 3. Get Authorization header
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        // 4. If no token → just continue (we will improve later)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        // 5. Extract token
        String token = authHeader.substring(7);

        // 6. Validate token
        if (!jwtUtil.isValid(token)) {
            return chain.filter(exchange);
        }

        // 7. Extract userId from token
        String userId = jwtUtil.getUserId(token);

        // 8. Add userId into request headers
        ServerHttpRequest mutatedRequest = exchange.getRequest()
                .mutate()
                .header("X-User-Id", userId)
                .build();

        // 9. Forward modified request
        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }
}