package com.vu.aezakmi.repository;

import com.vu.aezakmi.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
