package com.vu.aezakmi.repository;

import com.vu.aezakmi.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Collection;
import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long>, JpaSpecificationExecutor<Video> {
    List<Video> findByIdIn(Collection<Long> videoIds);
}
