package com.rankhub.bets_service.service;

import com.rankhub.bets_service.dto.BetDto;
import com.rankhub.bets_service.entity.Bet;

public interface BetService {
    
    Bet createBet(BetDto betDto);
}
