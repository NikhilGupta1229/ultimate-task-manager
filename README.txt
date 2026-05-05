ULTIMATE TASK MANAGER (FULL STACK WEB APPLICATION)

1. PROJECT OVERVIEW


Ultimate Task Manager is a full-stack web application designed to help individuals and teams manage their daily tasks and projects efficiently. The system provides a centralized platform where users can create projects, assign tasks, track progress, and monitor overall productivity through a dashboard.

The application follows a client-server architecture where the frontend is built using React and the backend is developed using Node.js and Express. MongoDB is used as the database to store all user, project, and task-related data.



2. OBJECTIVE


The main objective of this project is to:

* Provide a simple and efficient task management system
* Enable users to organize their work into projects
* Track task completion status (Pending / Completed)
* Build a real-world full-stack application using modern technologies


3. KEY FEATURES


* User Authentication & Authorization

  * Secure login and registration using JWT
  * Protected routes for authorized users

* Project Management

  * Create new projects
  * View all projects
  * Delete projects

* Task Management

  * Add tasks under specific projects
  * Update task status (Pending / Completed)
  * Delete tasks

* Dashboard

  * Shows total tasks
  * Shows completed tasks
  * Shows pending tasks

* Responsive UI

  * Works on desktop and mobile devices
  * Built using Tailwind CSS


4. TECHNOLOGY STACK


Frontend:

* React.js (Vite)
* React Router DOM
* Axios (API calls)
* Tailwind CSS (Styling)

Backend:

* Node.js
* Express.js
* MongoDB (Database)
* Mongoose (ODM)
* JSON Web Token (JWT)
* CORS
* dotenv


5. PROJECT STRUCTURE


ULTIMATE-TASK-MANAGER/
│
├── backend/
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│   └── package.json
│
└── README.txt



6. DATABASE DESIGN


Collections used in MongoDB:

i). Users

   * name
   * email
   * password (hashed)

ii). Projects

   * projectName
   * createdBy (userId)

iii). Tasks

   * title
   * status (Pending / Completed)
   * projectId
   * createdBy (userId)
iv). Run
   * cd backend
   * cp .env.example .env
   * npm install
   * npm start

7. ENVIRONMENT VARIABLES


Create a .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key



8. API ENDPOINTS


Authentication:
POST /api/auth/register
POST /api/auth/login

Dashboard:
GET /api/dashboard

Projects:
GET /api/projects
POST /api/projects
DELETE /api/projects/:id

Tasks:
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id



9. WORKING FLOW


(i). User registers and logs into the system
(ii).JWT token is generated and stored on the client side
(iii). User creates projects
(iv). Tasks are added under projects
(v). Backend stores data in MongoDB
(vi). Dashboard fetches and displays task statistics
(vii). All API calls are handled via Axios from frontend



10. DEPLOYMENT

- Push to GitHub
- Import in Railway
- Add ENV vars

Backend Deployment:

* Hosted on Railway
* Environment variables configured in Railway dashboard

Frontend Deployment:

* Hosted on Railway
* Connected with backend using deployed API URL

Important:

* Replace localhost API with deployed backend URL in frontend


11. LIVE LINKS

https://ultimate-task-manager-production-23be.up.railway.app/


12. CHALLENGES FACED


* Handling CORS issues during deployment
* Fixing Vite build errors on Railway
* Managing environment variables securely
* Connecting frontend with deployed backend
* Debugging MongoDB connection issues



13. FUTURE IMPROVEMENTS



* Add user roles (Admin / Member)
* Add task deadlines and reminders
* Implement notifications
* Improve UI/UX design
* Add task management


14. AUTHOR



Name: Nikhil Gupta
Project Title: Ultimate Task Manager
Type: Full Stack Web Application

---


