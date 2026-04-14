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
@Table(name = "players" )
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "points")
    private Double points;

    @Column(name = "games_played")
    private int gamesPlayed;

    @Column(name = "games_lost")
    private int gamesLost;

    @Column(name = "games_won")
    private int gamesWon;

    @Column(name = "ranking_id")
    private UUID rankingId;

    @Column(name = "image")
    private String image;
}
