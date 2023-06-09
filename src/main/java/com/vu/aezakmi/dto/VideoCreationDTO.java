package com.vu.aezakmi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoCreationDTO {
    private Long id;
    private String title;
    private String description;
    private Long courseId;
    private MultipartFile video;
    private MultipartFile image;
}
