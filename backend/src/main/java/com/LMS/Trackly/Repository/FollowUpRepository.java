package com.LMS.Trackly.Repository;

import com.LMS.Trackly.Entity.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface FollowUpRepository extends JpaRepository<FollowUp,Object> {
    List<FollowUp> findByLead_LeadId(Long leadId);
    List<FollowUp> findByNextFollowupDate(Date date);
    List<FollowUp> findByUsername(String username);
}
