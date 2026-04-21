package com.rankhub.ranking_service.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.rankhub.ranking_service.dto.ApiMessageDto;
import com.rankhub.ranking_service.dto.RankingWithRoleDto;
import com.rankhub.ranking_service.dto.RoleDto;
import com.rankhub.ranking_service.entity.Ranking;
import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.entity.utils.RoleType;
import com.rankhub.ranking_service.mapper.RankingMapper;
import com.rankhub.ranking_service.request.RankingRequest;
import com.rankhub.ranking_service.service.RankingService;
import com.rankhub.ranking_service.service.RoleService;

class RankingControllerWebMvcTest {

    private FakeRoleService roleService;
    private FakeRankingService rankingService;
    private RankingController controller;

    @BeforeEach
    void setUp() {
        roleService = new FakeRoleService();
        rankingService = new FakeRankingService();
        controller = new RankingController(roleService, rankingService, new RankingMapper());
    }

    @Test
    void deleteRanking_whenRoleNotFound_returnsForbidden() {
        UUID rankingId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();

        ResponseEntity<ApiMessageDto> response = controller.deleteRanking(rankingId, userId);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertFalse(rankingService.deleted);
    }

    @Test
    void deleteRanking_whenAdminRole_deletesRanking() {
        UUID rankingId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();

        Role role = new Role();
        role.setRole(RoleType.ADMIN);
        roleService.roleToReturn = role;

        ResponseEntity<ApiMessageDto> response = controller.deleteRanking(rankingId, userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(rankingService.deleted);
        assertEquals(rankingId, rankingService.deletedRankingId);
    }

    @Test
    void deleteRanking_whenGuestRole_returnsForbidden() {
        UUID rankingId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();

        Role role = new Role();
        role.setRole(RoleType.GUEST);
        roleService.roleToReturn = role;

        ResponseEntity<ApiMessageDto> response = controller.deleteRanking(rankingId, userId);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
        assertFalse(rankingService.deleted);
    }

    @Test
    void deleteMyRanking_whenRoleCannotBeDeleted_returnsForbidden() {
        UUID rankingId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        roleService.deleteResult = false;

        ResponseEntity<ApiMessageDto> response = controller.deleteMyRanking(userId, rankingId);

        assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
    }

    private static final class FakeRoleService implements RoleService {
        private Role roleToReturn;
        private boolean deleteResult = true;

        @Override
        public Role createRole(RoleDto role) {
            return null;
        }

        @Override
        public boolean deleteByRankingIdUserId(UUID rankingId, UUID userId) {
            return deleteResult;
        }

        @Override
        public Role getByRankingIdUserId(UUID rankingId, UUID userId) {
            return roleToReturn;
        }
    }

    private static final class FakeRankingService implements RankingService {
        private boolean deleted;
        private UUID deletedRankingId;

        @Override
        public List<Ranking> getAllRankings() {
            return Collections.emptyList();
        }

        @Override
        public Ranking getRankingById(UUID id) {
            return null;
        }

        @Override
        public Ranking createRanking(RankingRequest rankingRequest) {
            return null;
        }

        @Override
        public Ranking updateRanking(UUID rankingId, RankingRequest rankingRequest) {
            return null;
        }

        @Override
        public Ranking patchRanking(UUID rankingId, RankingRequest request) {
            return null;
        }

        @Override
        public void deleteRanking(UUID rankingId) {
            this.deleted = true;
            this.deletedRankingId = rankingId;
        }

        @Override
        public List<RankingWithRoleDto> getRankingsByUserId(UUID userId) {
            return Collections.emptyList();
        }
    }
}
