//package com.LMS.Trackly.Service;
//
//import com.LMS.Trackly.Entity.Task;
//import com.LMS.Trackly.Repository.TaskRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.PathVariable;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class TaskService {
//    @Autowired
//    private TaskRepository taskRepo;
//
//    public Task saveTask(Task t){
//        return taskRepo.save(t);
//    }
//
//    public Optional<Task> getTask(int id){
//        return taskRepo.findById(id);
//    }
//
//    public List<Task> getTasksByAssignedTo(String username) {
//        return taskRepo.findTasksByLeadAssignedTo(username);
//    }
//}

package com.LMS.Trackly.Service;

import com.LMS.Trackly.Entity.Task;
import com.LMS.Trackly.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get task by ID
    public Optional<Task> getTaskById(int id) {
        return taskRepository.findById(id);
    }

    // Get tasks by followup ID
    public List<Task> getTasksByFollowupId(int followupId) {
        return taskRepository.findByFollowUp_FollowupId(followupId);
    }

    // Get tasks by deadline range
    public List<Task> getTasksByDeadlineRange(Date startDate, Date endDate) {
        return taskRepository.findByDeadlineBetween((java.sql.Date) startDate, (java.sql.Date) endDate);
    }

    // Create new task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    // Update task
    public Task updateTask(int id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found for id :: " + id));

        // Update fields
        task.setDeadline(taskDetails.getDeadline());
        task.setDescription(taskDetails.getDescription());
        task.setFollowUp(taskDetails.getFollowUp());

        return taskRepository.save(task);
    }

    // Delete task
    public void deleteTask(int id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found for id :: " + id));
        taskRepository.delete(task);
    }
}
