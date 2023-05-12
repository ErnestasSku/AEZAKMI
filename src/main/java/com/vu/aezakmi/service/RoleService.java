package com.vu.aezakmi.service;

import com.vu.aezakmi.model.Role;
import com.vu.aezakmi.model.RoleType;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.repository.RoleRepository;
import com.vu.aezakmi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    public void updateRole(Long userId, RoleType roleType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepository.findByType(roleType)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        userRepository.save(user);
    }
}
