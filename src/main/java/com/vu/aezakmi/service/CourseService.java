package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.CourseDTO;
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

    public Course create(Course course) {
        return courseRepository.save(course);
    }

    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAllWithCreatorIds();
    }

    public Optional<CourseDTO> getCourseByIdWithCreatorId(Long id) {
        return courseRepository.findByIdWithCreatorId(id);
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public void updateCourse(Course course) {
        courseRepository.save(course);
    }
}