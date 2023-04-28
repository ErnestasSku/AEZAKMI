package com.vu.aezakmi.repository;

import com.vu.aezakmi.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
