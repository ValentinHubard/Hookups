package com.hookups.back.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;


    private String firstName;
    private String lastName;
    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToMany(
        mappedBy = "user",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private Set<UserSport> userSports = new HashSet<>();

    private String address; // à changer
    private String profilePictureUrl;

    @Column(length = 1000)
    private String description;

    private String phoneNumber;

    public User(){}

}