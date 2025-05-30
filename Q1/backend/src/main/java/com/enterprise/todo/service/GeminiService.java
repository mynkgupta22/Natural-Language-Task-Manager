package com.enterprise.todo.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
public class GeminiService {

    private final String apiKey;
    private final String apiUrl;
    private final OkHttpClient client;
    private final ObjectMapper objectMapper;

    public GeminiService(
            @Value("${gemini.api.key}") String apiKey,
            @Value("${gemini.api.url}") String apiUrl) {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.client = new OkHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    public Map<String, Object> parseNaturalLanguage(String input) throws IOException {
    	String prompt = String.format("""
    		    Extract the following natural language into JSON with keys: task, assignee, dueDate, and priority.
    		    
    		    - "dueDate" must be in ISO 8601 format: yyyy-MM-dd'T'HH:mm:ss (e.g., 2024-06-20T23:00:00)
    		    - Parse natural language time expressions like "tomorrow 5pm", "today", "20th June 11pm", etc.
    		    - If "assignee" is mentioned, extract the name.
    		    - If "priority" is missing, default to "P3".
    		    
    		    Input: "%s"
    		    
    		    Output example:
    		    {
    		      "task": "Call client Rajeev",
    		      "assignee": "Rajeev",
    		      "dueDate": "2024-06-20T17:00:00",
    		      "priority": "P3"
    		    }
    		    
    		    Return only the JSON. Do not return markdown formatting or code block syntax.
    		    """, input);

        // Create request body
        String requestBody = String.format("""
            {
                "contents": [{
                    "parts": [{
                        "text": "%s"
                    }]
                }]
            }
            """, prompt.replace("\"", "\\\""));

        // Build request
        Request request = new Request.Builder()
                .url(apiUrl + "?key=" + apiKey)
                .post(RequestBody.create(requestBody, MediaType.parse("application/json")))
                .build();

        // Execute request with retry
        Response response = null;
        String jsonResponse = null;
        int maxRetries = 2;
        int attempt = 0;

        while (attempt < maxRetries) {
            try {
                response = client.newCall(request).execute();
                jsonResponse = response.body().string();
                
                JsonNode root = objectMapper.readTree(jsonResponse);
                String content = root.path("candidates")
                                   .path(0)
                                   .path("content")
                                   .path("parts")
                                   .path(0)
                                   .path("text")
                                   .asText();
                String cleanedJson = content.replaceAll("(?s)```json\\s*", "")  // remove ```json and any following whitespace/newline
                        .replaceAll("(?s)```\\s*", "")      // remove closing ```
                        .trim();
                // Parse the extracted JSON content
                return objectMapper.readValue(cleanedJson, Map.class);
            } catch (Exception e) {
                log.error("Error parsing natural language, attempt {}: {}", attempt + 1, e.getMessage());
                attempt++;
                if (attempt == maxRetries) {
                    throw new IOException("Failed to parse natural language after " + maxRetries + " attempts");
                }
            } finally {
                if (response != null) {
                    response.close();
                }
            }
        }

        throw new IOException("Failed to parse natural language");
    }
} 