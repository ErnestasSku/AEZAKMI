package com.vu.aezakmi.dto;

import com.vu.aezakmi.model.Course;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private Long id;
    private String name;
    private String description;
    private CreatorDTO creator;
    private int videoCount;

    public CourseDTO(Course course) {
        this.name = course.getName();
        this.id = course.getId();
        this.description = course.getDescription();
        this.videoCount = course.getVideos().size();
        this.creator = new CreatorDTO(course.getCreator());
    }
}
