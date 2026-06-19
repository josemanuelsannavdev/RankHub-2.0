package com.rankhub.bets_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.bets_service.entity.Side;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SideRepository {
    
    private final SideJpaRepository sideJpaRepository;

    public Side save(Side side) {
        return sideJpaRepository.save(side);
    }

    public List<Side> findByEventId(UUID eventId) {
        return sideJpaRepository.findByEventId(eventId);
    }
}
