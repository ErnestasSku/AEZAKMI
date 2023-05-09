package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.VideoDto;
import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.model.Video;
import com.vu.aezakmi.service.CourseService;
import com.vu.aezakmi.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private CourseService courseService;

    @PostMapping
    public void uploadVideo(@RequestBody VideoDto videoDto) {
        Video video = new Video();
        video.setTitle(videoDto.getTitle());
        video.setDescription(videoDto.getDescription());
        video.setVideoUrl(videoDto.getVideoUrl());

        courseService.getCourseById(videoDto.getCourseId()).ifPresent(video::setCourse);

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

    @PatchMapping("{videoId}/course/{courseId}")
    public void addVideoToCourse(@PathVariable Long videoId, @PathVariable Long courseId) {
        Video video = videoService.getVideoById(videoId).orElse(null);
        if (video != null) {
            Course course = courseService.getCourseById(courseId).orElse(null);
            if (course != null) {
                video.setCourse(course);
                videoService.updateVideo(video);
            }
        }
    }
}
