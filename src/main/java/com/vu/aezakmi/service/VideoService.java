package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.dto.CreatorDTO;
import com.vu.aezakmi.dto.VideoCreationDTO;
import com.vu.aezakmi.dto.VideoRetrievalDTO;
import com.vu.aezakmi.model.Course;
import com.vu.aezakmi.model.Image;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.model.Video;
import com.vu.aezakmi.repository.CourseRepository;
import com.vu.aezakmi.repository.ImageRepository;
import com.vu.aezakmi.repository.UserRepository;
import com.vu.aezakmi.repository.VideoRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VideoService {
    @Autowired
    VideoRepository videoRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServerPortService serverPortService;

    @Autowired
    private TokenService tokenService;

    @Transactional
    public ResponseEntity<?> upload(VideoCreationDTO videoCreationDTO, String authorizationHeader) throws IOException {
        // validation
        if (videoCreationDTO.getVideo() == null) {
            return new ResponseEntity<>("Video should be uploaded!", HttpStatus.BAD_REQUEST);
        }
        if (videoCreationDTO.getImage() == null) {
            return new ResponseEntity<>("Image should be uploaded!", HttpStatus.BAD_REQUEST);
        }

        // save image
        Image image = new Image();
        image.setData(videoCreationDTO.getImage().getBytes());
        Image uploadedImage = imageRepository.save(image);

        // create video
        Video video = new Video();
        video.setTitle(videoCreationDTO.getTitle());
        video.setDescription(videoCreationDTO.getDescription());
        video.setImage(uploadedImage);
        video.setData(videoCreationDTO.getVideo().getBytes());
        if (videoCreationDTO.getCourseId() != null) {
            courseRepository.findById(videoCreationDTO.getCourseId()).ifPresent(video::setCourse);
        }

        // get user
        String token = authorizationHeader.substring("Bearer ".length());
        String username = tokenService.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not" +
                " found"));
        video.setUser(user);

        // save video
        Video uploadedVideo = videoRepository.save(video);

        return new ResponseEntity<>("Video with ID " + uploadedVideo.getId() + " got created", HttpStatus.CREATED);
    }

    public List<VideoRetrievalDTO> getAllVideos(Long courseId, Long creatorId, String search) {
        Specification<Video> specification = (Root<Video> root, CriteriaQuery<?> query,
                                              CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (courseId != null) {
                predicates.add(criteriaBuilder.equal(root.get("course").get("id"), courseId));
            }
            if (creatorId != null) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("id"), creatorId));
            }
            if (search != null) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("title")),
                        "%" + search.toLowerCase() + "%"));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        List<VideoRetrievalDTO> videoRetrievalDTOs = new ArrayList<>();
        List<Video> videos = videoRepository.findAll(specification);
        for (Video video : videos) {
            VideoRetrievalDTO videoRetrievalDTO = setVideoDTO(video);
            videoRetrievalDTOs.add(videoRetrievalDTO);
        }

        return videoRetrievalDTOs;
    }

    private VideoRetrievalDTO setVideoDTO(Video video) {
        VideoRetrievalDTO videoRetrievalDTO = new VideoRetrievalDTO();
        videoRetrievalDTO.setId(video.getId() != null ? video.getId() : null);
        videoRetrievalDTO.setTitle(video.getTitle() != null ? video.getTitle() : null);
        videoRetrievalDTO.setDescription(video.getDescription() != null ? video.getDescription() : null);
        videoRetrievalDTO.setCourse(video.getCourse() != null ? new CourseDTO(video.getCourse()) : null);
        videoRetrievalDTO.setImageUrl(video.getImage() != null ?
                ("http://localhost:" + serverPortService.getPort() + "/api/images/" + video.getImage().getId()) : null);

        if (video.getUser() != null) {
            CreatorDTO creatorDTO = new CreatorDTO();
            creatorDTO.setId(video.getUser().getId());
            creatorDTO.setUsername(video.getUser().getUsername());
            videoRetrievalDTO.setCreator(creatorDTO);
        }
        return videoRetrievalDTO;
    }

    public Optional<Video> getVideoById(Long id) {
        return videoRepository.findById(id);
    }

    public VideoRetrievalDTO getVideoDtoById(Long id) {
        Video video = videoRepository.findById(id).orElse(null);
        if (video != null) {
            return setVideoDTO(video);
        }

        return null;
    }

    public ResponseEntity<?> addVideoToCourse(Long videoId, Long courseId) {
        Video video = videoRepository.findById(videoId).orElse(null);
        if (video == null) {
            return new ResponseEntity<>("Video with specified Id does not exist", HttpStatus.BAD_REQUEST);
        }
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            return new ResponseEntity<>("Course with specified Id does not exist", HttpStatus.BAD_REQUEST);
        }

        video.setCourse(course);
        videoRepository.save(video);
        return new ResponseEntity<>("Video (id: " + video.getId() + ") was added to course (id: " + course.getId() +
                ")", HttpStatus.OK);
    }

    public ResponseEntity<?> removeCourseFromVideo(Long videoId) {
        Video video = videoRepository.findById(videoId).orElse(null);
        if (video == null) {
            return new ResponseEntity<>("Video with specified Id does not exist", HttpStatus.BAD_REQUEST);
        }
        video.setCourse(null);
        videoRepository.save(video);
        return new ResponseEntity<>("Course was removed from Video (id: " + video.getId() + ")", HttpStatus.OK);
    }

    public byte[] getVideoData(Long id) {
        Video video = videoRepository.findById(id).orElse(null);
        if (video != null) {
            return video.getData();
        }
        return null;
    }

    public void updateVideo(Video video) {
        videoRepository.save(video);
    }
}