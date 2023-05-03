package com.vu.aezakmi.service;

import com.vu.aezakmi.model.Role;
import com.vu.aezakmi.model.RoleType;
import com.vu.aezakmi.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void init() {
        Role adminRole = new Role();
        adminRole.setType(RoleType.ADMIN);
        roleRepository.save(adminRole);

        Role teacherRole = new Role();
        teacherRole.setType(RoleType.TEACHER);
        roleRepository.save(teacherRole);

        Role userRole = new Role();
        userRole.setType(RoleType.USER);
        roleRepository.save(userRole);
    }
}
