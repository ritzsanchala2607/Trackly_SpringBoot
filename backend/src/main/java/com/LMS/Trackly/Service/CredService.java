package com.LMS.Trackly.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.LMS.Trackly.Entity.Cred;
import com.LMS.Trackly.Repository.CredRepository;

@Service
public class CredService {
    @Autowired
    private CredRepository credrepo;

    public Cred saveCredentials(Cred cred){
        return credrepo.save(cred);
    }

    public Optional<Cred> getCredById(int id){
        return credrepo.findById(id);
    }
    public Optional<Cred> login(String email) {
        return credrepo.findByEmail(email);
    }

}
