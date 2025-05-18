package com.LMS.Trackly.Controller;

import com.LMS.Trackly.Entity.Lead;
import com.LMS.Trackly.Service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lead")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @PostMapping
    public ResponseEntity<Lead> createLead(@RequestBody Lead lead) {
        Lead createdLead = leadService.createLead(lead);
        return ResponseEntity.status(201).body(createdLead);
    }

    @PostMapping("/excel")
    public ResponseEntity<List<Lead>> createLeadFromExcel(@RequestBody List<Lead> leads) {
        List<Lead> createdLeads = leadService.createLeadsFromExcel(leads);
        return ResponseEntity.status(201).body(createdLeads);
    }

    @GetMapping
    public ResponseEntity<List<Lead>> getAllLeads() {
        List<Lead> leads = leadService.getAllLeads();
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Optional<Lead>> getLeadById(@PathVariable int id) {
        Optional<Lead> lead = leadService.getLeadById(id);
        if (lead == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(lead);
    }

    @GetMapping("/unassigned")
    public ResponseEntity<List<Lead>> getUnassignedLeads() {
        List<Lead> leads = leadService.getUnassignedLeads();
        if (leads.isEmpty()) {
            return ResponseEntity.ok().body(leads);
        }
        return ResponseEntity.ok(leads);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Optional<Lead>> updateLead(@PathVariable int id, @RequestBody Lead lead) {
        Optional<Lead> updatedLead = leadService.updateLead(id, lead);
        if (updatedLead == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedLead);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLead(@PathVariable int id) {
        boolean deleted = leadService.deleteLead(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body("Lead deleted");
    }

    // Filter endpoints

    @GetMapping("/emp/{empId}")
    public ResponseEntity<List<Lead>> getLeadsByEmpId(@PathVariable int empId) {
        List<Lead> leads = leadService.getLeadsByEmpId(empId);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/source/{source}")
    public ResponseEntity<List<Lead>> getLeadsBySource(@PathVariable String source) {
        List<Lead> leads = leadService.getLeadsBySource(source);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/client/{client}")
    public ResponseEntity<List<Lead>> getLeadsByClient(@PathVariable String client) {
        List<Lead> leads = leadService.getLeadsByClient(client);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Lead>> getLeadsByStatus(@PathVariable String status) {
        List<Lead> leads = leadService.getLeadsByStatus(status);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<Lead>> getLeadsByEmail(@PathVariable String email) {
        List<Lead> leads = leadService.getLeadsByEmail(email);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/contact/{contact}")
    public ResponseEntity<List<Lead>> getLeadsByContact(@PathVariable String contact) {
        List<Lead> leads = leadService.getLeadsByContact(contact);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Lead>> getLeadsByDateRange(@RequestParam Date start, @RequestParam Date end) {
        List<Lead> leads = leadService.getLeadsByDateRange(start, end);
        return ResponseEntity.ok(leads);
    }
}