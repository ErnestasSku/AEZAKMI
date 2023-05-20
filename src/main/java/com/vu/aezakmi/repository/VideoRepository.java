package com.vu.aezakmi.repository;

import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, Long> {
    @Query("SELECT v FROM Video v WHERE v.course.id = :courseId")
    List<Video> findAllByCourseId(@Param("courseId") Long courseId);

//    @Query("SELECT v FROM Video v WHERE v. = :creatorId")
//    List<Video> findByCreatorId(@Param("creatorId") Long creatorId);
}
