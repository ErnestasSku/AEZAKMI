package com.vu.aezakmi.repository;

import com.vu.aezakmi.model.Role;
import com.vu.aezakmi.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByType(RoleType type);
}
