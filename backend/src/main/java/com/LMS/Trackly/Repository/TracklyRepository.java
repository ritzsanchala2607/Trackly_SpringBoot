package com.LMS.Trackly.Repository;

import com.LMS.Trackly.Entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TracklyRepository extends JpaRepository<Lead,Object>{

}