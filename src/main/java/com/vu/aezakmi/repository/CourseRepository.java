package com.vu.aezakmi.repository;

import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByNameContainingIgnoreCase(String name);

    @Query("SELECT new com.vu.aezakmi.dto.CourseDTO(c.id, c.name, c.description, c.creator.id) FROM Course c")
    List<CourseDTO> findAllWithCreatorIds();

    @Query("SELECT new com.vu.aezakmi.dto.CourseDTO(c.id, c.name, c.description, c.creator.id) FROM Course c WHERE c.creator.id = :creatorId")
    List<CourseDTO> findAllByCreatorId(@Param("creatorId") Long creatorId);
}
