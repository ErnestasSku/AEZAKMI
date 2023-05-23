package com.vu.aezakmi.config;

import com.vu.aezakmi.model.Role;
import com.vu.aezakmi.model.RoleType;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.repository.RoleRepository;
import com.vu.aezakmi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
public class SetupDataLoader implements
        ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (alreadySetup)
            return;

        createRoleIfNotFound(RoleType.ADMIN);
        createRoleIfNotFound(RoleType.TEACHER);
        createRoleIfNotFound(RoleType.USER);

        createUserIfNotFound("admin1", "admin1", "admin1@admin.lt", RoleType.ADMIN);
        createUserIfNotFound("admin2", "admin2", "admin2@admin.lt", RoleType.ADMIN);


        alreadySetup = true;
    }

    @Transactional
    Role createRoleIfNotFound(RoleType type) {
        Optional<Role> role = roleRepository.findByType(type);
        if (role.isEmpty()) {
            Role newRole = new Role();
            newRole.setType(type);
            roleRepository.save(newRole);
            return newRole;
        }
        return null;
    }

    @Transactional
    User createUserIfNotFound(String username, String password, String email, RoleType type) {
        Role adminRole = roleRepository.findByType(type).get();
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isEmpty()) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(passwordEncoder.encode(password));
            newUser.setEmail(email);
            newUser.setRole(adminRole);
            userRepository.save(newUser);
            return newUser;
        }
        return null;
    }

}