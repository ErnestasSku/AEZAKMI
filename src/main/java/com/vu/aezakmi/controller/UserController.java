package com.vu.aezakmi.controller;

import com.vu.aezakmi.controller.dto.UserDto;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public void saveUser(@RequestBody User user) {
        userService.save(user);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public List<UserDto> getUsers() {
        return userService.getUsers();
    }
}
