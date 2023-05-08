package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.UserGetDto;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public void save(User user) {
        userRepository.save(user);
    }

    public List<UserGetDto> getUsers() {
        return userRepository.findAllWithRoles();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}