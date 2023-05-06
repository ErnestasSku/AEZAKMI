package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.UserDto;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public void save(User user) {
        userRepository.save(user);
    }

    public List<UserDto> getUsers() {
        return userRepository.findAllWithRoles();
    }
}