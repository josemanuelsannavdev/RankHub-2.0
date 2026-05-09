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
@Table(name = "historicos")
public class Historico {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "game_id")
    private UUID gameId;

    @Column(name = "player_id")
    private UUID playerId;

    @Column(name = "total_points")
    private Double totalPoints;

    @Column(name = "obtained_points")
    private Double obtainedPoints;

    @Column(name = "position")
    private Integer position;
}
