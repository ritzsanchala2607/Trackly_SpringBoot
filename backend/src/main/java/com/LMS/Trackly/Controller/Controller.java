package com.LMS.Trackly.Controller;

import com.LMS.Trackly.Entity.FollowUp;
import com.LMS.Trackly.Entity.Lead;
import com.LMS.Trackly.Service.FollowUpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.LMS.Trackly.Service.TracklyService;

import java.util.List;
import java.util.Optional;

@RestController
public class Controller {

    @Autowired
    TracklyService leadService;
    @Autowired
    FollowUpService followService;

    @PostMapping("/addLead")
    public Lead addStudent(@RequestBody Lead lead){
        return leadService.addLead(lead);
    }

    @GetMapping("/getLeads")
    public List<Lead> getLead(){
        return leadService.getLeads();
    }

    @PostMapping("/addfollowup")
    public FollowUp addFollowUp(@RequestBody FollowUp followUp){
        return followService.addFollowUp(followUp);
    }

    @GetMapping("/followup/{id}")
    public Optional<FollowUp> getFollowUp(@PathVariable int id){
        return followService.getFollowUpById(id);
    }
}