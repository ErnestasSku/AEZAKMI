package com.vu.aezakmi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

//import java.util.Set;

@Entity
@Getter @Setter
public class UserType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "userType")
    private List<User> users;

//    TODO: This should also have permissions. Either a class or an enum

    public UserType() {
    }

    public UserType(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return "UserType{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

}
