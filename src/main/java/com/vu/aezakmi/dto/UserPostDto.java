package com.vu.aezakmi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPostDto {
    private Long id;
    private String username;
    private String password;
    private String email;
    private Long roleId;
}
