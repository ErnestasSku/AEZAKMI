package com.vu.aezakmi.controller;

import com.vu.aezakmi.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping(
            value = "{id}",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getImageById(@PathVariable Long id) {
        return imageService.getImageById(id);
    }
}
