# Student Feedback Manager

A clean, modern, and production-ready full-stack web application designed for educational institutions, bootcamps, and workshops. It allows students to submit course and instructor feedback and displays all feedback submissions in real-time.

Built as a realistic developer project using **React + Vite + Tailwind CSS** on the frontend, **Node.js + Express.js** on the backend, and **MongoDB + Mongoose** for the database.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Database & Environment Setup](#database--environment-setup)
6. [Installation & Setup](#installation--setup)
7. [Running the Application](#running-the-application)
8. [API Endpoints](#api-endpoints)
9. [Complete Data Flow Walkthrough](#complete-data-flow-walkthrough)
10. [Viva / Interview Preparation Guide](#viva--interview-preparation-guide)
11. [Future Improvements](#future-improvements)

---

## Project Overview

The **Student Feedback Manager** demonstrates end-to-end full-stack web development without overcomplicating code with boilerplate or third-party wrappers. 

Students can:
1. Fill out their name, choose a rating (1 to 5 stars), and write comments about their learning experience.
2. Receive immediate validation and submission feedback without page reloads.
3. Browse all submissions on a dedicated feedback page sorted newest-first.

---

## Key Features

- **Human-Crafted UI/UX**: Off-white background, subtle borders, focused typography (Inter), responsive design, and intuitive color accents.
- **Accessible Rating Component**: Keyboard-navigable (Arrow keys, Space, Enter) and hover-preview 1-to-5 star rating selector.
- **Real-Time Character Counter**: Gives students live feedback on comment length with a 500-character limit.
- **Frontend & Backend Validation**: Dual-layer validation prevents invalid or empty data before reaching MongoDB.
- **Empty, Loading & Error States**: Graceful UI states handling network delays, missing data, and server errors.
- **Modular Architecture**: Separate controller, route, model, and service layers for easy code maintenance and interview explanation.
- **Secure Configuration**: Environment variables loaded with `dotenv` (no hardcoded database credentials or secret tokens).

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React (v18) + Vite | Fast component-based UI rendering & bundle tooling |
| **Styling** | Tailwind CSS | Utility-first CSS for clean, responsive design |
| **Routing** | React Router (v6) | Client-side routing between Home and Feedback pages |
| **Icons** | Lucide React | Lightweight, accessible SVG icons |
| **HTTP Client** | Browser Fetch API | Native, clean asynchronous network requests |
| **Backend Framework** | Node.js + Express.js | REST API server, routing, and JSON middleware |
| **Database** | MongoDB | Document-based NoSQL database |
| **ODM** | Mongoose (v8) | Schema validation, modeling, and MongoDB connection |
| **Config** | dotenv | Managing environment variables (`PORT`, `MONGO_URI`) |
| **CORS** | cors | Cross-Origin Resource Sharing middleware |

---

## Project Structure

```text
phase7/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmptyState.jsx        # Shown when 0 reviews exist
│   │   │   ├── ErrorMessage.jsx      # Friendly error banner with retry button
│   │   │   ├── FeedbackCard.jsx      # Individual student feedback card
│   │   │   ├── FeedbackForm.jsx      # Name, rating, comment submission form
│   │   │   ├── FeedbackList.jsx      # Feed of feedback cards
│   │   │   ├── LoadingState.jsx      # Spinner and loading status
│   │   │   ├── Navbar.jsx            # Responsive navigation header
│   │   │   └── RatingSelector.jsx    # Accessible 1-5 star selector
│   │   ├── pages/
│   │   │   ├── AllFeedbackPage.jsx   # Page fetching and displaying all reviews
│   │   │   └── HomePage.jsx          # Feedback submission page
│   │   ├── services/
│   │   │   └── feedbackService.js    # Fetch API calls (getFeedback, createFeedback)
│   │   ├── App.jsx                   # Route definitions and layout wrapper
│   │   ├── index.css                 # Tailwind CSS directives and base styles
│   │   └── main.jsx                  # React DOM root entry
│   ├── .env                          # Frontend environment variables
│   ├── .env.example                  # Template for frontend environment variables
│   ├── index.html                    # Root HTML document
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── postcss.config.js             # PostCSS plugins
│   ├── tailwind.config.js            # Tailwind custom brand colors and fonts
│   └── vite.config.js                # Vite development server and API proxy config
│
├── backend/
│   ├── config/
│   │   └── db.js                     # MongoDB connection using Mongoose
│   ├── controllers/
│   │   └── feedbackController.js     # Controller functions (createFeedback, getAllFeedback)
│   ├── models/
│   │   └── Feedback.js               # Mongoose schema and model definition
│   ├── routes/
│   │   └── feedbackRoutes.js         # Express router mapping routes to controller
│   ├── .env                          # Backend environment variables (PORT, MONGO_URI)
│   ├── .env.example                  # Template for backend environment variables
│   ├── package.json                  # Backend dependencies and scripts
│   ├── server.js                     # Express app setup, middleware, and listener
│   └── test-api.js                   # Automated test suite for endpoints
│
├── .gitignore                        # Prevents node_modules and .env files from git
├── package.json                      # Root workspace convenience scripts
└── README.md                         # Complete project documentation and viva guide
```

---

## Database & Environment Setup

### 1. MongoDB Connection Options

You can run MongoDB either **locally** or through **MongoDB Atlas (Cloud)**:

#### Option A: Local MongoDB (Community Edition)
1. Ensure MongoDB Community Server is installed and running on your computer.
2. In `backend/.env`, set:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/student_feedback_db
   ```

#### Option B: MongoDB Atlas (Free Cloud Database)
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Database User with username and password.
3. In Network Access, whitelist your IP address (or `0.0.0.0/0` for access from anywhere).
4. Copy your connection string into `backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student_feedback_db?retryWrites=true&w=majority
   ```

---

## Installation & Setup

Clone or open the project folder in your terminal:

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

*(Alternatively, run `npm run install:all` from the project root).*

---

## Running the Application

### 1. Start the Backend Server
```bash
cd backend
npm run dev
```
- The backend starts on `http://localhost:5000`.
- It connects to MongoDB and logs: ` MongoDB Connected: ...`.

### 2. Start the Frontend Development Server
In a separate terminal window:
```bash
cd frontend
npm run dev
```
- The frontend starts on `http://localhost:5173`.
- Open your browser and navigate to `http://localhost:5173`.

---

## API Endpoints

### 1. Create New Feedback
- **Method**: `POST`
- **URL**: `/api/feedback`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Aarav Sharma",
    "rating": 5,
    "comment": "The sessions helped me understand JavaScript better and I became more confident building projects."
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Feedback submitted successfully.",
    "data": {
      "_id": "674fb1234abcd567890ef123",
      "name": "Aarav Sharma",
      "rating": 5,
      "comment": "The sessions helped me understand JavaScript better and I became more confident building projects.",
      "createdAt": "2026-10-04T07:30:00.000Z",
      "updatedAt": "2026-10-04T07:30:00.000Z",
      "__v": 0
    }
  }
  ```
- **Validation Error (400 Bad Request)**:
  ```json
  {
    "success": false,
    "message": "Rating must be a number between 1 and 5."
  }
  ```

#### Test via cURL / PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/feedback" -Method Post -ContentType "application/json" -Body '{"name":"Aarav Sharma","rating":5,"comment":"Great learning experience!"}'
```

---

### 2. Get All Feedback
- **Method**: `GET`
- **URL**: `/api/feedback`
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "674fb1234abcd567890ef123",
        "name": "Priya Patel",
        "rating": 5,
        "comment": "Exceptional course material and hands-on exercises.",
        "createdAt": "2026-10-04T07:45:00.000Z"
      },
      {
        "_id": "674fb1234abcd567890ef122",
        "name": "Aarav Sharma",
        "rating": 5,
        "comment": "The sessions helped me understand JavaScript better.",
        "createdAt": "2026-10-04T07:30:00.000Z"
      }
    ]
  }
  ```

#### Test via cURL / PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/feedback" -Method Get
```

---

## Complete Data Flow Walkthrough

### 1. Data Submission Flow (Form to MongoDB)
```text
[User Fills Form in React]
          │
          ▼
[Frontend Validation (FeedbackForm.jsx)]
          │ Valid?
          ├── No ──> Displays field errors inline (red helper text)
          └── Yes
                │
                ▼
[createFeedback() in feedbackService.js]
                │
                ▼ fetch('POST /api/feedback', { body: JSON })
[Express Server (server.js)]
                │
                ▼ Middleware: cors() & express.json() parses body into req.body
[feedbackRoutes.js]
                │
                ▼ Calls createFeedback() in feedbackController.js
[feedbackController.js]
                │
                ▼ Validates name, rating (1-5), comment
[Feedback.create() using Feedback Model]
                │
                ▼ Mongoose validates Schema rules & creates timestamps
[MongoDB Collection ('feedbacks')]
                │
                ▼ Document saved with unique _id
[201 Created Response returned to React]
                │
                ▼ Form clears, Success banner displays with link to /feedback
```

### 2. Data Retrieval Flow (MongoDB to React)
```text
[User Navigates to /feedback (AllFeedbackPage.jsx)]
          │
          ▼ useEffect triggers fetchFeedbackList()
[getFeedback() in feedbackService.js]
          │
          ▼ fetch('GET /api/feedback')
[Express Server (server.js)]
          │
          ▼ feedbackRoutes.js delegates to getAllFeedback()
[feedbackController.js]
          │
          ▼ Feedback.find().sort({ createdAt: -1 })
[MongoDB Collection]
          │
          ▼ Returns all documents sorted newest-first
[200 OK Response with JSON { success: true, count, data: [...] }]
          │
          ▼ feedbackService parses JSON and returns array
[AllFeedbackPage updates feedbacks state via setFeedbacks()]
          │
          ├── If 0 items ──> Renders <EmptyState />
          └── If > 0 items ──> Renders <FeedbackList /> mapping <FeedbackCard />
```

---

## Viva / Interview Preparation Guide

Use this section to confidently explain your major project to examiners and interviewers:

### 1. What is MongoDB?
**Answer**: MongoDB is a leading open-source NoSQL document database. Instead of storing data in tables with rigid rows and columns like SQL databases, MongoDB stores records as flexible, JSON-like BSON (Binary JSON) documents.

### 2. Why is MongoDB being used in this project?
**Answer**: 
- **Natural Fit with JavaScript**: MongoDB documents map directly to JavaScript objects and JSON, making full-stack development with Node.js seamless.
- **Flexible Schema**: Allows documents to contain nested data and evolve easily over time without complex database migrations.
- **High Performance**: Native indexing, fast read/write speeds, and simple horizontal scaling.

### 3. What does Mongoose do?
**Answer**: Mongoose is an **Object Data Modeling (ODM)** library for MongoDB and Node.js. It acts as an abstraction layer over the raw MongoDB driver, providing:
- Schema definitions and data validation.
- Type casting (e.g., converting strings to numbers or dates).
- Built-in query helpers and hooks.
- Easy integration with business logic.

### 4. What is a Schema in Mongoose?
**Answer**: A Mongoose **Schema** defines the blueprint or structure of a document within a MongoDB collection. It specifies the fields, allowed data types, default values, whether fields are required, and validation constraints (e.g., `min: 1`, `max: 5`, `trim: true`, `maxlength`).

### 5. What is a Model in Mongoose?
**Answer**: A Mongoose **Model** is a compiled wrapper constructed from a Schema. While the Schema defines the blueprint, the Model provides the programming interface to interact with the database (creating documents, querying with `find()`, updating, and deleting). Example: `const Feedback = mongoose.model('Feedback', feedbackSchema);`.

### 6. How does the MongoDB connection work?
**Answer**: In `backend/config/db.js`, we use `mongoose.connect(process.env.MONGO_URI)`. This returns a Promise that establishes a connection pool to the MongoDB server. If the connection fails, it catches the error and exits or logs appropriately.

### 7. How does `POST /api/feedback` work?
**Answer**: 
1. The client sends a POST request with a JSON payload in the request body.
2. Express parses the payload via `express.json()`.
3. The route routes the request to `createFeedback` in `feedbackController.js`.
4. The controller validates that `name`, `rating` (1 to 5), and `comment` exist and are valid.
5. `Feedback.create()` persists the document into MongoDB.
6. The controller sends back HTTP status `201 Created` with the newly created document.

### 8. How is feedback saved in MongoDB?
**Answer**: When calling `Feedback.create({ name, rating, comment })`, Mongoose verifies the data against `feedbackSchema`. If valid, it generates an `_id` (ObjectId) and `createdAt`/`updatedAt` timestamps, converts the object to BSON format, and issues an `insertOne` command to the `feedbacks` collection in MongoDB.

### 9. How does `GET /api/feedback` work?
**Answer**: 
1. The client sends a GET request to `/api/feedback`.
2. The controller executes `Feedback.find().sort({ createdAt: -1 })`.
3. `Feedback.find()` queries all documents from the collection.
4. `.sort({ createdAt: -1 })` sorts the results in descending order so the newest feedback appears at the top.
5. The controller returns HTTP status `200 OK` with `{ success: true, count, data }`.

### 10. How does React communicate with Express?
**Answer**: React runs in the user's browser, while Express runs on a server. React communicates with Express via standard **HTTP requests (REST API)** using the browser's native `fetch()` API. 
During development, CORS (Cross-Origin Resource Sharing) is enabled on the Express server (`app.use(cors())`) and Vite configures a development proxy so requests to `/api` route seamlessly to port 5000.

### 11. What does `express.json()` do?
**Answer**: `express.json()` is a built-in middleware function in Express based on `body-parser`. When incoming HTTP requests contain a `Content-Type: application/json` header, this middleware intercepts the raw stream, parses the JSON string, and attaches the resulting JavaScript object to `req.body`. Without this middleware, `req.body` would be `undefined`.

### 12. Why is `.env` used?
**Answer**: 
- **Security**: Prevents sensitive credentials (database connection strings, passwords, API keys) from being hardcoded or accidentally committed into version control (Git).
- **Environment Parity**: Allows switching between development, testing, and production environments simply by updating configuration values without changing application code.

### 13. How does data flow from the form to MongoDB?
**Answer**: 
User types input $\rightarrow$ React component state (`formData`) $\rightarrow$ validation $\rightarrow$ `createFeedback()` in `feedbackService.js` $\rightarrow$ HTTP POST request with JSON $\rightarrow$ Express middleware (`express.json()`) $\rightarrow$ `feedbackController.js` $\rightarrow$ Mongoose Model validation $\rightarrow$ MongoDB writes document to disk.

### 14. How does data flow from MongoDB back to React?
**Answer**: 
React page loads $\rightarrow$ `useEffect` hook triggers `getFeedback()` $\rightarrow$ HTTP GET request $\rightarrow$ Express controller calls `Feedback.find().sort({ createdAt: -1 })` $\rightarrow$ MongoDB returns documents $\rightarrow$ Express responds with JSON $\rightarrow$ React receives data, updates `feedbacks` state $\rightarrow$ React re-renders the UI displaying `<FeedbackCard />` components.

---

## Future Improvements

1. **Category Filtering**: Allow filtering feedback by category (e.g., Course Content, Instructor, Facilities).
2. **Sentiment Analysis**: Highlight positive vs constructive feedback with automated tag badges.
3. **Pagination / Infinite Scroll**: For large collections with hundreds of submissions.
4. **Admin Export**: Export feedback to CSV or PDF for department reports.
