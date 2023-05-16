package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.model.RoleType;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.model.Video;
import com.vu.aezakmi.repository.CourseRepository;
import com.vu.aezakmi.repository.UserRepository;
import com.vu.aezakmi.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    VideoRepository videoRepository;

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

    public List<CourseDTO> getAllCourses(String search) {
        List<CourseDTO> courseDTOs = new ArrayList<>();
        List<Course> courses =
                search == null ? courseRepository.findAll() : courseRepository.findByNameContainingIgnoreCase(search);
        for (Course course : courses) {
            CourseDTO courseDTO = setCourseDTO(course);
            courseDTOs.add(courseDTO);
        }

        return courseDTOs;
    }

    public CourseDTO getCourseDtoById(Long id) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course != null) {
            return setCourseDTO(course);
        }

        return null;
    }

    private CourseDTO setCourseDTO(Course course) {
        CourseDTO courseDTO = new CourseDTO();
        courseDTO.setId(course.getId() != null ? course.getId() : null);
        courseDTO.setName(course.getName() != null ? course.getName() : null);
        courseDTO.setDescription(course.getDescription() != null ? course.getDescription() : null);
        courseDTO.setCreatorId(course.getCreator() != null ? course.getCreator().getId() : null);

        return courseDTO;
    }

    public ResponseEntity<?> addVideoToCourse(Long courseId, Long videoId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            return new ResponseEntity<>("Course with specified Id does not exist", HttpStatus.BAD_REQUEST);
        }

        Video video = videoRepository.findById(videoId).orElse(null);
        if (video == null) {
            return new ResponseEntity<>("Video with specified Id does not exist", HttpStatus.BAD_REQUEST);
        }

        video.setCourse(course);
        videoRepository.save(video);

        return new ResponseEntity<>(
                "Video (id: " + video.getId() + ") was added to course (id: " + course.getId() + ")",
                HttpStatus.OK
        );
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public void updateCourse(Course course) {
        courseRepository.save(course);
    }
}