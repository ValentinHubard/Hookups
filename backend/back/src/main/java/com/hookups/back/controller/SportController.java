package com.hookups.back.controller;

import com.hookups.back.model.Sport;
import com.hookups.back.service.SportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sports")
public class SportController {

    private final SportService sportService;

    public SportController(SportService sportService) {
        this.sportService = sportService;
    }

    @GetMapping
    public List<Sport> getAllSports() {
        return sportService.getAllSports();
    }
}