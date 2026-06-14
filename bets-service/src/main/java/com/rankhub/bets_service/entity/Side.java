package com.rankhub.bets_service.entity;

import java.sql.Timestamp;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "sides")
public class Side {
    
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "event_id")
    private UUID eventId;

    @Column(name = "odds")
    private Double odds;

    @Column(name = "type")
    private String type;

    @Column(name = "win")
    private Boolean win;
}
