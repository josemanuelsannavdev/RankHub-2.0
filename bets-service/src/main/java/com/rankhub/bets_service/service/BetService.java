package com.rankhub.bets_service.service;

import java.util.List;
import java.util.UUID;

import com.rankhub.bets_service.dto.BetDto;
import com.rankhub.bets_service.entity.Bet;
import com.rankhub.bets_service.request.BetRequest;

public interface BetService {
    
    Bet createBet(BetRequest betRequest,UUID eventId);
    List<BetDto> getBetsByEventId(UUID eventId);

    void deleteBet(UUID betId);

    Bet getBetById(UUID betId);

    void updateBet(Bet bet);
}
