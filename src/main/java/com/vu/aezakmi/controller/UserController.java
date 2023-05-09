package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.UserGetDto;
import com.vu.aezakmi.dto.UserPostDto;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.service.RoleService;
import com.vu.aezakmi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @PostMapping
    public void saveUser(@RequestBody UserPostDto userpostDto) {
        User user = new User();
        user.setUsername(userpostDto.getUsername());
        user.setPassword(userpostDto.getPassword());
        user.setEmail(userpostDto.getEmail());

        roleService.getRoleById(userpostDto.getRoleId()).ifPresent(user::setRole);

        userService.save(user);
    }

    @GetMapping
    public List<UserGetDto> getUsers() {
        return userService.getUsers();
    }
}
