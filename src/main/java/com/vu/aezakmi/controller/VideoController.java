package com.vu.aezakmi.controller;

import com.vu.aezakmi.model.Video;
import com.vu.aezakmi.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping
    public void uploadVideo(@RequestBody Video video) {
        videoService.upload(video);
    }

    @GetMapping
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @GetMapping("{id}")
    public Video getVideoById(@PathVariable Long id) {
        return videoService.getVideoById(id).orElse(null);
    }
}
