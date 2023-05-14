package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.model.RoleType;
import com.vu.aezakmi.model.User;
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
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private VideoService videoService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createCourse(@RequestBody CourseDTO courseDto) {
        Course course = new Course();
        course.setName(courseDto.getName());
        course.setDescription(courseDto.getDescription());

        Long creatorId = courseDto.getCreatorId();
        if (creatorId == null) {
            return new ResponseEntity<>("creatorID should be set", HttpStatus.BAD_REQUEST);
        }

        User user = userService.getUserById(creatorId).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("No user with exists with provided creatorId", HttpStatus.BAD_REQUEST);
        } else if (user.getRole().getType() != RoleType.TEACHER) {
            return new ResponseEntity<>("You do not have access for this action", HttpStatus.FORBIDDEN);
        } else {
            course.setCreator(user);
        }

        Course createdCourse = courseService.create(course);
        if (createdCourse == null) {
            return new ResponseEntity<>("Course did not create", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Course with ID " + createdCourse.getId() + " got created", HttpStatus.CREATED);
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
