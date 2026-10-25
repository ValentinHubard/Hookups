package com.hookups.back.repository;

import com.hookups.back.model.UserSport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSportRepository
        extends JpaRepository<UserSport, Long> {

    //recupere tous les sport associé a un utilisateur
    List<UserSport> findByUserId(Long userId);

    //verifie si un utilisateur possède deja une association avec un sport
    boolean existsByUserIdAndSportId(Long userId, Long sportId);
}