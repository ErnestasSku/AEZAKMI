package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.VideoCreationDTO;
import com.vu.aezakmi.dto.VideoRetrievalDTO;
import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.model.Video;
import com.vu.aezakmi.service.CourseService;
import com.vu.aezakmi.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private CourseService courseService;

    @PostMapping
    public ResponseEntity<?> uploadVideo(@ModelAttribute VideoCreationDTO videoCreationDTO) throws IOException {
        return videoService.upload(videoCreationDTO);
    }

    @GetMapping
    public List<VideoRetrievalDTO> getAllVideos(@RequestParam(required = false) Long courseId) {
        return videoService.getAllVideos(courseId);
    }

    @GetMapping("{id}")
    public VideoRetrievalDTO getVideoById(@PathVariable Long id) {
        return videoService.getVideoDtoById(id);
    }

    @GetMapping(value = "{id}/data", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public byte[] getVideoData(@PathVariable Long id) {
        return videoService.getVideoData(id);
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
