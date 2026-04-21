package com.rankhub.ranking_service.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.rankhub.ranking_service.entity.Player;
import com.rankhub.ranking_service.repository.PlayerRepository;
import com.rankhub.ranking_service.request.PlayerRequest;

class PlayerServiceImplTest {

    private FakePlayerRepository fakePlayerRepository;
    private PlayerServiceImpl playerService;

    @BeforeEach
    void setUp() {
        fakePlayerRepository = new FakePlayerRepository();
        playerService = new PlayerServiceImpl(fakePlayerRepository);
    }

    @Test
    void patchPlayer_whenPlayerDoesNotExist_throwsAndDoesNotSave() {
        UUID playerId = UUID.randomUUID();
        PlayerRequest request = new PlayerRequest("Nuevo", 10.0, null, null, null, null);

        assertThrows(IllegalArgumentException.class, () -> playerService.patchPlayer(playerId, request));

        assertEquals(0, fakePlayerRepository.saveCount);
    }

    @Test
    void patchPlayer_whenNameIsNull_keepsPreviousName() {
        UUID playerId = UUID.randomUUID();
        Player existing = Player.builder().id(playerId).name("Original").build();
        fakePlayerRepository.playerById = existing;

        PlayerRequest request = new PlayerRequest(null, 10.0, null, null, null, null);

        Player result = playerService.patchPlayer(playerId, request);

        assertEquals("Original", result.getName());
        assertEquals(1, fakePlayerRepository.saveCount);
    }

    @Test
    void patchPlayer_whenNameIsPresent_updatesName() {
        UUID playerId = UUID.randomUUID();
        Player existing = Player.builder().id(playerId).name("Original").build();
        fakePlayerRepository.playerById = existing;

        PlayerRequest request = new PlayerRequest("Actualizado", 10.0, null, null, null, null);

        Player result = playerService.patchPlayer(playerId, request);

        assertEquals("Actualizado", result.getName());
        assertEquals(1, fakePlayerRepository.saveCount);
    }

    @Test
    void createPlayer_whenNameAlreadyExists_throwsAndDoesNotSave() {
        fakePlayerRepository.nameExists = true;
        PlayerRequest request = new PlayerRequest("Ana", 3.0, null, null, null, null);

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> playerService.createPlayer(request));

        assertEquals("Player ya existente, cambiar nombre", ex.getMessage());
        assertEquals(0, fakePlayerRepository.saveCount);
    }

    @Test
    void createPlayer_whenNameIsUnique_savesTrimmedName() {
        fakePlayerRepository.nameExists = false;
        PlayerRequest request = new PlayerRequest("  Ana  ", 3.0, null, null, null, null);

        Player result = playerService.createPlayer(request);

        assertEquals("Ana", result.getName());
        assertEquals(1, fakePlayerRepository.saveCount);
    }

    private static final class FakePlayerRepository extends PlayerRepository {
        private Player playerById;
        private int saveCount;
        private boolean nameExists;

        private FakePlayerRepository() {
            super(null);
        }

        @Override
        public Player getPlayerById(UUID id) {
            return playerById;
        }

        @Override
        public Player save(Player player) {
            this.saveCount++;
            this.playerById = player;
            return player;
        }

        @Override
        public boolean existsByNameIgnoreCase(String name) {
            return nameExists;
        }
    }
}