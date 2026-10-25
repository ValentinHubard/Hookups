package com.hookups.back.repository;

import com.hookups.back.model.Sport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SportRepository extends JpaRepository<Sport, Long> {

    Optional<Sport> findByName(String name);

    boolean existsByName(String name);
}