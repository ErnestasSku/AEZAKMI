package com.vu.aezakmi.repository;

import com.vu.aezakmi.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByNameContainingIgnoreCase(String name);

    @Query("SELECT new com.vu.aezakmi.dto.CourseDTO(c.id, c.name, c.description, c.creator.id) FROM Course c")
    List<CourseDTO> findAllWithCreatorIds();

    @Query("SELECT new com.vu.aezakmi.dto.CourseDTO(c.id, c.name, c.description, c.creator.id) FROM Course c WHERE c.creator.id = :creatorId")
    List<CourseDTO> findAllByCreatorId(@Param("creatorId") Long creatorId);

    @Query("SELECT new com.vu.aezakmi.dto.CourseDTO(c.id, c.name, c.description, c.creator.id) FROM Course c WHERE c.id = :courseId")
    Optional<CourseDTO> findByIdWithCreatorId(@Param("courseId") Long courseId);
}
