//package com.LMS.Trackly.Service;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.LMS.Trackly.Entity.Cred;
//import com.LMS.Trackly.Repository.CredRepository;
//
//@Service
//public class CredService {
//    @Autowired
//    private CredRepository credrepo;
//
//    public Cred saveCredentials(Cred cred){
//        return credrepo.save(cred);
//    }
//
//    public Optional<Cred> getCredById(int id){
//        return credrepo.findById(id);
//    }
//    public Optional<Cred> login(String email) {
//        return credrepo.findByEmail(email);
//    }
//
//}

package com.LMS.Trackly.Service;

import com.LMS.Trackly.Entity.Cred;
import com.LMS.Trackly.Entity.PasswordReset;
import com.LMS.Trackly.Repository.CredRepository;
import com.LMS.Trackly.Repository.PasswordResetRepository;
import com.LMS.Trackly.Helper.MailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class CredService {

    @Autowired
    private CredRepository credRepository;

    @Autowired
    private PasswordResetRepository passwordResetTokenRepository;

    @Autowired
    private MailService mailService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * Registers a new user and sends a verification email.
     */
    public Cred registerUser(Cred user) {
        Optional<Cred> existingUser = credRepository.findByEmail(user.getEmail().toLowerCase());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        String token = UUID.randomUUID().toString();

        user.setPassword(hashedPassword);
        user.setToken(token);
        user.setVerified(false);
        user.setEmail(user.getEmail().toLowerCase());

        Cred savedUser = credRepository.save(user);

        String subject = "Email Verification - Trackly LMS";
        String content = "<p>Hello " + user.getUsername() + ",</p>"
                + "<p>Please verify your email address by clicking the link below:</p>"
                + "<a href=\"http://localhost:8080/api/verify?token=" + token + "\">Verify Email</a>";

        mailService.sendMail(user.getEmail(), subject, content);

        return savedUser;
    }

    /**
     * Verifies a user's email using the provided token.
     */
    public boolean verifyUser(String token) {
        Optional<Cred> userOptional = credRepository.findByToken(token);
        if (userOptional.isPresent()) {
            Cred user = userOptional.get();
            user.setVerified(true);
            user.setToken(null);
            credRepository.save(user);
            return true;
        }
        return false;
    }

    /**
     * Authenticates a user with email and password.
     */
    public Cred login(String email, String rawPassword) {
        Optional<Cred> userOptional = credRepository.findByEmail(email.toLowerCase());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        Cred user = userOptional.get();

        if (!user.isVerified()) {
            throw new RuntimeException("Email not verified");
        }

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        user.setLastLogin(LocalDateTime.now());
        credRepository.save(user);

        return user;
    }

    /**
     * Initiates the password reset process by sending a reset email.
     */
    public void initiatePasswordReset(String email) {
        Optional<Cred> userOptional = credRepository.findByEmail(email.toLowerCase());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Email not found");
        }

        Cred user = userOptional.get();

        String token = UUID.randomUUID().toString();
        PasswordReset resetToken = new PasswordReset();
        resetToken.setEmail(email.toLowerCase());
        resetToken.setToken(token);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));

        passwordResetTokenRepository.save(resetToken);

        String subject = "Password Reset Request - Trackly LMS";
        String content = "<p>Hello " + user.getUsername() + ",</p>"
                + "<p>You have requested to reset your password. Click the link below to reset it:</p>"
                + "<a href=\"http://localhost:8080/api/reset-password?token=" + token + "\">Reset Password</a>";

        mailService.sendMail(email, subject, content);
    }

    /**
     * Verifies the password reset token.
     */
    public <PasswordToken> boolean verifyResetToken(String token) {
        Optional<PasswordToken> tokenOptional = passwordResetTokenRepository.findByToken(token);
        if (tokenOptional.isPresent()) {
            PasswordReset resetToken = (PasswordReset) tokenOptional.get();
            return resetToken.getExpiryDate().isAfter(Instant.from(LocalDateTime.now()));
        }
        return false;
    }

    /**
     * Resets the user's password using the provided token.
     */
    public void resetPassword(String token, String newPassword) {
        Optional<PasswordReset> tokenOptional = passwordResetTokenRepository.findByToken(token);
        if (tokenOptional.isEmpty()) {
            throw new RuntimeException("Invalid or expired token");
        }

        PasswordReset resetToken = tokenOptional.get();
        Optional<Cred> userOptional = credRepository.findByEmail(resetToken.getEmail());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Cred user = userOptional.get();
        String hashedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(hashedPassword);
        credRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);
    }

    /**
     * Updates the user's profile information.
     */
    public void updateUserProfile(int id, Cred updatedData) {
        Optional<Cred> userOptional = credRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Cred user = userOptional.get();
        user.setUsername(updatedData.getUsername());
        user.setPhoneNumber(updatedData.getPhoneNumber());
        user.setDistrict(updatedData.getDistrict());
        // Update other fields as necessary

        credRepository.save(user);
    }

    /**
     * Deletes a user by their ID.
     */
    public void deleteUserById(int id) {
        if (!credRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        credRepository.deleteById(id);
    }

    public Cred saveCredentials(Cred cred) {
        return credRepository.save(cred);
    }

    public Optional<Cred> getCredById(int id) {
        return credRepository.findById(id);
    }

}
