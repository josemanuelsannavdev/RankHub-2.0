package com.rankhub.auth_service.entity;


import jakarta.persistence.*;
import java.time.Instant;
import lombok.*;

@Entity
@Table(name = "refeshtoken")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private Instant expiryDate;

}
