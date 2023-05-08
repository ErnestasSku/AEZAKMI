package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.UserGetDto;
import com.vu.aezakmi.dto.UserPostDto;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public void saveUser(@RequestBody UserPostDto userpostDto) {
        User user = new User();
        user.setUsername(userpostDto.getUsername());
        user.setPassword(userpostDto.getPassword());
        user.setEmail(userpostDto.getEmail());

        // TODO create role controller, service, repo and set the role here

        userService.save(user);
    }

    @GetMapping
    public List<UserGetDto> getUsers() {
        return userService.getUsers();
    }
}
