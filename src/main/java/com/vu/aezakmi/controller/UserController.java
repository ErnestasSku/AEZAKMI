package com.vu.aezakmi.controller;

import com.vu.aezakmi.dto.CourseDTO;
import com.vu.aezakmi.dto.UserSignupDTO;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.service.CourseService;
import com.vu.aezakmi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    @PostMapping
    public void saveUser(@RequestBody User user) {
        userService.save(user);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public List<UserSignupDTO> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("{creatorId}/courses")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public List<CourseDTO> getCoursesByCreatorId(@PathVariable Long creatorId) {
        return courseService.getAllCoursesByCreatorId(creatorId);
    }
}
