# Frontend-Backend Integration Guide

This guide explains how to properly connect your React frontend with your Express backend.

## Understanding the Connection

The frontend and backend communicate through API calls. Here's how the integration works:

1. The frontend makes HTTP requests (GET, POST, PUT, DELETE) to the backend API endpoints
2. The backend processes these requests, interacts with the database, and sends responses back
3. The frontend displays the data or shows appropriate messages based on the responses

## Configuration

### Backend CORS Setup

The backend is already set up to accept requests from your frontend using CORS middleware. This is defined in the `server.js` file:

```javascript
// Middleware
app.use(cors());
```

### Frontend API Configuration

The frontend is configured to connect to the backend in the `src/services/api.js` file:

```javascript
const API_URL = 'http://localhost:5000/api';
```

If you need to change the backend URL (for production or testing), simply update this constant.

## Development Process

When developing your application, follow these steps to ensure smooth integration:

1. Start the backend server first:
   ```bash
   cd backend
   npm run dev
   ```

2. Then start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. When making changes to API endpoints:
   - Update the backend first
   - Test the endpoint using a tool like Postman
   - Then update the frontend service to use the new or modified endpoint

## Common Integration Issues and Solutions

### CORS Errors

If you encounter CORS errors, make sure:

1. The backend CORS middleware is properly configured
2. Your frontend is sending requests to the correct URL
3. The backend server is running

### Data Format Issues

When the frontend and backend exchange data:

1. Check the data shape being sent from the frontend matches what the backend expects
2. Verify the data returned from the backend is in the format expected by the frontend
3. Use your browser's developer tools to inspect requests and responses

### File Upload Issues

For image uploads:

1. Remember to use `FormData` for file uploads as implemented in the frontend service
2. Make sure the backend is correctly configured to receive and process multipart form data
3. Check that the image field name in the frontend matches what the backend expects (`profileImage`)

## Testing Integration

Test all user flows that involve communication between frontend and backend:

1. Creating a new team member with and without an image
2. Viewing all team members
3. Viewing a specific team member's details
4. Updating a team member's information
5. Deleting a team member

Use console logging when necessary to debug issues, but remember to remove logs before production deployment.