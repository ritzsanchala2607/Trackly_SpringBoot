package com.LMS.Trackly.Entity;

import java.util.Date;

import jakarta.persistence.*;

@Entity
public class Lead {
    public Lead() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lead_id")
    private int leadId;

    @Column(name = "emp_name", nullable = false, length = 100)
    private String emp_name;

    @Column(name = "source", nullable = false, length = 100)
    private String source;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "client", nullable = false, length = 100)
    private String client;

    @Column(name = "district", nullable = false, length = 100)
    private String district;

    @Column(name = "contact_number", nullable = false, length = 15)
    private String contact_number;

    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Column(name = "status", nullable = false, length = 50)
    private String status;

    public Lead(int leadId, String emp_name, String source, Date date, String client, String district, String contact_number, String email, String status) {
        this.leadId = leadId;
        this.emp_name = emp_name;
        this.source = source;
        this.date = date;
        this.client = client;
        this.district = district;
        this.contact_number = contact_number;
        this.email = email;
        this.status = status;
    }

    public int getLeadId() {
        return leadId;
    }

    public void setLeadId(int leadId) {
        this.leadId = leadId;
    }

    public String getEmp_name() {
        return emp_name;
    }

    public void setEmp_name(String emp_name) {
        this.emp_name = emp_name;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getContact_number() {
        return contact_number;
    }

    public void setContact_number(String contact_number) {
        this.contact_number = contact_number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}