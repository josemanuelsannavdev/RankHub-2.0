package com.rankhub.auth_service.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {
        /*Esto es para saber quienes tienen permisos para hacer peticiones o desde donde pueden hacerlas */
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                http
                        .csrf(csrf -> csrf.disable())/*Estás desactivando protección CSRF 🧠 ¿Qué es CSRF? Un ataque donde alguien hace peticiones en tu nombre desde otro sitio. */
                        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); //permitAll() → API abierta
                return http.build();
        }

        /*
         * Encargado de codificar una contraseña
         */
        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

}