package com.vu.aezakmi.repository;

import com.vu.aezakmi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
