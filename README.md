# KINEXT

_**Academic MVP:** This project was developed during my Web Application Development studies as an AI-assisted full-stack prototype. My role focused on defining the product idea, guiding the implementation, integrating the main pieces, testing the application and documenting the technical architecture._

All-in-one fitness platform MVP combining AI-assisted exercise analysis, biomechanical metrics, workout tracking and a personal trainer marketplace.

> **Project status:** KINEXT was developed as an academic MVP during my Web Application Development studies. It was deployed on an AWS EC2 instance for testing and classroom presentation, but the live server is currently offline because the EC2 instance was removed after the demo to keep cloud resources available for other projects.

---

## Overview

KINEXT is a full-stack fitness platform prototype designed to help users analyze exercise technique, track workouts and connect with personal trainers.

The project combines a modern Astro frontend, a Strapi CMS/backend and a separate FastAPI service for AI-powered video analysis. Users can upload exercise videos, select the relevant time range, receive AI-generated feedback and, depending on their plan, access additional biomechanical metrics extracted with MediaPipe.

This project was built as an academic MVP, focusing on architecture, integration between services, dynamic content, user flows and applied AI experimentation.

---

## Main Features

- AI-assisted video analysis for exercise technique feedback.
- Video upload flow with selected start/end time range.
- Google Gemini integration for exercise feedback generation.
- MediaPipe-based biomechanical metrics for Pro users.
- User plans: Free, Premium and Pro.
- MVP login/register flow using Strapi content collections.
- Workout tracking with exercises, sets, repetitions and weight.
- User profile with recent workouts and analysis history.
- Personal trainer marketplace.
- Dynamic blog powered by Strapi.
- Contact form stored through the backend.
- Dynamic CMS content for plans, FAQs, testimonials and site configuration.

---

## Tech Stack

### Frontend

- Astro 5
- Tailwind CSS
- JavaScript / TypeScript inside Astro pages
- GSAP
- noUiSlider

### Backend / CMS

- Strapi 5
- SQLite
- Strapi Users & Permissions plugin
- Custom content types for users, trainers, workouts, plans, blog posts, FAQs, testimonials and analysis results

### AI Service

- FastAPI
- Google Gemini API
- MediaPipe
- OpenCV
- NumPy
- HTTPX

### Original Deployment

- AWS EC2
- Nginx
- PM2

---

## Architecture

```txt
kinext/
├── frontend/      # Astro frontend
├── backend/       # Strapi CMS and API
└── ai-service/    # FastAPI service for AI/video analysis
```

### Frontend

The frontend handles the user interface, navigation, public pages and client-side flows such as login, workout registration, video upload and profile rendering.

Main pages include:

- Home
- Login / Register
- AI analysis
- Workout tracking
- User profile
- Plans
- Trainer marketplace
- Blog
- Contact

### Backend

The backend is built with Strapi and acts as the CMS/API layer for the platform.

Main content types include:

- Users
- Trainers
- Plans
- Exercises
- Workout records
- Workout sets
- AI analysis results
- Blog articles
- FAQs
- Testimonials
- Contact messages
- Site configuration

### AI Service

The AI service is a separate FastAPI application responsible for processing uploaded videos.

Main flow:

1. The user uploads a video from the frontend.
2. The user selects the exercise and the relevant time range.
3. The video is sent to the FastAPI service.
4. Google Gemini generates exercise feedback.
5. If the user has a Pro plan, MediaPipe extracts biomechanical metrics.
6. The analysis result is saved back into Strapi.

---

## AI Analysis Flow

KINEXT uses two different approaches depending on the user plan.

### Premium Analysis

Premium users receive AI-generated feedback based on the uploaded exercise video and the selected time range.

### Pro Analysis

Pro users receive AI-generated feedback plus additional biomechanical metrics calculated with MediaPipe, such as:

- Knee angle
- Hip angle
- Squat depth estimation
- Bilateral symmetry
- Knee valgus detection
- Eccentric and concentric tempo estimation

The analysis is experimental and was created for academic demonstration purposes. It is not intended to replace professional coaching, medical evaluation or certified biomechanical assessment.

---

## Repository Structure

```txt
frontend/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs

backend/
├── config/
├── src/
│   ├── api/
│   └── components/
├── package.json
└── .env.example

ai-service/
├── main.py
├── analisis_gemini.py
├── analisis_mediapipe.py
├── prompts.py
└── requirements.txt
```

---

## Local Development

This repository contains the source code of the project, but it does not include private environment files, local database files or uploaded media assets.

Those files are intentionally excluded from GitHub for security and repository hygiene.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run develop
```

### AI Service

```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Environment Variables

The project requires local environment variables for Strapi and the AI service.

Examples of excluded files:

```txt
backend/.env
ai-service/.env
```

These files are not included in the repository because they may contain private configuration, API keys or deployment-specific values.

---

## Current Limitations

This project was built as an academic MVP, so some parts were intentionally simplified:

- The live deployment is currently offline.
- Some frontend API URLs were originally configured for the deployed domain.
- Authentication and plan access were implemented as MVP logic for demonstration purposes.
- The local Strapi database and uploaded media files are not included in the public repository.
- A production version would require hardened authentication, stronger access control, environment-based API URLs, persistent production storage and a more robust deployment setup.

---

## What I Learned

Through this project I practiced:

- Building a full-stack web application with separate frontend, backend and AI service layers.
- Integrating Astro with a headless CMS.
- Creating custom Strapi content types and relationships.
- Handling dynamic content for pages, plans, blogs and marketplace data.
- Building video upload and analysis flows.
- Connecting FastAPI with external AI services.
- Experimenting with MediaPipe for biomechanical metrics.
- Deploying a multi-service application on AWS EC2 using Nginx and PM2.
- Managing MVP scope, technical limitations and demo-oriented development.

---

## Academic Context

KINEXT was developed as a Web Application Development academic project.

The goal was not to create a production-ready commercial fitness product, but to design and build a functional MVP that demonstrated:

- Full-stack architecture.
- Dynamic content management.
- User flows.
- AI service integration.
- Video-based analysis.
- Deployment of a real web application for presentation.
