package com.LMS.Trackly.Controller;

import com.LMS.Trackly.Entity.Task;
import com.LMS.Trackly.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // GET /api/task/
    @GetMapping("/")
    public ResponseEntity<List<Task>> getAll() {
        List<Task> tasks = taskService.getAllTasks();
        if (tasks.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tasks);
    }

    // GET /api/task/id/{id}
    @GetMapping("/id/{id}")
    public ResponseEntity<Task> getById(@PathVariable int id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET /api/task/followup/{followupId}
    @GetMapping("/followup/{followupId}")
    public ResponseEntity<List<Task>> getByFollowupId(@PathVariable int followupId) {
        List<Task> tasks = taskService.getTasksByFollowupId(followupId);
        return ResponseEntity.ok(tasks);
    }

    // GET /api/task/deadline-range?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd
    @GetMapping("/deadline-range")
    public ResponseEntity<List<Task>> getByDeadlineRange(
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {

        if (startDate == null || endDate == null) {
            return ResponseEntity.badRequest().build();
        }
        List<Task> tasks = taskService.getTasksByDeadlineRange(startDate, endDate);
        return ResponseEntity.ok(tasks);
    }

    // POST /api/task/
    @PostMapping("/")
    public ResponseEntity<Task> create(@RequestBody Task task) {
        try {
            Task createdTask = taskService.createTask(task);
            return ResponseEntity.status(201).body(createdTask);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT /api/task/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable int id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        if (updatedTask == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(updatedTask);
    }

    // DELETE /api/task/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable int id) {
        boolean deleted = taskService.deleteTask(id);
        if (deleted) {
            return ResponseEntity.ok().body("{\"message\": \"Task Deleted successfully\"}");
        } else {
            return ResponseEntity.status(500).body("{\"message\": \"Failed to delete Task\"}");
        }
    }
}
