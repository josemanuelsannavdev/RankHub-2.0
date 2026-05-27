package com.rankhub.ranking_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.sql.Timestamp;
import java.util.UUID;

import com.rankhub.ranking_service.entity.utils.GameType;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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
@Table(name = "duels")
public class Duel {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "game_id")
    private UUID gameId;

    @Column(name = "winner_id")
    private UUID winnerId;

    @Column(name = "loser_id")
    private UUID loserId;
    
    @Column(name = "bet")
    private int bet;

    @Column(name="winner_guest_name")
    private String winnerGuestName;

    @Column(name="loser_guest_name")
    private String loserGuestName;
}