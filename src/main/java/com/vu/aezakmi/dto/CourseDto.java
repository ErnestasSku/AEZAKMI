package com.vu.aezakmi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CourseDto {
    private Long id;
    private String name;
    private String description;
    private Long creatorId;

    public CourseDto(Long id, String name, String description, Long creatorId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creatorId = creatorId;
    }
}
