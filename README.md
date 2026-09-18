# AIONOS Internal Service Agent

An internal IT support agent developed for the AIONOS Agentic AI Factory assignment.

## Overview

The application processes employee IT support requests and recommends an appropriate action using the supplied employee requests, policies, and ticket information.

## Features

- Supports REQ-01 to REQ-15
- Knowledge-base search
- Policy and ticket lookup
- Automated decision engine
- Action classification:
  - RESOLVE
  - CREATE_TICKET
  - ESCALATE
  - ASK_CLARIFICATION
- Priority classification:
  - LOW
  - MEDIUM
  - HIGH
- Displays recommendation, reason, policy source, and previous ticket information

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- JavaScript
- CORS

### Data
- JSON

## Agent Flow

Employee Request  
↓  
React Frontend  
↓  
Express API  
↓  
Knowledge Base  
↓  
Decision Engine  
↓  
Action + Priority + Reason  
↓  
Result displayed to employee

## API Endpoints

### Health Check

`GET /`

### Search Knowledge Base

`GET /api/search?q=<query>`

### Process Request

`POST /api/agent`

Example:

```json
{
  "request": "My laptop won't turn on"
}