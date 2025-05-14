package com.LMS.Trackly.Service;

import com.LMS.Trackly.Entity.FollowUp;
import com.LMS.Trackly.Repository.FollowUpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FollowUpService {

    @Autowired
    FollowUpRepository repo;
    public FollowUp addFollowUp(FollowUp followup){
        return repo.save(followup);
    }

    public Optional<FollowUp> getFollowUpById(int id){
        return repo.findById(id);
    }
}
