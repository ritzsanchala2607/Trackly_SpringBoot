package com.LMS.Trackly.Controller;

import com.LMS.Trackly.Entity.FollowUp;
import com.LMS.Trackly.Service.FollowUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/followup")
@CrossOrigin(origins = "*")
public class FollowUpController {

    @Autowired
    private FollowUpService followUpService;

    // Create a new follow-up
    @PostMapping
    public ResponseEntity<FollowUp> createFollowUp(@RequestBody FollowUp followUp) {
        FollowUp created = followUpService.createFollowUp(followUp);
        return ResponseEntity.status(201).body(created);
    }

    // Get all follow-ups
    @GetMapping
    public ResponseEntity<List<FollowUp>> getAllFollowUps() {
        return ResponseEntity.ok(followUpService.getAllFollowUps());
    }

    // Get follow-up by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getFollowUpById(@PathVariable int id) {
        Optional<FollowUp> followUp = followUpService.getFollowUpById(id);
        if (followUp.isPresent()) {
            return ResponseEntity.ok(followUp.get());
        } else {
            return ResponseEntity.status(404).body("Follow-up not found");
        }
    }

    // Update a follow-up
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFollowUp(@PathVariable Long id, @RequestBody FollowUp updatedFollowUp) {
        FollowUp updated = followUpService.updateFollowUp(id, updatedFollowUp);
        if (updated == null) {
            return ResponseEntity.status(404).body("Follow-up not found");
        }
        return ResponseEntity.ok(updated);
    }

    // Delete a follow-up
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFollowUp(@PathVariable Long id) {
        boolean deleted = followUpService.deleteFollowUp(id);
        if (!deleted) {
            return ResponseEntity.status(404).body("Follow-up not found");
        }
        return ResponseEntity.ok("Follow-up deleted successfully");
    }

    // Get follow-ups by Lead ID
    @GetMapping("/lead/{leadId}")
    public ResponseEntity<List<FollowUp>> getFollowUpsByLeadId(@PathVariable Long leadId) {
        return ResponseEntity.ok(followUpService.getFollowUpsByLeadId(leadId));
    }

    // Get follow-ups by next follow-up date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<FollowUp>> getFollowUpsByNextFollowupDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return ResponseEntity.ok(followUpService.getFollowUpsByNextFollowupDate(date));
    }

    // Get follow-ups by username
    @GetMapping("/user/{username}")
    public ResponseEntity<List<FollowUp>> getFollowUpsByUsername(@PathVariable String username) {
        return ResponseEntity.ok(followUpService.getFollowUpsByUsername(username));
    }
}
