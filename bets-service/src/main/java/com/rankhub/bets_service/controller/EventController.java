package com.rankhub.bets_service.controller;

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
import com.rankhub.bets_service.entity.Event;
import com.rankhub.bets_service.request.EventRequest;
import com.rankhub.bets_service.service.BetService;
import com.rankhub.bets_service.service.EventService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
@Slf4j
public class EventController {
    private final SimpMessagingTemplate messagingTemplate;
    private final EventService eventService;
    private final BetService betService;

    //aqui llegan las APUESTAS
    @MessageMapping("/event/{eventId}")
    public void sendMessage(@DestinationVariable UUID eventId, BetDto betDto) {

        BetDto newBetDto = BetDto.builder()
                .id(betDto.getId())
                .eventId(betDto.getEventId())
                .sideId(betDto.getSideId())
                .playerId(betDto.getPlayerId())
                .points(betDto.getPoints())
                .status("PENDING")
                .build();

        messagingTemplate.convertAndSend(
                "/topic/event/" + eventId,
                newBetDto);

        betService.createBet(newBetDto);
    }

   
   //CREAR UN EVENTO
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

}
