package com.LMS.Trackly.Repository;

import com.LMS.Trackly.Entity.Cred;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CredRepository extends JpaRepository<Cred,Object> {
    Optional<Cred> findByEmail(String email);

    Optional<Cred> findByToken(String token);
}
