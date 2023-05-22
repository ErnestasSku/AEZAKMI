package com.vu.aezakmi.repository;

import com.vu.aezakmi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.role.id = :role_id")
    List<User> getAllUsersByRoleId(@Param("role_id") Long roleId);
}
