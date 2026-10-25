package com.hookups.back.repository;

import com.hookups.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
// dispose des methodes comme save(user), findById(id), 
// findAll(), deleteById(id), existsById(id)
    boolean existsByEmail(String email);

}