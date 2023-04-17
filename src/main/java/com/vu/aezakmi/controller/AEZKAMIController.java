package com.vu.aezakmi.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AEZKAMIController {

    @GetMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

}