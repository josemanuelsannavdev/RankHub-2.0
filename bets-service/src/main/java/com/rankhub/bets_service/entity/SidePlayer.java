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
@Table(name = "sidePlayers")
public class SidePlayer {
    
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "side_id")
    private UUID sideId;

    @Column(name = "name")
    private String name;

    @Column(name = "image")
    private String image;

}
