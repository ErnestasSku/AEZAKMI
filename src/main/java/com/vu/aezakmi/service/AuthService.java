package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.UserSignupDTO;
import com.vu.aezakmi.model.Role;
import com.vu.aezakmi.model.RoleType;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.repository.RoleRepository;
import com.vu.aezakmi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public void signup(UserSignupDTO userSignupDto) {
        Role userRole = roleRepository.findByType(RoleType.USER)
                .orElseThrow(() -> new RuntimeException("User role not found"));

        User user = new User();
        user.setUsername(userSignupDto.getUsername());
        user.setPassword(passwordEncoder.encode(userSignupDto.getPassword()));
        user.setEmail(userSignupDto.getEmail());
        user.setRole(userRole);

        userRepository.save(user);
    }

    public UserSignupDTO login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new UserSignupDTO(user);
    }


}
