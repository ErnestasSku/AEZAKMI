package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.UserLoginDTO;
import com.vu.aezakmi.dto.UserSignupDTO;
import com.vu.aezakmi.service.AuthService;
import com.vu.aezakmi.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;
    private final TokenService tokenService;
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(AuthService authService, TokenService tokenService, UserDetailsService userDetailsService, AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup")
    public void signup(@RequestBody UserSignupDTO userSignupDto) {
        authService.signup(userSignupDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserLoginDTO userLogin) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userLogin.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, userLogin.getPassword(), userDetails.getAuthorities());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        return tokenService.generateToken(authentication);
    }
}
