# Natural Language Task Manager

An enterprise-grade task management system that uses natural language processing (via Gemini API) to create and manage tasks.

## Features

- Natural language task input processing
- AI-powered task parsing using Gemini API
- Modern, minimalist UI with Glassmorphism design
- Task list and board views
- PostgreSQL backend for data persistence
- RESTful API endpoints

## Screenshorts

<img src = "./screenshorts/Screenshot 2025-05-30 222902.png"/>
<img src = "./screenshorts/Screenshot 2025-05-30 223103.png"/>
<img src = "./screenshorts/Screenshot 2025-05-30 223005.png"/>
<img src = "./screenshorts/Screenshot 2025-05-30 223024.png"/>

## Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Modern UI components

### Backend
- Java Spring Boot
- PostgreSQL
- Gemini API integration

## Project Structure

```
EnterpriseToDo/
├── backend/                # Spring Boot application
│   ├── src/
│   └── pom.xml
│
└── frontend/              # React + Vite application
    ├── src/
    └── package.json
```

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- PostgreSQL 13 or higher
- Gemini API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create application.properties and add your Gemini API key:
   ```properties
   gemini.api.key=YOUR_API_KEY
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/tasks/parse` - Parse natural language input
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task 
