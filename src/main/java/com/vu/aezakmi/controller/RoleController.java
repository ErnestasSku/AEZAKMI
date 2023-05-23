package com.vu.aezakmi.controller;

import com.vu.aezakmi.model.RoleType;
import com.vu.aezakmi.model.User;
import com.vu.aezakmi.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping("/user/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateRole(@PathVariable Long id) {
        roleService.updateRole(id, RoleType.TEACHER);
    }

    @PostMapping("/role")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateRole(@RequestBody User user) {
        roleService.updateRole(user, RoleType.TEACHER);
    }
}
