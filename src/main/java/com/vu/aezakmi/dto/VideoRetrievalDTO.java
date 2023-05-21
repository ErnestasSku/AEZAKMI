package com.vu.aezakmi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoRetrievalDTO {
    private Long id;
    private String title;
    private String description;
    private CourseDTO course;
    private CreatorDTO creator;
    private String imageUrl;
}