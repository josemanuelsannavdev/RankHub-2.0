package com.rankhub.bets_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.bets_service.entity.Bet;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class BetRepository {
    
    private final BetJpaRepository betJpaRepository;

    public Bet save(Bet bet) {
        return betJpaRepository.save(bet);
    }

    public List<Bet> findByEventId(UUID eventId) {
        return betJpaRepository.findByEventId(eventId);
    }

    public void deleteById(UUID betId) {
        betJpaRepository.deleteById(betId);
    }

    public Bet findById(UUID betId) {
        return betJpaRepository.findById(betId).orElseThrow(() -> new RuntimeException("Bet not found with id: " + betId));
    }
}
