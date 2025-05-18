package com.LMS.Trackly.Controller;

import com.LMS.Trackly.Entity.Cred;
import com.LMS.Trackly.Service.CredService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class CredController {

    @Autowired
    private CredService credService;

    /**
     * Registers a new user and sends verification email.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Cred user) {
        try {
            Cred savedUser = credService.registerUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Verifies a user with a token.
     */
    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam("token") String token) {
        boolean result = credService.verifyUser(token);
        if (result) {
            return ResponseEntity.ok("Email verified successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
    }

    /**
     * Authenticates a user with email and password.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password) {
        try {
            Cred user = credService.login(email, password);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Initiates password reset process by sending email.
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> initiateReset(@RequestParam String email) {
        try {
            credService.initiatePasswordReset(email);
            return ResponseEntity.ok("Password reset email sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Verifies reset token validity.
     */
    @GetMapping("/reset-password")
    public ResponseEntity<?> verifyResetToken(@RequestParam String token) {
        boolean valid = credService.verifyResetToken(token);
        if (valid) {
            return ResponseEntity.ok("Token is valid");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
    }

    /**
     * Resets password using a valid token.
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        try {
            credService.resetPassword(token, newPassword);
            return ResponseEntity.ok("Password reset successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Updates user profile info.
     */
    @PutMapping("/update-user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody Cred updatedData) {
        try {
            credService.updateUserProfile(id, updatedData);
            return ResponseEntity.ok("User updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Deletes user by ID.
     */
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        try {
            credService.deleteUserById(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
