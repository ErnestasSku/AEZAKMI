package com.vu.aezakmi.multipartRequest;

import com.vu.aezakmi.dto.VideoDto;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
public class VideoUploadRequest {
    private MultipartFile file;
    private VideoDto videoDto;
}
