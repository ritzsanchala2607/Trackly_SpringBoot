package com.LMS.Trackly.Service;

import com.LMS.Trackly.Entity.Task;
import com.LMS.Trackly.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepo;

    public Task saveTask(Task t){
        return taskRepo.save(t);
    }

    public Optional<Task> getTask(int id){
        return taskRepo.findById(id);
    }

    public List<Task> getTasksByAssignedTo(String username) {
        return taskRepo.findTasksByLeadAssignedTo(username);
    }
}
