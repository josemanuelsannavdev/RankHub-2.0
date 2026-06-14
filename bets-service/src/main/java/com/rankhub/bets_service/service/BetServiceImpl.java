package com.rankhub.bets_service.service;

import org.springframework.stereotype.Service;

import com.rankhub.bets_service.dto.BetDto;
import com.rankhub.bets_service.entity.Bet;
import com.rankhub.bets_service.repository.BetRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class BetServiceImpl implements BetService {

    private final BetRepository betRepository;
    @Override
    public Bet createBet(BetDto betDto) {

        Bet bet = Bet.builder()
                .id(betDto.getId())
                .eventId(betDto.getEventId())
                .sideId(betDto.getSideId())
                .playerId(betDto.getPlayerId())
                .points(betDto.getPoints())
                .status(betDto.getStatus())
                .build();
        betRepository.save(bet);
        return bet;
    }
    
}
