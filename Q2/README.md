# Natural Language Task Manager

An enterprise-grade to-do list application that allows users to create tasks using natural language commands.

## Features

- Natural language task input (e.g., "Call Rajeev tomorrow 5pm")
- Automatic parsing of task name, assignee, due date/time, and priority
- RESTful API with Spring Boot backend
- PostgreSQL database for persistent storage
- Modern React frontend (coming soon)

## Screenshorts

<img src = "./screenshorts/Screenshot 2025-05-30 222902.png"/>
<img src = "./screenshorts/Screenshot 2025-05-30 222929.png"/>
<img src = "./screenshorts/Screenshot 2025-05-30 223005.png"/>
<img src = "./screenshorts/Screenshot 2025-05-30 223024.png"/>


## Prerequisites

- Java 17 or higher
- Maven
- PostgreSQL
- Node.js and npm (for frontend)

## Setup

### Database Setup

1. Install PostgreSQL if you haven't already
2. Create a new database:
```sql
CREATE DATABASE todo_db;
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend server will start on http://localhost:8080

## API Endpoints

### Create Task
```http
POST /api/tasks/parse
Content-Type: application/json

{
    "rawText": "Finish landing page Aman by 11pm 20th June"
}
```

### Get All Tasks
```http
GET /api/tasks
```

### Get Task by ID
```http
GET /api/tasks/{id}
```

### Update Task
```http
PUT /api/tasks/{id}
Content-Type: application/json

{
    "title": "Updated task title",
    "assignee": "John",
    "dueDateTime": "2024-06-20T23:00:00",
    "priority": "P1"
}
```

### Delete Task
```http
DELETE /api/tasks/{id}
```

## Example Task Input Formats

- "Call Rajeev tomorrow 5pm"
- "Finish landing page Aman by 11pm 20th June"
- "Review code John by tomorrow 3pm P1"
- "Send report to Sarah by 2pm 15th July P2"

## Coming Soon

- Frontend implementation with React + Vite
- Task board view
- Inline task editing
- Priority-based columns
- Modern UI with Tailwind CSS 
