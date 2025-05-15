package com.LMS.Trackly.Service;

import com.LMS.Trackly.Entity.Cred;
import com.LMS.Trackly.Entity.FollowUp;
import com.LMS.Trackly.Repository.CredRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CredService {
    @Autowired
    private CredRepository credrepo;

    public Cred saveCredentials(Cred cred){
        return credrepo.save(cred);
    }

    public Optional<Cred> getCredByUserName(int id){
        return credrepo.findById(id);
    }
}
