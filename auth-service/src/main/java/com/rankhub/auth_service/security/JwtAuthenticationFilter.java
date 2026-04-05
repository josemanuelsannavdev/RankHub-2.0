package com.rankhub.auth_service.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rankhub.auth_service.dto.ApiError;
import com.rankhub.auth_service.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final ObjectMapper objectMapper = new ObjectMapper();


    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);

        try {
            String email = jwtService.extractEmail(token);
            String role = jwtService.extractRole(token); // 👈 NUEVO

            UserDetails userDetails = new User(email, "", List.of(
                    new SimpleGrantedAuthority("ROLE_" + role)
            ));

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);


        } catch (ExpiredJwtException e) {
            log.warn("Expired JWT token: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ApiError error = ApiError.builder()
                    .message("Token expirado")
                    .status(HttpServletResponse.SC_UNAUTHORIZED)
                    .build();
            response.getWriter().write(objectMapper.writeValueAsString(error));
            return;
        } catch (MalformedJwtException e) {
            log.warn("Malformed JWT token: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ApiError error = ApiError.builder()
                    .message("Token malformado")
                    .status(HttpServletResponse.SC_UNAUTHORIZED)
                    .build();
            response.getWriter().write(objectMapper.writeValueAsString(error));
            return;
        } catch (SignatureException e) {
            log.warn("Invalid JWT signature: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ApiError error = ApiError.builder()
                    .message("Firma del token inválida")
                    .status(HttpServletResponse.SC_UNAUTHORIZED)
                    .build();
            response.getWriter().write(objectMapper.writeValueAsString(error));
            return;
        } catch (Exception e) {
            log.error("Unexpected JWT processing error", e);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            ApiError error = ApiError.builder()
                    .message("Token inválido")
                    .status(HttpServletResponse.SC_UNAUTHORIZED)
                    .build();
            response.getWriter().write(objectMapper.writeValueAsString(error));
            return;
        }

        filterChain.doFilter(request, response);
    }
}