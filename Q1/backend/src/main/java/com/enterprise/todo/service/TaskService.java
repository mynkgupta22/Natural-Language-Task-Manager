package com.enterprise.todo.service;

import com.enterprise.todo.model.Task;
import com.enterprise.todo.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final GeminiService geminiService;

    public Task createTaskFromNaturalLanguage(String input) throws Exception {
        Map<String, Object> parsedData = geminiService.parseNaturalLanguage(input);
        
        Task task = new Task();
        task.setTaskName((String) parsedData.get("task"));
        task.setAssignee((String) parsedData.get("assignee"));
        
        String dueDate = (String) parsedData.get("dueDate");
        if (dueDate != null) {
            task.setDueDateTime(LocalDateTime.parse(dueDate, DateTimeFormatter.ISO_DATE_TIME));
        }
        
        task.setPriority((String) parsedData.getOrDefault("priority", "P3"));
        
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTaskName(taskDetails.getTaskName());
        task.setAssignee(taskDetails.getAssignee());
        task.setDueDateTime(taskDetails.getDueDateTime());
        task.setPriority(taskDetails.getPriority());

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
} 