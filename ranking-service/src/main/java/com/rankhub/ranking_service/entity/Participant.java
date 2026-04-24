package com.rankhub.ranking_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

import jakarta.persistence.Column;

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
@Table(name = "participants")
public class Participant {
    @Id
    @GeneratedValue
    private UUID id;


    @Column(name = "points")
    private int points;

    @Column(name = "position")
    private int position;

    

    @Column(name = "game_id")
    private UUID gameId;

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "guest_name")
    private String guestName;
}
