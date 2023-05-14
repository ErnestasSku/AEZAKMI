package com.vu.aezakmi.service;

import com.vu.aezakmi.model.Video;
import com.vu.aezakmi.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class VideoService {
    @Autowired
    VideoRepository videoRepository;

    public Video upload(Video video, MultipartFile file) throws IOException {
        video.setData(file.getBytes());
        return videoRepository.save(video);
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public Optional<Video> getVideoById(Long id) {
        return videoRepository.findById(id);
    }

    public void updateVideo(Video video) {
        videoRepository.save(video);
    }
}