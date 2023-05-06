package com.vu.aezakmi.controller;

import com.vu.aezakmi.controller.dto.LoginDto;
import com.vu.aezakmi.controller.dto.UserDto;
import com.vu.aezakmi.service.AuthService;
import com.vu.aezakmi.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;



    @Autowired
    public AuthController(AuthService authService, TokenService tokenService, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup")
    public void signup(@RequestBody UserDto userDto) {
        authService.signup(userDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto userLogin) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.getUsername(), userLogin.getPassword()));
        return tokenService.generateToken(authentication);
    }
}
