package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.UserSignupDTO;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public List<UserSignupDTO> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User getUser(@PathVariable Long id) {
        Optional<User> potentialUser = userService.getUserById(id);
        if(potentialUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        return userService.getUserById(id).get();
    }
}
