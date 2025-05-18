// DocumentService.java
package com.LMS.Trackly.Service;

import com.LMS.Trackly.Entity.Docs;
import com.LMS.Trackly.Entity.Task;
import com.LMS.Trackly.Repository.DocsRepository;
import com.LMS.Trackly.Repository.TaskRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.Document;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DocumentService {

    @Autowired
    private DocsRepository docsRepository;

    @Autowired
    private TaskRepository taskRepository;

    private final String uploadDir = "public/documents/";

    public List<Docs> getAllDocuments() {
        return docsRepository.findAll();
    }

    public Optional<Docs> getDocumentById(Long id) {
        return docsRepository.findById(id);
    }

    public Resource downloadDocument(Long id) throws MalformedURLException {
        Docs document = docsRepository.findById(id).orElse(null);
        if (document == null) return null;

        Path filePath = Paths.get("public/documents").resolve(document.getDocPath()).normalize();
        UrlResource resource = new UrlResource(filePath.toUri());

        if (resource.exists()) {
            return (Resource) resource;
        } else {
            return null;
        }
    }

    public Docs createDocument(Docs doc, MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String filePath = uploadDir + fileName;

        Files.createDirectories(Paths.get(uploadDir));
        file.transferTo(new File(filePath));

        doc.setDocPath("documents/" + fileName);
        return docsRepository.save(doc);
    }

    public Docs updateDocument(Long id, Docs updatedDoc, MultipartFile file) throws IOException {
        return docsRepository.findById(id).map(doc -> {
            try {
                if (file != null) {
                    File oldFile = new File("public/" + doc.getDocPath());
                    if (oldFile.exists()) oldFile.delete();

                    String newFileName = file.getOriginalFilename();
                    String newPath = uploadDir + newFileName;
                    Files.createDirectories(Paths.get(uploadDir));
                    file.transferTo(new File(newPath));

                    doc.setDocPath("documents/" + newFileName);
                }

                doc.setDocName(updatedDoc.getDocName());
                doc.setDocDesc(updatedDoc.getDocDesc());
                doc.setLeadId(updatedDoc.getLeadId());

                return docsRepository.save(doc);
            } catch (IOException e) {
                throw new RuntimeException("Error updating document", e);
            }
        }).orElse(null);
    }

    public String deleteDocument(Long id) {
        Optional<Docs> optionalDoc = docsRepository.findById(id);
        if (optionalDoc.isEmpty()) return "Document not found";

        Docs doc = optionalDoc.get();
        File file = new File("public/" + doc.getDocPath());
        if (file.exists()) file.delete();

        docsRepository.deleteById(id);
        return "Deleted successfully";
    }

    public List<Docs> getByLeadId(Long leadId) {
        return docsRepository.findByLeadId(leadId);
    }

    public List<Docs> getByFollowupId(Long followupId) {
        List<Task> tasks = taskRepository.findByFollowUpFollowUpId(followupId);
        List<Docs> allDocs = new ArrayList<>();
        for (Task task : tasks) {
            allDocs.addAll(task.getDocuments()); // assumes a OneToMany or ManyToMany mapping exists
        }
        return allDocs;
    }

    public List<Docs> searchByFileNameInLead(Long leadId, String fileName) {
        List<Docs> results = docsRepository.findByLeadIdAndDocNameContainingIgnoreCase(leadId, fileName);
        return results.isEmpty() ? new ArrayList<>() : results;
    }

}