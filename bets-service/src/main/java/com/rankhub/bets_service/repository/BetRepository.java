package com.rankhub.bets_service.repository;

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
}
