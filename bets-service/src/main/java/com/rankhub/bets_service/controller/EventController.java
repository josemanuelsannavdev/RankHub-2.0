package com.rankhub.bets_service.controller;

import com.rankhub.bets_service.repository.BetJpaRepository;
import com.rankhub.bets_service.repository.BetRepository;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.rankhub.bets_service.dto.BetDto;
import com.rankhub.bets_service.dto.EventDto;
import com.rankhub.bets_service.entity.Bet;
import com.rankhub.bets_service.entity.Event;
import com.rankhub.bets_service.request.BetRequest;
import com.rankhub.bets_service.request.EventRequest;
import com.rankhub.bets_service.service.BetService;
import com.rankhub.bets_service.service.EventService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
@Slf4j
public class EventController {
    
    private final SimpMessagingTemplate messagingTemplate;
    private final EventService eventService;
    private final BetService betService;

    

    // aqui llegan las APUESTAS
    @MessageMapping("/event/{eventId}")
    public void sendMessage(@DestinationVariable UUID eventId, BetRequest betRequest) {
        
        BetDto betDto = null;

        if (betRequest.getAction().equals("DELETE")) {
            betService.deleteBet(betRequest.getId());
           betDto = new BetDto().builder()
                    .id(betRequest.getId())
                    .action(betRequest.getAction())
                    .build();
        } else if(betRequest.getAction().equals("CREATE")) {
            Bet bet = betService.createBet(betRequest, eventId);

             betDto = new BetDto().builder()
                    .id(bet.getId())
                    .eventId(bet.getEventId())
                    .sideId(bet.getSideId())
                    .playerId(bet.getPlayerId())
                    .points(bet.getPoints())
                    .status(bet.getStatus())
                    .playerName(bet.getPlayerName())
                    .playerImage(bet.getPlayerImage())
                    .creatorName(betRequest.getCreatorName())
                    .build();
        }else if( betRequest.getAction().equals("CLOSE")){
            eventService.closeEvent(eventId);
             betDto = new BetDto().builder()
                    .action("CLOSE")
                    .build();
        }

        
        messagingTemplate.convertAndSend(
                "/topic/event/" + eventId,
                betDto);

    }

    // CREAR UN EVENTO
    @PostMapping("/event")
    public ResponseEntity<EventDto> createEvent(@RequestBody EventRequest eventRequest) {

        EventDto eventDto = eventService.createEvent(eventRequest);

        return ResponseEntity.ok(eventDto);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<EventDto> getEvent(@PathVariable UUID eventId) {
        EventDto eventDto = eventService.getEventById(eventId);
        return ResponseEntity.ok(eventDto);
    }

    @GetMapping("/event/ranking/{rankingId}")
    public ResponseEntity<List<EventDto>> getEvents(@PathVariable UUID rankingId) {
        List<EventDto> eventDtos = eventService.getEventsByRankingId(rankingId);
        return ResponseEntity.ok(eventDtos);
    }

    @GetMapping("/event/bets/{eventId}")
    public ResponseEntity<List<BetDto>> getBetsByEventId(@PathVariable UUID eventId) {
        List<BetDto> betDtos = betService.getBetsByEventId(eventId);
        return ResponseEntity.ok(betDtos);
    }

    @PutMapping("/event/finish/{eventId}/{sideId}")
    public ResponseEntity<Void> finishEvent(@PathVariable UUID eventId, @PathVariable UUID sideId) {
        eventService.finishEvent(eventId,sideId);
        return ResponseEntity.ok().build();
    }
}
