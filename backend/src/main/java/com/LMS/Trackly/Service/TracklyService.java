package com.LMS.Trackly.Service;

import com.LMS.Trackly.Entity.FollowUp;
import org.springframework.beans.factory.annotation.Autowired;

import com.LMS.Trackly.Entity.Lead;
import com.LMS.Trackly.Repository.TracklyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TracklyService {
    
    @Autowired
    TracklyRepository repo;

    public Lead addLead(Lead lead){
        return repo.save(lead);
    }

    public List<Lead> getLeads(){
        return repo.findAll();
    }

    public Lead updateAssignedTo(int leadId, String assignedTo) {
        Optional<Lead> optionalLead = repo.findById(leadId);
        if (optionalLead.isPresent()) {
            Lead lead = optionalLead.get();
            lead.setAssignedTo(assignedTo);
            return repo.save(lead);
        } else {
            throw new RuntimeException("Lead with ID " + leadId + " not found");
        }
    }

}
