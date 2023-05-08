package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.UserDto;
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
    public void saveUser(@RequestBody User user) {
        userService.save(user);
    }

    @GetMapping
    public List<UserDto> getUsers() {
        return userService.getUsers();
    }
}
