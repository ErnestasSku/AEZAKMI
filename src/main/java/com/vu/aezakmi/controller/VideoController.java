package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.VideoCreationDTO;
import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.model.Video;
import com.vu.aezakmi.service.CourseService;
import com.vu.aezakmi.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private CourseService courseService;

    @PostMapping
    public ResponseEntity<?> uploadVideo(@ModelAttribute VideoCreationDTO videoCreationDTO) throws IOException {
        Video video = new Video();
        video.setTitle(videoCreationDTO.getTitle());
        video.setDescription(videoCreationDTO.getDescription());

        if (videoCreationDTO.getCourseId() != null) {
            courseService.getCourseById(videoCreationDTO.getCourseId()).ifPresent(video::setCourse);
        }

        if (videoCreationDTO.getFile() == null) {
            return new ResponseEntity<>("Video should be uploaded!", HttpStatus.BAD_REQUEST);
        }

        Video uploadedVideo = videoService.upload(video, videoCreationDTO.getFile());
        if (uploadedVideo == null) {
            return new ResponseEntity<>("Video did not create", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Video with ID " + uploadedVideo.getId() + " got created", HttpStatus.CREATED);
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
