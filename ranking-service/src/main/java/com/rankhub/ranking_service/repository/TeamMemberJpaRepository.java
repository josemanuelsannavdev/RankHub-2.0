package com.rankhub.ranking_service.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.rankhub.ranking_service.entity.TeamMember;

public interface TeamMemberJpaRepository extends JpaRepository<TeamMember, UUID>, JpaSpecificationExecutor<TeamMember> {
}
