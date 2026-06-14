package com.rankhub.bets_service.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.rankhub.bets_service.entity.Event;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EventRepository {
        private final EventJpaRepository eventJpaRepository;
        
        public Event save(Event event) {
            return eventJpaRepository.save(event);
        }

        public Event findById(UUID eventId) {
            return eventJpaRepository.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));
        }
        
        public List<Event> findByRankingId(UUID rankingId) {
            return eventJpaRepository.findByRankingId(rankingId);
        }
}
