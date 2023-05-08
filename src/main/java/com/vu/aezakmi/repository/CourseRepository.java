package com.vu.aezakmi.repository;

import com.vu.aezakmi.dto.CourseDto;
import com.vu.aezakmi.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("SELECT new com.vu.aezakmi.dto.CourseDto(c.id, c.name, c.description, c.creator.id) FROM Course c")
    List<CourseDto> findAllWithCreatorIds();

    @Query("SELECT new com.vu.aezakmi.dto.CourseDto(c.id, c.name, c.description, c.creator.id) FROM Course c WHERE c.id = :courseId")
    Optional<CourseDto> findByIdWithCreatorId(@Param("courseId") Long courseId);
}
