package com.LMS.Trackly.Entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taskId")
    private int taskId;

    @ManyToOne
    @JoinColumn(name="followup_id", nullable = false)
    private FollowUp followUp;

    @Column(name = "deadLine")
    private Date deadline;

    @Column(name="description")
    private String description;

    public Task(){

    }
    public Task(int taskId, FollowUp followUp, Date deadline, String description) {
        this.taskId = taskId;
        this.followUp = followUp;
        this.deadline = deadline;
        this.description = description;
    }

    public int getTaskId() {
        return taskId;
    }

    public void setTaskId(int taskId) {
        this.taskId = taskId;
    }

    public FollowUp getFollowUp() {
        return followUp;
    }

    public void setFollowUp(FollowUp followUp) {
        this.followUp = followUp;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
