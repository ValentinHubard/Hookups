package com.hookups.back.controller;

import com.hookups.back.dto.UserRegistrationDTO;
import com.hookups.back.model.User;
import com.hookups.back.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Long> registerUser(
            @Valid @RequestBody UserRegistrationDTO dto) {

        User user = userService.registerUser(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(user.getId());
    }
}