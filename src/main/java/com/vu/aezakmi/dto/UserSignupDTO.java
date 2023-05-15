package com.vu.aezakmi.dto;

import com.vu.aezakmi.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSignupDTO {
    private String username;
    private String password;
    private String email;

    public UserSignupDTO(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.email = user.getEmail();
    }
}
