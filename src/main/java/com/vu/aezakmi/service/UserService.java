package com.vu.aezakmi.service;

import com.vu.aezakmi.controller.dto.UserDto;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    public void save(User user) {
        userRepository.save(user);
    }

    public List<UserDto> getUsers() {
        List<User> allUsers =  userRepository.findAll();
        return allUsers.stream().map(user -> new UserDto(user)).toList();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().getType().name())
                .build();
    }
}