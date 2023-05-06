package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.CourseDto;
import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    public void create(Course course) {
        courseRepository.save(course);
    }

    public List<CourseDto> getAllCourses() {
        return courseRepository.findAllWithCreatorIds();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public void updateCourse(Course course) {
        courseRepository.save(course);
    }
}