package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.SuccessfulLoginDTO;
import com.vu.aezakmi.dto.UserLoginDTO;
import com.vu.aezakmi.dto.UserSignupDTO;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.service.AuthService;
import com.vu.aezakmi.service.TokenService;
import com.vu.aezakmi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;
    private final TokenService tokenService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(AuthService authService, TokenService tokenService, UserService userService,
                          AuthenticationManager authenticationManager) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/signup")
    public void signup(@RequestBody UserSignupDTO userSignupDto) {
        authService.signup(userSignupDto);
    }

    @PostMapping("/login")
    public SuccessfulLoginDTO login(@RequestBody UserLoginDTO userLogin) {
        UserDetails userDetails = userService.loadUserByUsername(userLogin.getUsername());
        User user = userService.getUserByUsername(userLogin.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails
                , userLogin.getPassword(), userDetails.getAuthorities());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        String token = tokenService.generateToken(authentication);
        return new SuccessfulLoginDTO(token, user.getId(), user.getUsername(),
                user.getRole().getType());
    }
}
