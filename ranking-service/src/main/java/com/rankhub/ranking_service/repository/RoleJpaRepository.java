package com.rankhub.ranking_service.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rankhub.ranking_service.entity.Role;
import com.rankhub.ranking_service.entity.utils.RoleType;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleJpaRepository extends JpaRepository<Role, UUID>, JpaSpecificationExecutor<Role> {

   /*  @Modifying
    @Transactional
    @Query(value = """
                INSERT INTO roles (id, ranking_id, user_id, role)
                VALUES (gen_random_uuid(), :rankingId, :userId, CAST(:role AS roles_types))
            """, nativeQuery = true)
    void insertRole(
            @Param("rankingId") UUID rankingId,
            @Param("userId") UUID userId,
            @Param("role") String role);
*/
    @Modifying
    @Transactional
    @Query("DELETE FROM Role r WHERE r.userId = :userId AND r.rankingId = :rankingId")
    void deleteByRankingIdUserId(@Param("rankingId") UUID rankingId, @Param("userId") UUID userId);

    @Query("Select r FROM Role r WHERE r.userId = :userId AND r.rankingId = :rankingId")
    Role getByRankingIdUserId(@Param("rankingId") UUID rankingId, @Param("userId") UUID userId);



    List<Role> getRoleByRankingIdAndRoleType(UUID rankingId, RoleType roleType);
}
