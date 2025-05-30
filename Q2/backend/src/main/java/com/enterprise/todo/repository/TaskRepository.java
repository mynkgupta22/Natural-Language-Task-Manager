package com.enterprise.todo.repository;

import com.enterprise.todo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    // Additional query methods can be added here if needed
} 