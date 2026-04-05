package com.rankhub.auth_service.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rankhub.auth_service.dto.AuthResponse;
import com.rankhub.auth_service.entity.User;
import com.rankhub.auth_service.service.JwtService;
import com.rankhub.auth_service.service.OAuthService;
import com.rankhub.auth_service.service.RefreshTokenService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.security.config.Customizer.withDefaults;

import com.rankhub.auth_service.security.JwtAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final OAuthService oAuthService;
        private final JwtService jwtService;
        private final RefreshTokenService refreshTokenService;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

                http
                                .csrf(csrf -> csrf.disable())
                                .cors(cors -> {
                                })
                                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/auth/**", "/oauth2/**").permitAll()
                                                .anyRequest().authenticated())
                                .headers(headers -> headers
                                                .frameOptions(frame -> frame.deny())
                                                .contentTypeOptions(withDefaults())
                                                .httpStrictTransportSecurity(hsts -> hsts.includeSubDomains(true)
                                                                .maxAgeInSeconds(31536000)))
                                .oauth2Login(oauth -> oauth
                                                .successHandler((request, response, authentication) -> {

                                                        String email = null;
                                                        if (authentication.getPrincipal() instanceof OAuth2User oauth2User) {
                                                                email = oauth2User.getAttribute("email");
                                                        }
                                                        if (email == null || email.isBlank()) {
                                                                email = authentication.getName();
                                                        }

                                                        User user = oAuthService.processOAuthUser(email);

                                                        String accessToken = jwtService.generateToken(
                                                                        user.getEmail(),
                                                                        user.getRole().name());

                                                        String refreshToken = refreshTokenService.createRefreshToken(user).getToken();

                                                        AuthResponse authResponse = new AuthResponse(accessToken,
                                                                        refreshToken);

                                                        response.setContentType("application/json");
                                                        response.setCharacterEncoding("UTF-8");
                                                        response.getWriter().write(new ObjectMapper()
                                                                        .writeValueAsString(authResponse));
                                                }));

                http.addFilterBefore(
                                jwtAuthenticationFilter,
                                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        /*
         * Encargado de codificar una contraseña
         */
        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.addAllowedOrigin("http://localhost:3000");
                configuration.addAllowedMethod("GET");
                configuration.addAllowedMethod("POST");
                configuration.addAllowedMethod("PUT");
                configuration.addAllowedMethod("DELETE");
                configuration.addAllowedHeader("*");
                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

}