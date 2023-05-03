package com.vu.aezakmi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

//import java.util.Set;

@Entity
@Getter @Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleType type;

    @OneToMany(mappedBy = "role")
    private List<User> users;

//    TODO: This should also have permissions. Either a class or an enum

    public Role() {
    }


    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", type='" + type.toString() + '\'' +
                '}';
    }

}

