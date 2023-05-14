package com.vu.aezakmi.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoCreationDTO {
    private MultipartFile file;
    private Long id;

    private String title;

    private String description;

    private Long courseId;
}
