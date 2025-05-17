package com.LMS.Trackly.Repository;

import com.LMS.Trackly.Entity.Docs;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocsRepository extends JpaRepository<Docs, Long> {
    List<Docs> findByLeadId(Long leadId);
}