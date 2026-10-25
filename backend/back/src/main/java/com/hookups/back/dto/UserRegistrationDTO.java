package com.hookups.back.dto;

import java.time.LocalDate;
import java.util.Set;

import com.hookups.back.model.Gender;

import jakarta.validation.constraints.*;

public class UserRegistrationDTO {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 100)
    private String password;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotNull
    @Past
    private LocalDate birthday;

    @NotNull
    private Gender gender;

    @NotEmpty
    private Set<Long> sportIds;

    private String address;
    private String profilePictureUrl;

    @Size(max = 1000)
    private String description;

    private String phoneNumber;

    public UserRegistrationDTO() {
    }

    // Générer les getters et setters
}