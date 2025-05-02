# Team Maestro - Student Team Members Management Application

A beautiful React application for managing student team members. This project includes both frontend and backend components.

## Features

- ✨ Clean, modern UI with smooth animations
- 📱 Fully responsive design for all devices
- 🖼️ Image upload for member profiles
- 🔍 Search functionality for team members
- ✅ Form validation for data integrity
- 📊 Display team members in a grid layout
- 🧩 View detailed profile information
- ⚡ Fast performance with Vite and React

## Tech Stack

### Frontend

- React.js
- React Router for navigation
- Axios for API requests
- React Icons for beautiful icons
- React Toastify for notifications
- Custom CSS styling

### Backend

- Node.js + Express
- MongoDB for data storage
- Multer for file handling
- Zod for validation
- ES Modules

## Screenshots

(Add screenshots of your application here)

## Project Structure

```
student-team-management/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API service functions
│   │   ├── styles/         # CSS stylesheets
│   │   └── App.js          # Main app with routing
│   ├── index.html          # HTML entry point
│   └── vite.config.js      # Vite configuration
└── backend/                # Node.js + Express backend
    ├── api/                # API endpoints by resource
    │   └── members/        # Members API
    │   |   ├── members.router.js
    │   |   ├── members.controller.js
    │   |   └── members.schema.js
    |   └──index.js
    ├── config/             # Configuration files
    │   └── db.js           # Database connection
    ├── middleware/         # Express middleware
    └── server.js           # Express server setup
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB account (Atlas or local installation)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the backend directory with the following:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   DB_NAME=student-team-management
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will be running on http://localhost:5173.

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

The frontend will be running on http://localhost:8080.

## API Endpoints

The following API endpoints are available:

- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get a single member by ID
- `GET /api/members/:id/image` - Get a member's profile image
- `POST /api/members` - Create a new member (with optional image)
- `PUT /api/members/:id` - Update a member (with optional image)
- `DELETE /api/members/:id` - Delete a member

## Deployment

### Frontend

Build the frontend for production:

```bash
cd frontend
npm run build
```

This will create a `dist` directory with static files that can be served by any static file server.

### Backend

The backend can be deployed to any Node.js hosting service like Heroku, Render, or Railway.

## License

This project is licensed under the MIT License.

## Acknowledgements

- React Icons - For the beautiful icons
- React Toastify - For notifications
- MongoDB Atlas - For database hosting
- Vercel - For frontend hosting
- Render - For backend hosting
