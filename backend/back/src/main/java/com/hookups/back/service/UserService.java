package com.hookups.back.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hookups.back.dto.UserRegistrationDTO;
import com.hookups.back.model.Sport;
import com.hookups.back.model.User;
import com.hookups.back.model.UserSport;
import com.hookups.back.repository.SportRepository;
import com.hookups.back.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final SportRepository sportRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            SportRepository sportRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.sportRepository = sportRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerUser(UserRegistrationDTO dto) {

        // Vérifier que l'adresse email n'est pas déjà utilisée
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException(
                "Cette adresse email est déjà utilisée."
            );
        }

        // Créer l'utilisateur
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setBirthday(dto.getBirthday());
        user.setGender(dto.getGender());
        user.setAddress(dto.getAddress());
        user.setProfilePictureUrl(dto.getProfilePictureUrl());
        user.setDescription(dto.getDescription());
        user.setPhoneNumber(dto.getPhoneNumber());

        // Associer les sports sélectionnés
        Set<UserSport> userSports = new HashSet<>();

        for (Long sportId : dto.getSportIds()) {

            Sport sport = sportRepository.findById(sportId)
                .orElseThrow(() -> new IllegalArgumentException(
                    "Sport introuvable : " + sportId
                ));

            UserSport userSport = new UserSport();
            userSport.setUser(user);
            userSport.setSport(sport);

            userSports.add(userSport);
        }

        user.setUserSports(userSports);

        // Enregistrer l'utilisateur et ses associations
        return userRepository.save(user);
    }
}