package com.LMS.Trackly.Controller;

import com.LMS.Trackly.Entity.*;
import com.LMS.Trackly.Repository.DocsRepository;
import com.LMS.Trackly.Service.CredService;
import com.LMS.Trackly.Service.FollowUpService;
import com.LMS.Trackly.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.LMS.Trackly.Service.TracklyService;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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

    @GetMapping("/")
    public String Default(){
        return "Welcome to the Trackly Lead Management API!";
    }

    @Autowired
    private TaskService taskService;
    @Autowired
    private DocsRepository docsRepository;
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
        return credService.getCredById(id);
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

    private final String UPLOAD_DIR = "c:/docs/"; // Replace with your actual folder path

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDoc(
            @RequestParam("file") MultipartFile file,
            @RequestParam("leadId") Long leadId,
            @RequestParam("docDesc") String docDesc) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty.");
        }

        try {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) dir.mkdirs();

            String filePath = UPLOAD_DIR + file.getOriginalFilename();
            file.transferTo(new File(filePath));

            Docs doc = new Docs();
            doc.setLeadId(leadId);
            doc.setDocPath(filePath);
            doc.setDocName(file.getOriginalFilename());
            doc.setDocDesc(docDesc);

            docsRepository.save(doc);

            return ResponseEntity.ok("Document uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }
    }

    @GetMapping("/by-lead/{leadId}")
    public ResponseEntity<List<Docs>> getDocsByLeadId(@PathVariable Long leadId) {
        List<Docs> docs = docsRepository.findByLeadId(leadId);
        return ResponseEntity.ok(docs);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadFile(@PathVariable Long id) {
        return docsRepository.findById(id).map(doc -> {
            File file = new File(doc.getDocPath());
            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }
            FileSystemResource resource = new FileSystemResource(file);
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + doc.getDocName());
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(file.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        }).orElse(ResponseEntity.notFound().build());
    }
}