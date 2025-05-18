package com.LMS.Trackly.Repository;

import java.util.Date;
import java.util.List;

import com.LMS.Trackly.Entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<Lead, Integer> {

    // Find leads where assignedTo is null or empty (unassigned)
    List<Lead> findByAssignedToIsNullOrAssignedTo(String assignedTo);

    // Find by assignedTo (employee)
    List<Lead> findByAssignedTo(String assignedTo);

    // Find by source
    List<Lead> findBySource(String source);

    // Find by client
    List<Lead> findByClient(String client);

    // Find by status
    List<Lead> findByStatus(String status);

    // Find by email
    List<Lead> findByEmail(String email);

    // Find by contact number
    List<Lead> findByContact_number(String contactNumber);

    // Find leads between two dates
    List<Lead> findByDateBetween(Date start, Date end);
}
