package com.LMS.Trackly.Entity;

import jakarta.persistence.*;

@Entity
public class Docs {
    public Docs(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lead_id")
    private Long leadId;

    @Column(name = "doc_path")
    private String docPath;

    @Column(name = "doc_name")
    private String docName;

    @Column(name = "doc_desc")
    private String docDesc;

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public Long getLeadId() { return leadId; }

    public void setLeadId(Long leadId) { this.leadId = leadId; }

    public String getDocPath() { return docPath; }

    public void setDocPath(String docPath) { this.docPath = docPath; }

    public String getDocName() { return docName; }

    public void setDocName(String docName) { this.docName = docName; }

    public String getDocDesc() { return docDesc; }

    public void setDocDesc(String docDesc) { this.docDesc = docDesc; }
}