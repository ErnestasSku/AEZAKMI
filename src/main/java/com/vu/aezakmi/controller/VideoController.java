package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.VideoCreationDTO;
import com.vu.aezakmi.dto.VideoRetrievalDTO;
import com.vu.aezakmi.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping
    public ResponseEntity<?> uploadVideo(
            @ModelAttribute VideoCreationDTO videoCreationDTO,
            @RequestHeader("Authorization") String authorizationHeader
    ) throws IOException {
        return videoService.upload(videoCreationDTO, authorizationHeader);
    }

    @GetMapping
    public List<VideoRetrievalDTO> getAllVideos(@RequestParam(required = false) String search) {
        return videoService.getAllVideos(search);
    }

    @GetMapping("{id}")
    public VideoRetrievalDTO getVideoById(@PathVariable Long id) {
        return videoService.getVideoDtoById(id);
    }


    @GetMapping(value = "{id}/data",
    produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public byte[] getVideoData(@PathVariable Long id) {
        return videoService.getVideoData(id);
    }

    @PatchMapping("{videoId}/course/{courseId}")
    public ResponseEntity<?> addVideoToCourse(@PathVariable Long videoId, @PathVariable Long courseId) {
        return videoService.addVideoToCourse(videoId, courseId);
    }
}
