# GraphQL Profile

A React web application that uses a GraphQL API to authenticate users and display profile statistics through data visualizations.

The project was built as part of my software development studies to explore GraphQL, authentication, API consumption, data transformation, and frontend visualization.

## Features

- User authentication
- JWT-based authentication
- GraphQL API queries
- User profile information
- XP statistics
- Skills data
- Audit statistics
- Data visualizations
- Client-side routing

## Tech Stack

- React
- JavaScript
- TypeScript
- GraphQL
- JWT
- Recharts
- React Router
- CSS
- Lucide React

## Project Structure

```text
src/
├── components/
│   ├── profile/
│   └── ui/
├── css/
├── pages/
├── queries/
├── services/
│   └── graphqlService.js
├── utils/
│   └── authUtils.js
├── App.jsx
└── index.jsx

How It Works

The application authenticates the user and communicates with a GraphQL API to retrieve profile data.

The retrieved data is processed on the frontend and presented through profile sections and charts, including XP, skills, and audit statistics.

Getting Started
Prerequisites
Node.js
npm
Install dependencies
npm install
Start the development server
npm start

The application runs at:

http://localhost:3000
Create a production build
npm run build
Project Status

Completed academic project.

The project demonstrates practical experience with React, GraphQL API consumption, authentication, JWT handling, routing, data transformation, and frontend data visualization.
