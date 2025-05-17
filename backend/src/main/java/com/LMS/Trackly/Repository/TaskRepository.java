package com.LMS.Trackly.Repository;

import com.LMS.Trackly.Entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Object> {
    @Query("SELECT t FROM Task t WHERE t.followUp.lead.assignedTo = :username")
    List<Task> findTasksByLeadAssignedTo(@Param("username") String username);
}
