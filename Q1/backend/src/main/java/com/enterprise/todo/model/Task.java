package com.enterprise.todo.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String taskName;

    @Column
    private String assignee;

    @Column
    private LocalDateTime dueDateTime;

    @Column(nullable = false)
    private String priority;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Default constructor
    public Task() {
        this.priority = "P3"; // Default priority
    }
} 