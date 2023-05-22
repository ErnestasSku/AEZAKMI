package com.vu.aezakmi.dto;

import com.vu.aezakmi.model.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuccessfulLoginDTO {
    private String token;
    private Long id;
    private String username;
    private RoleType role;
}
