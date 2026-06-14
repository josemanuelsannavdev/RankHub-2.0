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
@Table(name = "events")
public class Event {
    
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "ranking_id")
    private UUID rankingId;

    @Column(name = "game_Name")
    private String gameName;

    @Column(name = "status")
    private String status;

    @Column(name = "date")
    private Timestamp  date;
}
