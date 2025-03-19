# Note App

This is a simple note-taking application built with a FastAPI backend and a React frontend.

## Features

* **Create Notes:** Users can create new notes with a title and content.
* **Read Notes:** Users can view a list of all notes or view a single note in detail.
* **Update Notes:** Users can edit existing notes.
* **Delete Notes:** Users can delete notes.
* **Responsive Design:** The frontend is designed to work on various devices.
* **CORS Enabled:** The backend is configured to allow cross-origin requests from the frontend.

## Technologies Used

* **Backend:**
    * FastAPI
    * MongoDB (with Motor for asynchronous operations)
    * Python
* **Frontend:**
    * React (with Vite)
    * Tailwind CSS
    * Axios
    * React Router DOM
* **Database:**
    * MongoDB

## Prerequisites

* Python 3.7+
* Node.js 16+
* MongoDB

## Setup

### Backend

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd NoteApp/backend
    ```

2.  **Create a virtual environment (recommended):**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On macOS/Linux
    venv\Scripts\activate  # On Windows
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up MongoDB:**

    * Ensure MongoDB is running.
    * Set the `MONGO_URI` and `DATABASE_NAME` environment variables or update the default values in `backend/app/database/mongo.py`.

5.  **Run the backend:**

    ```bash
    uvicorn app.main:app --reload
    ```

### Frontend

1.  **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the frontend:**

    ```bash
    npm run dev
    ```

4.  **Open the application in your browser:**

    * The frontend will be available at `http://localhost:5173`.

## Environment Variables

### Backend

* `MONGO_URI`: The connection string for your MongoDB database. (e.g., `mongodb://localhost:27017`)
* `DATABASE_NAME`: The name of the MongoDB database. (e.g., `notes_db`)

## API Endpoints

### Notes

* `GET /notes/`: Get all notes.
* `GET /notes/{note_id}`: Get a single note by ID.
* `POST /notes/`: Create a new note.
* `PUT /notes/{note_id}`: Update an existing note.
* `DELETE /notes/{note_id}`: Delete a note.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License
