package com.vu.aezakmi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGetDto {
    private Long id;
    private String username;
    private String email;
    private String roleName;
}