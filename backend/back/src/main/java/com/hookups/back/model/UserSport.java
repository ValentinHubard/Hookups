package com.hookups.back.model;

import jakarta.persistence.*;

@Entity
@Table(
    name = "user_sports",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"user_id", "sport_id"}
    )
)
public class UserSport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sport_id", nullable = false)
    private Sport sport;

    // @Column(nullable = false)
    // private String level;

    public UserSport() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Sport getSport() {
        return sport;
    }

    // public String getLevel() {
    //     return level;
    // }

    public void setUser(User user) {
        this.user = user;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }

    // public void setLevel(String level) {
    //     this.level = level;
    // }
}