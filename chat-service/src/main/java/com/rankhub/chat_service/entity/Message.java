package com.rankhub.chat_service.entity;

import java.sql.Timestamp;
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
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "username")
    private String username;

    @Column(name = "chat_id")
    private UUID chatId;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "body")
    private String body;
}
