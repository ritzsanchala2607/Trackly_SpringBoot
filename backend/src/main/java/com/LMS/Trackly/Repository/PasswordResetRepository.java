package com.LMS.Trackly.Repository;

import com.LMS.Trackly.Entity.PasswordReset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetRepository extends JpaRepository<PasswordReset,Object> {
    <PasswordToken> Optional<PasswordToken> findByToken(String token);
}
