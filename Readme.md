# HCLTech Healthcare Management System

A full-stack web application for managing patient and healthcare provider interactions. This system allows patients to manage their health profiles, track health goals, and access public health information.

## Project Overview

HCLTech is a healthcare management platform built with a modern tech stack:

- Frontend: React 19 + Vite with Tailwind CSS
- Backend: Express.js with MongoDB
- Authentication: JWT-based authentication with bcryptjs password hashing
- File Uploads: Cloudinary integration for image management
- Client-Server Communication: Axios for HTTP requests

---

## Tech Stack

### Client (React + Vite)

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.2.4 | Build tool & dev server |
| React Router | 7.10.0 | Client-side routing |
| Tailwind CSS | 3.4.18 | Styling |
| Axios | 1.13.2 | HTTP client |
| Lucide React | 0.555.0 | Icon library |

### Server (Express.js)

| Technology | Version | Purpose |
|-----------|---------|---------|
| Express | 5.2.1 | Web framework |
| MongoDB | 9.0.0 | Database (via Mongoose) |
| JWT | 9.0.3 | Authentication |
| bcryptjs | 3.0.3 | Password hashing |
| Cloudinary | 2.8.0 | Cloud image storage |
| Multer | 2.0.2 | File upload handling |
| Nodemon | 3.1.11 | Development auto-restart |
| Morgan | 1.10.1 | HTTP request logging |

---

## Project Structure

HCLTech/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx        # Patient/Provider login
│   │   │   ├── Register.jsx         # User registration
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Profile/
│   │   │   │   └── PatientProfile.jsx  # Profile management & health info
│   │   │   ├── Dashboard/
│   │   │   │   └── PatientDashboard.jsx # Patient dashboard
│   │   │   ├── GoalTracker/
│   │   │   │   └── GoalTracker.jsx     # Health goal tracking
│   │   │   └── Public/
│   │   │       └── healt-info.jsx      # Public health information
│   │   ├── App.jsx                  # Main app component with routes
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.css                  # Global app styles
│   │   └── index.css                # Base styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express backend application
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # MongoDB connection
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # Authentication endpoints
│   │   │   ├── patient.route.js     # Patient endpoints
│   │   │   ├── provider.route.js    # Healthcare provider endpoints
│   │   │   └── public.route.js      # Public endpoints
│   │   ├── models/                  # Mongoose schemas
│   │   └── middleware/              # Authentication & validation
│   ├── index.js                     # Express server entry point
│   ├── package.json
│   └── .env.example                 # Environment configuration template
│
└── README.md                        # This file

---

## Features

### Patient Features
- ✅ User Registration & Login - Secure authentication with JWT
- ✅ Profile Management - View and edit personal & health information
  - Personal details (name, email, phone, DOB, gender)
  - Health information (blood type, height, weight, medical conditions)
  - Allergies and current medications tracking
  - Emergency contact information
- ✅ Health Dashboard - Overview of health status and activities
- ✅ Goal Tracker - Set and track personal health goals
- ✅ Public Health Information - Access to health resources and information

### Provider Features
- 🔲 Healthcare provider management endpoints (ready for expansion)

### Public Features
- 🔲 Public health information access

---

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm installed
- MongoDB running locally or remote connection string
- Cloudinary account (for image uploads)

### Environment Variables

Create a .env file in the server directory: