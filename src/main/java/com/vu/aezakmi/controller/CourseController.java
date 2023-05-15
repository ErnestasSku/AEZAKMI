package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

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
    public ResponseEntity<?> addVideoToCourse(@PathVariable Long courseId, @PathVariable Long videoId) {
        return courseService.addVideoToCourse(courseId, videoId);
    }
}
