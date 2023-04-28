package com.vu.aezakmi.controller;

import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public void createCourse(@RequestBody Course course) {
        courseService.create(course);
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id).orElse(null);
    }
}
