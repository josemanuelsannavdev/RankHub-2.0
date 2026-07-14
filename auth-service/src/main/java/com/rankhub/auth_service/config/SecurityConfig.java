package com.rankhub.auth_service.config;

import com.rankhub.auth_service.security.CustomUserDetailsService;
import com.rankhub.auth_service.security.JwtAuthenticationFilter;
import com.rankhub.auth_service.security.OAuth2AuthenticationFailureHandler;
import com.rankhub.auth_service.security.OAuth2AuthenticationSuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticationFilter;
        private final CustomUserDetailsService userDetailsService;
        private final OAuth2AuthenticationSuccessHandler oAuth2SuccessHandler;
        private final OAuth2AuthenticationFailureHandler oAuth2FailureHandler;
        private final PasswordEncoder passwordEncoder;

        @Value("${FRONTEND_URL}")
        private String frontendUrl;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                http
                        .csrf(csrf -> csrf.disable())
                        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                        .authorizeHttpRequests(auth -> auth
                                .requestMatchers(
                                        "/auth/register",
                                        "/auth/login",
                                        "/auth/emails",
                                        "/auth/google",
                                        "/oauth2/**",
                                        "/login/oauth2/**",
                                        "/error",
                                        "/auth/user-id"
                                ).permitAll()
                                .anyRequest().authenticated())
                        .oauth2Login(oauth -> oauth
                                .successHandler(oAuth2SuccessHandler)
                                .failureHandler(oAuth2FailureHandler))
                        .authenticationProvider(authenticationProvider())
                        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                            .httpBasic(AbstractHttpConfigurer::disable)
                            .formLogin(AbstractHttpConfigurer::disable);

                return http.build();
        }

        @Bean
        public DaoAuthenticationProvider authenticationProvider() {
                DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
                authProvider.setUserDetailsService(userDetailsService);
                authProvider.setPasswordEncoder(passwordEncoder);
                return authProvider;
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();
                // Restrict allowed origins to the configured frontend URL(s)
                // FRONTEND_URL may contain multiple origins separated by commas
                String[] allowed = frontendUrl.split(",");
                configuration.setAllowedOriginPatterns(List.of(allowed));
                configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
                configuration.setAllowedHeaders(List.of("*"));
                configuration.setAllowCredentials(false);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }

}