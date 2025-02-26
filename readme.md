# Task Management Application

## 📌 Description
The **Task Management Application** is a drag-and-drop task manager that allows users to efficiently organize their tasks into three categories: **To-Do, In Progress, and Done**. The app provides a seamless experience with instant updates, persistence through a MongoDB backend, and authentication via Firebase.

## 🚀 Live Demo
[Live Application](#) *(Replace with your deployed link)*

## 📂 Features
- **User Authentication**: Google sign-in via Firebase.
- **Task Management**:
  - Add, edit, delete, and reorder tasks.
  - Categorize tasks into "To-Do", "In Progress", and "Done".
  - Drag-and-drop functionality for easy task organization.
- **Real-Time Updates**:
  - Instant database synchronization with MongoDB.
  - Tasks remain persistent even after refreshing the page.
- **Backend API**:
  - Built with Express.js & MongoDB.
  - Provides CRUD operations for task management.
- **Clean & Responsive UI**:
  - Modern, minimalistic design using React & Tailwind CSS.
  - Fully responsive for both desktop and mobile users.

## 🛠 Technologies Used
### Frontend:
- **Vite.js + React**
- **Tailwind CSS** (for styling)
- **React-beautiful-dnd** (for drag-and-drop functionality)
- **Firebase Authentication** (Google sign-in)

### Backend:
- **Node.js + Express.js**
- **MongoDB (via Mongoose)**
- **Cors, Dotenv, and Morgan** (middleware)

## 📡 API Endpoints
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| **POST** | `/tasks` | Add a new task |
| **GET** | `/tasks` | Retrieve all tasks for the logged-in user |
| **PUT** | `/tasks/:id` | Update task details (title, description, category) |
| **DELETE** | `/tasks/:id` | Delete a task |

## ⚡ Installation & Setup
### Backend Setup:
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env`):
   ```sh
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup:
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up Firebase authentication (replace in `.env` if needed).
4. Start the frontend:
   ```sh
   npm run dev
   ```

## 🎯 Folder Structure
```
/task-management-app
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│── README.md
```

## 📝 Notes
- Ensure that MongoDB is running before starting the backend.
- The frontend requires a valid Firebase configuration.

---

Now your **Task Management Application** is set up and ready to use! 🎉

