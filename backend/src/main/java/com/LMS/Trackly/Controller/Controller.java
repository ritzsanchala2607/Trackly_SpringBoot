package com.LMS.Trackly.Controller;

import com.LMS.Trackly.Entity.Cred;
import com.LMS.Trackly.Entity.FollowUp;
import com.LMS.Trackly.Entity.Lead;
import com.LMS.Trackly.Entity.Task;
import com.LMS.Trackly.Service.CredService;
import com.LMS.Trackly.Service.FollowUpService;
import com.LMS.Trackly.Service.TaskService;
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
    @Autowired
    private CredService credService;

    @Autowired
    private TaskService taskService;

    @PostMapping("/addLead")
    public Lead addStudent(@RequestBody Lead lead){
        return leadService.addLead(lead);
    }

    @GetMapping("/getLeads")
    public List<Lead> getLead(){
        return leadService.getLeads();
    }

    @PostMapping("/AssignLead")
    public Lead assignLead(@RequestBody Lead lead){
        return leadService.updateAssignedTo(lead.getLeadId(), lead.getAssignedTo());
    }

    @PostMapping("/addfollowup")
    public FollowUp addFollowUp(@RequestBody FollowUp followUp){
        return followService.addFollowUp(followUp);
    }

    @GetMapping("/followup/{id}")
    public Optional<FollowUp> getFollowUp(@PathVariable int id){
        return followService.getFollowUpById(id);
    }

    @PostMapping("/addCred")
    public Cred addCred(@RequestBody Cred cred){
        return credService.saveCredentials(cred);
    }
    @GetMapping("/getCred/{id}")
    public Optional<Cred> getCred(@PathVariable int id){
        return credService.getCredByUserName(id);
    }

    @PostMapping("/addTask")
    public Task addTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    @GetMapping("/by-assigned-to/{username}")
    public List<Task> getTasksByAssignedTo(@PathVariable String username) {
        return taskService.getTasksByAssignedTo(username);
    }

    @GetMapping("/getTask/{id}")
    public Optional<Task> getTask(@PathVariable int id){
        return taskService.getTask(id);
    }

}