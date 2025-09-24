# PRISM - Polytechnic Report and Information Managment System

This is a complete full-stack web application with a **Spring Boot 3** backend and a **React.js** frontend. The project offers a secure, multi-user portal for managing academic data, including students, staff, departments, exams, and results.

The system includes a secure JWT-based authentication system for both "Student" and "Staff" user roles and provides a full set of CRUD (Create, Read, Update, Delete) operations for nine core database entities.

## Features

* **Secure JWT Authentication:** A full login and registration system using Spring Security and JSON Web Tokens (JWT).
* **Role-Based Registration:** Different registration processes for **Students** (requiring a Registration No.) and **Staff** (requiring a professional role).
* **Protected Dashboard:** All data management pages are secure and accessible only by authenticated users.
* **Full CRUD Functionality:** Complete Create, Read, Update, and Delete operations for all nine core entities.
* **Clean API Architecture:** Uses the **DTO (Data Transfer Object) Pattern** for all API communication, fully separating the backend entities from the frontend.
* **Automated Auth Handling:** Frontend API service uses an `axios` interceptor to automatically add the JWT auth token to every secure API request.
* **Centralized Error Handling:** A `GlobalExceptionHandler` on the backend delivers clean, predictable JSON error responses for all API errors.

## Tech Stack

| Backend | Frontend | Database |
| :--- | :--- | :--- |
| Spring Boot | React.js | MySQL |
| Spring Security | React Router DOM v6 | |
| Spring Data JPA (Hibernate) | Axios | |
| Java 17+ | CSS3 | |
| Maven | Node.js / npm | |
| JWT (jjwt library) | | |

## Project Architecture

This project uses a modern, decoupled architecture.

* **Backend:** A strong Spring Boot REST API. It follows a classic three-tier pattern:
    * `@RestController`: Handles all HTTP requests and routes.
    * `@Service`: Contains all business logic. All methods that write to the database are marked as `@Transactional`.
    * `@Repository`: Standard Spring Data JPA interfaces for database operations.
* **DTO Pattern:** The backend **never** exposes JPA entities directly through the API. All data is transferred using simple POJO DTOs (e.g., `StudentDTO`). This prevents serialization errors, lazy-loading exceptions, and infinite loops.
* **Frontend:** A React single-page application (SPA).
    * **Services:** All API communication takes place in `src/services/apiService.js`. This file has an `axios` interceptor that automatically adds the JWT from `localStorage` to every request.
    * **Routing:** Uses `react-router-dom` for navigation. A custom `<ProtectedRoute />` component protects the main dashboard, redirecting unauthenticated users to the login page.
    * **State:** Utilizes React Hooks (`useState`, `useEffect`) to manage component-level state. Data tables update instantly on the client side after successful Create, Update, or Delete operations.

## Setup and Installation

You need to run both the backend and frontend servers to use this application.

### 1. Backend (Spring Boot) Setup

1. **Prerequisites:** Java (JDK 17 or newer), Maven, and a running MySQL server.
2. **Database Setup:** Create a new, empty database in MySQL (e.g., `fsd_project_db`).
3. **Configure:** Open the `src/main/resources/application.properties` file and update it with your database credentials and a secure JWT secret:
    ```properties
    # Database Configuration
    spring.datasource.url=jdbc:mysql://localhost:3306/fsd_project_db
    spring.datasource.username=YOUR_MYSQL_USERNAME
    spring.datasource.password=YOUR_MYSQL_PASSWORD
    
    # This will create or update tables based on your entities. Use 'create' for a fresh start.
    spring.jpa.hibernate.ddl-auto=update

    # JWT Configuration (This key is a secure sample, you can use it)
    jwt.secret.key=ZDY4ZWE1ZWE4N2M1YjZlOGI4YjZkODU3Y2RhZDY0ZWM3ZDE2NDM3Y2ZkZjc4ZmM5ZWY3ODc3MGVlODNjYWVkMw==
    jwt.expiration.ms=86400000
    ```
4. **Install Dependencies:** Run `mvn clean install` to download all dependencies.
5. **Run:** Start the application by running the main `ProjectApplication.java` file or by using the command: `mvn spring-boot:run`.
    * The server will start on `http://localhost:8080`.

### 2. Frontend (React) Setup

1. **Prerequisites:** Node.js and npm.
2. **Navigate:** Open a terminal in the frontend project folder (the one containing `package.json`).
3. **Install Dependencies:**
    ```bash
    npm install
    ```
4. **Run:**
    ```bash
    npm start
    ```
    * The application will open automatically in your browser at `http://localhost:3000`.

## API Endpoints

The backend provides a full REST API.

#### Authentication API (Public)
* `POST /api/auth/register` - Creates a new Student or Staff account.
* `POST /api/auth/login` - Authenticates a user and returns a JWT.

#### Main API (Protected by JWT)
All main data routes start with `/api/v1` and offer full CRUD functionality.
* `/api/v1/students`
* `/api/v1/departments`
* `/api/v1/semesters`
* `/api/v1/staff`
* `/api/v1/subjects`
* `/api/v1/assessments`
* `/api/v1/exams`
* `/api/v1/examresults`
*
