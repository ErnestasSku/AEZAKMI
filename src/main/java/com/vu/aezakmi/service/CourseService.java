package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.CourseCreationDTO;
import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.dto.CreatorDTO;
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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

    @Autowired
    TokenService tokenService;

    public ResponseEntity<?> create(CourseCreationDTO courseDto, String authorizationHeader) {
        // get user
        String token = authorizationHeader.substring("Bearer ".length());
        String username = tokenService.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not" +
                " found"));

        if (user.getRole().getType() != RoleType.TEACHER) {
            return new ResponseEntity<>("You do not have access for this action", HttpStatus.FORBIDDEN);
        }

        // create course
        Course course = new Course();
        course.setCreator(user);
        course.setName(courseDto.getName());
        course.setDescription(courseDto.getDescription());
        // save course
        Course createdCourse = courseRepository.save(course);

        List<Long> videoIds = courseDto.getVideoIds();
        if (videoIds != null) {
            List<Video> videos = videoRepository.findByIdIn(videoIds);
            videos.forEach(video -> video.setCourse(createdCourse));
            videoRepository.saveAll(videos);
        }

        return new ResponseEntity<>("Course with ID " + createdCourse.getId() + " got created", HttpStatus.CREATED);
    }

    public List<CourseDTO> getAllCourses(String search) {
        List<CourseDTO> courseDTOs = new ArrayList<>();
        List<Course> courses = search == null ? courseRepository.findAll()
                : courseRepository.findByNameContainingIgnoreCase(search);
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
        courseDTO.setVideoCount(course.getVideos().size());
        if (course.getCreator() != null) {
            CreatorDTO creatorDTO = new CreatorDTO();
            creatorDTO.setId(course.getCreator().getId());
            creatorDTO.setUsername(course.getCreator().getUsername());
            courseDTO.setCreator(creatorDTO);
        }

        return courseDTO;
    }

    public List<CourseDTO> getAllCoursesByCreatorId(Long creatorId) {
        return courseRepository.findAllByCreatorId(creatorId);
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
                HttpStatus.OK);
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public void updateCourse(Course course) {
        courseRepository.save(course);
    }
}