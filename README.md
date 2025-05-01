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

The backend will be running on http://localhost:5000.

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

The frontend will be running on http://localhost:3000.

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

## Contributers

<div align="center"> 
  <table>
<tr align="center">
 <td>

#### Dhruv Pratap Singh

<p align="center">
<img src = "https://media.licdn.com/dms/image/v2/D4D03AQHL32wwHfqFng/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726068058952?e=1751500800&v=beta&t=fBrYqODJtazO2xbvVl9FLMgM-IfoSqtqHVigkyxjxyo"  height="120" alt="Dhruv Pratap Singh">
</p>
<p align="center">
<a href = "https://github.com/dhruvgit-27"><img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36"/></a>
<a href = "https://www.linkedin.com/in/dhruv-pratap-716403303/">
<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36"/>
</a>
</p>
 <strong>ML & Front-End Developer<strong>
</td>

 <td>

#### Manas Joshi

<p align="center">
<img src = "https://media.licdn.com/dms/image/v2/D5603AQFS-uSiq8aIIA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1705914887851?e=1751500800&v=beta&t=7ekBYTQYWbIEMHOhrf-KAwQ4MGx1GvRIBSP2ARiYbd8"  height="120" alt="Manas Joshi">
</p>
<p align="center">
<a href = "https://github.com/manasj007"><img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36"/></a>
<a href = "https://www.linkedin.com/in/manas-joshi-811802251/">
<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36"/>
</a>
</p>
 <strong>Front-End Developer<strong>

 <td>

#### Harsh Kumar Banka

<p align="center">
<img src = "https://avatars.githubusercontent.com/u/56753150?v=4"  height="120" alt="Harsh Kumar Banka">
</p>
<p align="center">
<a href = "https://github.com/LordHarsh"><img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36"/></a>
<a href = "https://www.linkedin.com/in/harsh-banka/">
<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36"/>
</a>
</p>
 <strong>ML & Full-Stack Developer<strong>
</td>
</tr>
</table>
</div>
## License

This project is licensed under the MIT License.

## Acknowledgements

- React Icons - For the beautiful icons
- React Toastify - For notifications
- MongoDB Atlas - For database hosting
- Vercel - For frontend hosting
- Render - For backend hosting
