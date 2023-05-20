package com.vu.aezakmi.repository;

import com.vu.aezakmi.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query("SELECT v FROM Video v WHERE v.course.id = :courseId")
    List<Video> findAllByCourseId(@Param("courseId") Long courseId);

    List<Video> findByTitleContainingIgnoreCase(String title);
}
