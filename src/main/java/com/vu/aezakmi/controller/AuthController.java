package com.vu.aezakmi.controller;

import com.vu.aezakmi.controller.dto.UserDto;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public void signup(@RequestBody UserDto userDto) {
        authService.signup(userDto);
    }

    @PostMapping("/login")
    public UserDto login(@RequestParam String username, @RequestParam String password) {
        return authService.login(username, password);
    }
}
