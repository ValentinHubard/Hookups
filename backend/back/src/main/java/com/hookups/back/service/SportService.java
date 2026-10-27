package com.hookups.back.service;

import com.hookups.back.model.Sport;
import com.hookups.back.repository.SportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportService {

    private final SportRepository sportRepository;

    public SportService(SportRepository sportRepository) {
        this.sportRepository = sportRepository;
    }

    public List<Sport> getAllSports() {
        return sportRepository.findAll();
    }
}