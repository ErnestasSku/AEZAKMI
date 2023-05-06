package com.vu.aezakmi.repository;

import com.vu.aezakmi.dto.UserDto;
import com.vu.aezakmi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT new com.vu.aezakmi.dto.UserDto(u.id, u.username, u.email, u.role.name) FROM User u")
    List<UserDto> findAllWithRoles();
}
