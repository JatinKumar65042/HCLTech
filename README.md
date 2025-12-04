🏥 Healthcare Wellness & Preventive Care Portal – README.md
Healthcare Wellness & Preventive Care Portal
A full‑stack MERN application that helps patients manage wellness goals, track daily activity, maintain preventive care reminders, and enables healthcare providers to monitor assigned patients and their compliance.

🚀 Table of Contents
Project Overview

Features

Tech Stack

System Architecture

Models

API Routes

Frontend Pages

Setup Instructions

Environment Variables

Folder Structure

Future Enhancements

📌 Project Overview
This Healthcare Wellness & Preventive Care Portal is designed for patients and healthcare providers.
It enables:

Patients → to track wellness goals, log daily activities, manage their health profile, and receive preventive checkup reminders.

Providers → to view assigned patients, monitor compliance, and access detailed progress summaries.

This project was built as part of an HCLTech assessment, adhering to requirements like secure authentication, privacy, role-based access, and preventive care integration.

⭐ Features
🔐 Secure Authentication System
JWT‑based authentication

Login and Registration for both Patients & Providers

Password hashing

Consent checkbox during registration

🧍‍♂️ Patient Features
Patient Dashboard
Steps, Sleep, Water Intake, Active Time progress

Preventive care reminders (Ex: “Annual Blood Test on 24 Dec”)

Health Tip of the Day

Profile Management
View & edit profile

Upload patient details (allergies, medications, address, Aadhar, photo)

Goal Tracker
Log daily:

Steps

Water Intake

Sleep Hours

Active Minutes

View past logs

Preventive Care
Annual blood test reminders

Other medical reminders

🩺 Healthcare Provider Features
Provider Dashboard
View assigned patients

Compliance status:

Goal Met

Missed Preventive Checkup

Pending

Clickable patient list to view details

View patient goals, logs, and medical profile

Provider Tools
Assign patient → provider

Ensure one patient is not assigned to multiple providers

Mark compliance manually

🌍 Public Health Information Page
Static health topics

Privacy policy

Health Tip of the Day API

🧰 Tech Stack
Frontend
React.js

React Router

Context API / LocalStorage auth

Backend
Node.js

Express.js

JWT Authentication

Bcrypt

Database
MongoDB

Mongoose ORM

🏗️ System Architecture
React Frontend  →  Express API  →  MongoDB
      ↑                ↓
   JWT Auth ↔ Role Permissions
🗄️ Models
1️⃣ User Model
Fields:

name

age

email

phone

address

aadharCard

photoUrl

role → patient | provider

stepsGoal, activeTimeGoal, sleepGoal, waterGoal

annualBloodTestDate

allergies, medications

healthcareProvider (Ref)

complianceStatus

password (hashed)

consent

2️⃣ DailyLog Model
userId

date

steps

waterLitres

sleepHours

activeMinutes

goalsMet

3️⃣ Reminder Model
userId

title

dueDate

completed

🔌 API Routes
🔐 Auth Routes
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
👤 Patient Routes
GET    /api/patient/profile
PUT    /api/patient/profile
GET    /api/patient/wellness      // dashboard summary
POST   /api/patient/logs          // add daily log
GET    /api/patient/logs          // fetch logs
GET    /api/patient/reminders
POST   /api/patient/reminders
🩺 Provider Routes
POST  /api/provider/assign
GET   /api/provider/patients
GET   /api/provider/patients/:id
PUT   /api/provider/patients/:id/compliance
🌍 Public Routes
GET /api/public/health-info
GET /api/public/tip
GET /api/public/privacy-policy
🎨 Frontend Pages
Patient Pages
/login

/register

/patient/dashboard

/patient/profile

/patient/profile/edit

/patient/goals

/patient/reminders

Provider Pages
/provider/dashboard

/provider/patient/:id

Public Pages
/health-info

/privacy

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/yourrepo/healthcare-portal.git
cd healthcare-portal
2️⃣ Install backend dependencies
cd backend
npm install
3️⃣ Install frontend dependencies
cd frontend
npm install
4️⃣ Start backend
npm run dev
5️⃣ Start frontend
npm start
🔐 Environment Variables
Create a .env file in /backend:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUD_STORAGE_KEY=optional
📁 Folder Structure
backend/
  models/
  routes/
  controllers/
  middleware/
  utils/
  config/
  server.js

frontend/
  src/
    pages/
    components/
    context/
    api/
    styles/
🚀 Future Enhancements
Mobile app version

Real-time health notifications

Integration with wearables

Graphical analytics dashboard

Provider chat system

