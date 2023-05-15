package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.model.Video;
import com.vu.aezakmi.service.CourseService;
import com.vu.aezakmi.service.UserService;
import com.vu.aezakmi.service.VideoService;
import com.vu.aezakmi.utils.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private VideoService videoService;

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody CourseDTO courseDto) {
        return courseService.create(courseDto);
    }

    @GetMapping
    public List<CourseDTO> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("{id}")
    public CourseDTO getCourseById(@PathVariable Long id) {
        return courseService.getCourseByIdWithCreatorId(id).orElse(null);
    }

    @PatchMapping("{courseId}/video/{videoId}")
    @ResponseBody
    public ResponseEntity<List<Video>> addVideoToCourse(@PathVariable Long courseId, @PathVariable Long videoId) {
        Course course = courseService.getCourseById(courseId).orElse(null);
        if (course != null) {
            Video video = videoService.getVideoById(videoId).orElse(null);
            if (video != null) {

                video.setCourse(course);
                videoService.updateVideo(video);

                // depending on whether the update worked, we display all the courses videos again
                Course updatedCourse = courseService.getCourseById(courseId).orElseThrow(() ->
                        new ResourceNotFoundException("Course should exist")
                );
                return new ResponseEntity<>(updatedCourse.getVideos(), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}
