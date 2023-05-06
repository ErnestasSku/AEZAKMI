package com.vu.aezakmi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String roleName;

    public UserDto(Long id, String username, String email, String roleName) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roleName = roleName;
    }
}