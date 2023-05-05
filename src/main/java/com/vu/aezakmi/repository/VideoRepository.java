package com.vu.aezakmi.repository;

import com.vu.aezakmi.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
}
