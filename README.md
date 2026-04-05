# Zorvyn

Zorvyn is a finance dashboard project built with a `React` frontend and a `Node.js + Express + MongoDB` backend. The backend is designed around role-based access control, financial record management, and dashboard summary APIs for analytics-focused views.

This project is being developed as a backend-centered assignment, with the frontend currently kept minimal while the API and business logic are built out first.

## Project Structure

```text
Zorvyn/
  client/
    public/
    src/
  server/
    src/
      constants/
      controllers/
      middlewares/
      models/
      routes/
      utils/
    server.js
```

## Tech Stack

- Frontend: `React.js`
- Backend: `Node.js`, `Express.js`
- Database: `MongoDB`
- ODM: `Mongoose`
- Authentication: `JWT`
- Password Hashing: `bcrypt`
- Environment Variables: `dotenv`

## Current Backend Modules

- User registration and login
- Role-based user management
- Financial records CRUD and filtering
- Dashboard summary and trend APIs

## Roles

- `viewer`: can access dashboard-level data
- `analyst`: can view records and insights
- `admin`: can manage users and records

## API Overview

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Users

- `GET /api/users`
- `POST /api/users`

### Records

- `GET /api/records`
- `POST /api/records`
- `PUT /api/records/:id`
- `DELETE /api/records/:id`

Supported record filters:

- `type`
- `category`
- `startDate`
- `endDate`

Example:

```http
GET /api/records?type=income&category=salary&startDate=2026-04-01&endDate=2026-04-30
```

### Dashboard

- `GET /api/dashboard/summary`
- `GET /api/dashboard/recent-activity`
- `GET /api/dashboard/trends?period=monthly`
- `GET /api/dashboard/trends?period=weekly`

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/satyams2407/zorvyn.git
cd zorvyn
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/zorvyn
```

Run the backend:

```bash
node server.js
```

Or with nodemon:

```bash
npx nodemon server.js
```

### 3. Frontend setup

```bash
cd client
npm install
npm start
```

The React app runs on the default Create React App development server, and the backend runs on the port defined in `server/.env`.

## Technical Decisions and Trade-offs

### React for the frontend

React was chosen because it is simple to pair with a REST API and easy to extend into a dashboard UI.

Trade-off:
The frontend is intentionally minimal right now because the main focus of the project is backend architecture and business logic.

### Node.js and Express for the backend

Express was chosen because it allows quick API development and clean separation of routes, controllers, middlewares, and models.

Trade-off:
Express is flexible but unopinionated, so project structure and conventions must be maintained manually.

### MongoDB with Mongoose

MongoDB was selected because the project data is straightforward and document-based modeling works well for rapid development. Mongoose adds schema structure and query convenience.

Trade-off:
MongoDB is flexible, but it does not provide the same relational guarantees as a SQL database, so some consistency must be handled in application logic.

### JWT authentication

JWT is used because it works well for stateless APIs and integrates cleanly with middleware-based route protection.

Trade-off:
JWT is simple and scalable, but token invalidation is less direct than session-based authentication. User status checks help reduce this issue by blocking inactive accounts at the middleware layer.

### bcrypt for password hashing

Passwords are hashed before being stored so plain-text credentials are never saved in the database.

Trade-off:
Hashing adds small processing overhead during login and registration, but the security benefit is well worth it.

### Middleware-based access control

Role checks are handled through reusable middleware to keep authorization logic centralized and easy to apply at the route level.

Trade-off:
This works well for a small to medium project, but a larger system might eventually benefit from a more advanced policy-based authorization layer.

### MongoDB aggregation for dashboard APIs

Aggregation is used for summary-level analytics such as totals, recent activity, and trends.

Trade-off:
Aggregation is powerful and efficient for reporting, but the queries can become harder to maintain as dashboard requirements grow.

## Development Notes

- The backend is the primary focus of the current implementation.
- The frontend is still a lightweight shell and will be expanded as the API stabilizes.
- The codebase is organized to keep responsibilities separate and make future features easier to add.

## Future Improvements

- Complete remaining user-management endpoints such as role and status updates
- Improve validation and centralized error handling
- Add tests for auth, records, and dashboard summaries
- Add API documentation
- Expand the React dashboard UI

