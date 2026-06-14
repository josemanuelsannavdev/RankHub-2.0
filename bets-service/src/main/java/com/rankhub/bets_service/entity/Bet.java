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
@Table(name = "bets")
public class Bet {
    
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "event_id")
    private UUID eventId;

    @Column(name = "side_id")
    private String sideId;

    @Column(name = "player_id")
    private String playerId;

    @Column(name = "points")
    private Integer points;

    @Column(name = "status")
    private String status;

   
}
