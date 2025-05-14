package com.LMS.Trackly.Controller;

import com.LMS.Trackly.Entity.Lead;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.LMS.Trackly.Service.TracklyService;

import java.util.List;

@RestController
public class Controller {

    @Autowired
    TracklyService service;

    @PostMapping("/addLead")
    public Lead addStudent(@RequestBody Lead lead){
        return service.addLead(lead);
    }

    @GetMapping("/getLeads")
    public List<Lead> getLead(){
        return service.getLeads();
    }

}