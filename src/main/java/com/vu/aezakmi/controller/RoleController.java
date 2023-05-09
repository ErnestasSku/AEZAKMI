package com.vu.aezakmi.controller;

import com.vu.aezakmi.model.Role;
import com.vu.aezakmi.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public void createRole(@RequestBody Role role) {
        roleService.create(role);
    }

    @GetMapping
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("{id}")
    public Role getRoleById(@PathVariable Long id) {
        return roleService.getRoleById(id).orElse(null);
    }
}
