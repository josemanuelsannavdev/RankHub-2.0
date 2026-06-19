package com.rankhub.bets_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.bets_service.entity.SidePlayer;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SidePlayerRepository {
    private final SidePlayerJpaRepository sidePlayerJpaRepository;

    public SidePlayer save(SidePlayer sidePlayer) {
        return sidePlayerJpaRepository.save(sidePlayer);
    }

    public List<SidePlayer> getPlayersBySideId(UUID sideId) {
        return sidePlayerJpaRepository.findBySideId(sideId);
    }
}
