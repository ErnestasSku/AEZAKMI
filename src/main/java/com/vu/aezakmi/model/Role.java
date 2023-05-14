package com.vu.aezakmi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

//import java.util.Set;

@Entity
@Getter @Setter
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleType type;

    @JsonIgnore
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

    @Override
    public String getAuthority() {
        return type.toString();
    }
}

