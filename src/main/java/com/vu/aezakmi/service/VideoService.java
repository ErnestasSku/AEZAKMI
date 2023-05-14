package com.vu.aezakmi.service;

import com.vu.aezakmi.dto.VideoCreationDTO;
import com.vu.aezakmi.dto.VideoRetrievalDTO;
import com.vu.aezakmi.model.Image;
import com.vu.aezakmi.model.Video;
import com.vu.aezakmi.repository.CourseRepository;
import com.vu.aezakmi.repository.ImageRepository;
import com.vu.aezakmi.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private ServerPortService serverPortService;

    @Transactional
    public ResponseEntity<?> upload(VideoCreationDTO videoCreationDTO) throws IOException {
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

        // save video
        Video uploadedVideo = videoRepository.save(video);

        return new ResponseEntity<>("Video with ID " + uploadedVideo.getId() + " got created", HttpStatus.CREATED);
    }

    public List<VideoRetrievalDTO> getAllVideos() {
        List<VideoRetrievalDTO> videoRetrievalDTOs = new ArrayList<>();
        List<Video> videos = videoRepository.findAll();
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
        videoRetrievalDTO.setCourseId(video.getCourse() != null ? video.getCourse().getId() : null);
        videoRetrievalDTO.setImageUrl(video.getImage() != null ?
                ("http://localhost:" + serverPortService.getPort() + "/api/images/" + video.getImage().getId())
                : null);
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