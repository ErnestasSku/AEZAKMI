package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.CourseCreationDTO;
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
    public ResponseEntity<?> createCourse(@RequestBody CourseCreationDTO courseDto,
                                          @RequestHeader("Authorization") String authorizationHeader) {
        return courseService.create(courseDto, authorizationHeader);
    }

    @GetMapping
    public List<CourseDTO> getAllCourses(@RequestParam(required = false) Long creatorId,
                                         @RequestParam(required = false) String search) {
        return courseService.getAllCourses(creatorId, search);
    }

    @GetMapping("{id}")
    public CourseDTO getCourseById(@PathVariable Long id) {
        return courseService.getCourseDtoById(id);
    }

    @PatchMapping("{courseId}/video/{videoId}")
    @ResponseBody
    public ResponseEntity<?> addVideoToCourse(@PathVariable Long courseId, @PathVariable Long videoId) {
        return courseService.addVideoToCourse(courseId, videoId);
    }
}
