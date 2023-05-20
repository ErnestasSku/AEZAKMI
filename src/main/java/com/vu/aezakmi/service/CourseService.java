package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.model.RoleType;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.repository.CourseRepository;
import com.vu.aezakmi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<?> create(CourseDTO courseDto) {
        // validation
        Long creatorId = courseDto.getCreatorId();
        if (creatorId == null) {
            return new ResponseEntity<>("creatorID should be set", HttpStatus.BAD_REQUEST);
        }
        User user = userRepository.findById(creatorId).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("No user with exists with provided creatorId", HttpStatus.BAD_REQUEST);
        } else if (user.getRole().getType() != RoleType.TEACHER) {
            return new ResponseEntity<>("You do not have access for this action", HttpStatus.FORBIDDEN);
        }

        // create course
        Course course = new Course();
        course.setName(courseDto.getName());
        course.setDescription(courseDto.getDescription());
        course.setCreator(user);

        // save course
        Course createdCourse = courseRepository.save(course);

        return new ResponseEntity<>("Course with ID " + createdCourse.getId() + " got created", HttpStatus.CREATED);
    }

    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAllWithCreatorIds();
    }

    public List<CourseDTO> getAllCoursesByCreatorId(Long creatorId) {
        return courseRepository.findAllByCreatorId(creatorId);
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