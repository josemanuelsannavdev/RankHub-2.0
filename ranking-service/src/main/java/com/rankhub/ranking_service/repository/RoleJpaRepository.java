package com.rankhub.ranking_service.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rankhub.ranking_service.entity.Role;

import jakarta.transaction.Transactional;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleJpaRepository extends JpaRepository<Role, UUID>, JpaSpecificationExecutor<Role> {

    @Modifying
    @Transactional
    @Query(value = """
                INSERT INTO roles (id, ranking_id, user_id, role)
                VALUES (gen_random_uuid(), :rankingId, :userId, CAST(:role AS roles_types))
            """, nativeQuery = true)
    void insertRole(
            @Param("id") UUID id,
            @Param("rankingId") UUID rankingId,
            @Param("userId") UUID userId,
            @Param("role") String role);
}
