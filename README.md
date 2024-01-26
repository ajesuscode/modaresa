# ModaResa Appointments Callendar

## FullStack solution with

-   NestJS
-   Next.js (app router)
-   Fullcallendar Library
-   Shadcn UI

---

### Steps to start project locacly

1. **Clone the Repository**:

    - Open your terminal or command prompt.
    - Navigate to the directory where you want to store the project.
    - Run the following command to clone the repository:

        ```bash
        git clone <repository_url>
        ```

2. **Run backend**:

    - Change your working directory to the newly cloned project and go to modaresa_back:

        ```bash
        cd modaresa
        cd modaresa_back
        ```

    - Install backend dependencies:

        ```bash
        npm install
        ```

    - Rename `.env.example` file into `.env` leave the content as it is.
    - Run the backend server

        ```bash
        npm run start:dev
        ```

3. **Set Up the Frontend**:

    - Navigate to the frontend folder:

        ```bash
        cd ../modaresa_front
        ```

    - Install frontend dependencies:

        ```bash
        npm install
        ```

    - Replace `.env.example` file with `.env.local` and provide a server url `http://localhost:8000`

    - Run the frontend

        ```bash
        npm run dev
        ```

    - Open a web browser and access it at the specified URL (e.g., `http://localhost:3000`).

## 😀 Have a great review
