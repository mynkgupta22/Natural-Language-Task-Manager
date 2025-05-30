package com.enterprise.todo.service;

import com.enterprise.todo.model.Task;
import com.enterprise.todo.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskParserService taskParserService;

    public Task createTaskFromText(String rawText) {
        Task task = taskParserService.parseTask(rawText);
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(String id) {
        return taskRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Task not found with id: " + id));
    }

    public Task updateTask(String id, Task taskDetails) {
        Task task = getTaskById(id);
        
        task.setTitle(taskDetails.getTitle());
        task.setAssignee(taskDetails.getAssignee());
        task.setDueDateTime(taskDetails.getDueDateTime());
        task.setPriority(taskDetails.getPriority());

        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        if (!taskRepository.existsById(id)) {
            throw new EntityNotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
} 