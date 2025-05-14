package com.LMS.Trackly.Entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "follow_up")
public class FollowUp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "followup_id")
    private Long followUpId;

    @ManyToOne
    @JoinColumn(name = "lead_id", nullable = false)
    private Lead lead;

    @Column(name = "followup_count")
    private Integer followupCount;

    @Column(name = "conclusion", length = 500)
    private String conclusion;

    @Column(name = "next_followup_date")
    @Temporal(TemporalType.DATE)
    private Date nextFollowupDate;

    @Column(name = "username")
    private String username;

    // Constructors
    public FollowUp() {}

    public FollowUp(Lead lead, Integer followupCount, String conclusion, Date nextFollowupDate, String username) {
        this.lead = lead;
        this.followupCount = followupCount;
        this.conclusion = conclusion;
        this.nextFollowupDate = nextFollowupDate;
        this.username = username;
    }

    // Getters and Setters

    public Long getFollowUpId() {
        return followUpId;
    }

    public void setFollowUpId(Long followUpId) {
        this.followUpId = followUpId;
    }

    public Lead getLead() {
        return lead;
    }

    public void setLead(Lead lead) {
        this.lead = lead;
    }

    public Integer getFollowupCount() {
        return followupCount;
    }

    public void setFollowupCount(Integer followupCount) {
        this.followupCount = followupCount;
    }

    public String getConclusion() {
        return conclusion;
    }

    public void setConclusion(String conclusion) {
        this.conclusion = conclusion;
    }

    public Date getNextFollowupDate() {
        return nextFollowupDate;
    }

    public void setNextFollowupDate(Date nextFollowupDate) {
        this.nextFollowupDate = nextFollowupDate;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
