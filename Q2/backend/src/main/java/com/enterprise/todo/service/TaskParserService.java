package com.enterprise.todo.service;

import com.enterprise.todo.model.Priority;
import com.enterprise.todo.model.Task;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TaskParserService {

    private static final Pattern TASK_PATTERN = Pattern.compile(
        "(?<title>.+?)\\s+(?:to|by|for|@)?\\s*(?<assignee>\\w+)\\s+(?:by|at|on)?\\s+(?<datetime>.+?)(?:\\s+P(?<priority>[1-4]))?$",
        Pattern.CASE_INSENSITIVE
    );

    private static final List<DateTimeFormatter> DATE_FORMATTERS = List.of(
        DateTimeFormatter.ofPattern("h a d MMMM yyyy", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("d MMMM yyyy h a", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("d MMMM h a", Locale.ENGLISH),
        DateTimeFormatter.ofPattern("d MMM h a", Locale.ENGLISH)
    );

    public Task parseTask(String rawText) {
        Matcher matcher = TASK_PATTERN.matcher(rawText.trim());
        if (!matcher.matches()) {
            throw new IllegalArgumentException("Could not parse task format: " + rawText);
        }

        Task task = new Task();
        task.setTitle(matcher.group("title").trim());
        task.setAssignee(matcher.group("assignee").trim());

        // Parse due date
        String dateTimeStr = matcher.group("datetime").trim();
        task.setDueDateTime(parseDateTimeString(dateTimeStr));

        // Parse priority
        String priorityStr = matcher.group("priority");
        if (priorityStr != null) {
            try {
                task.setPriority(Priority.valueOf("P" + priorityStr));
            } catch (IllegalArgumentException e) {
                task.setPriority(Priority.P3); // default fallback
            }
        } else {
            task.setPriority(Priority.P3); // default if not mentioned
        }

        return task;
    }

    private LocalDateTime parseDateTimeString(String input) {
        input = input.toLowerCase().trim();

        LocalDateTime now = LocalDateTime.now();
        LocalDate today = LocalDate.now();

        try {
            if (input.contains("tomorrow")) {
                return buildTime(today.plusDays(1), input.replace("tomorrow", "").trim());
            } else if (input.contains("today")) {
                return buildTime(today, input.replace("today", "").trim());
            }

            // Handle weekdays like "Monday 5pm"
            for (DayOfWeek dow : DayOfWeek.values()) {
                if (input.contains(dow.name().toLowerCase())) {
                    LocalDate targetDate = today.with(TemporalAdjusters.next(dow));
                    return buildTime(targetDate, input.replace(dow.name().toLowerCase(), "").trim());
                }
            }

            // Handle formats like "20th June at 5pm"
            input = input.replaceAll("(\\d+)(st|nd|rd|th)", "$1"); // strip suffixes

            for (DateTimeFormatter formatter : DATE_FORMATTERS) {
                try {
                    LocalDateTime parsed = LocalDateTime.parse(appendYearIfMissing(input), formatter);
                    if (parsed.isBefore(now)) {
                        parsed = parsed.plusYears(1); // auto-shift to future
                    }
                    return parsed;
                } catch (DateTimeParseException ignored) {
                }
            }

            // fallback to fixed format
            throw new IllegalArgumentException("Unsupported datetime format: " + input);
        } catch (Exception e) {
            throw new IllegalArgumentException("Could not parse date/time: " + input, e);
        }
    }

    private LocalDateTime buildTime(LocalDate date, String timeStr) {
        int hour = 9;
        int minute = 0;

        Matcher timeMatcher = Pattern.compile("(\\d{1,2})(:(\\d{2}))?\\s*(am|pm)?", Pattern.CASE_INSENSITIVE).matcher(timeStr.trim());
        if (timeMatcher.find()) {
            hour = Integer.parseInt(timeMatcher.group(1));
            if (timeMatcher.group(3) != null) {
                minute = Integer.parseInt(timeMatcher.group(3));
            }
            String ampm = timeMatcher.group(4);
            if (ampm != null && ampm.equalsIgnoreCase("pm") && hour < 12) {
                hour += 12;
            } else if (ampm != null && ampm.equalsIgnoreCase("am") && hour == 12) {
                hour = 0;
            }
        }

        return date.atTime(hour, minute);
    }

    private String appendYearIfMissing(String input) {
        // Append current year if not present
        if (!input.matches(".*\\d{4}.*")) {
            return input + " " + Year.now().getValue();
        }
        return input;
    }
}
