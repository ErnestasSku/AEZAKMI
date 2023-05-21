package com.vu.aezakmi.dto;

import com.vu.aezakmi.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatorDTO {
    private Long id;
    private String username;

    public CreatorDTO(User creator) {
        this.id = creator.getId();
        this.username = creator.getUsername();
    }
}
