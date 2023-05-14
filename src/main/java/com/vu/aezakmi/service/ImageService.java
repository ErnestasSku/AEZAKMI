package com.vu.aezakmi.service;

import com.vu.aezakmi.model.Image;
import com.vu.aezakmi.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ImageService {
    @Autowired
    ImageRepository imageRepository;

    public Image upload(Image image, MultipartFile file) throws IOException {
        image.setData(file.getBytes());
        return imageRepository.save(image);
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public byte[] getImageById(Long id) {
        Image image = imageRepository.findById(id).orElse(null);
        if (image != null) {
            return image.getData();
        }
        return null;
    }
}
