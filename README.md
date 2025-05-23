## 📸 Demo

> Insert screenshots or a Loom video link here  
> Example:  
> ![ashutosh](https://github.com/user-attachments/assets/237ef381-6f6c-4c97-b6e9-75b508ca8808)
)

---

🧠 MERN + LLM Full Stack Application

This is a full-stack web application built with the **MERN stack (MongoDB, Express, React, Node.js)** and integrated with a **Large Language Model (LLM)** to provide intelligent, AI-driven features.

## 🚀 Features

- 🔐 **User Authentication** with JWT
- 💬 **Conversational AI** powered by an LLM (e.g., OpenAI, Hugging Face Transformers)
- 📦 **RESTful API** built with Express and Node.js
- 📊 **MongoDB** for scalable NoSQL data storage
- ⚛️ **React Frontend** with responsive UI
- 🌐 **CORS & Proxy** setup for smooth client-server communication
- 🔄 Real-time updates / auto-refresh for AI-generated content

---

## 🛠️ Tech Stack

**Frontend:**  
- React  
- TailwindCSS / Material UI 
- Axios for API requests  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- LLM Integration (OpenAI API, Hugging Face, local models)  

---

## ⚙️ Installation

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- OpenAI API key or LLM server running

### Setup

```bash
# Clone the repository
git clone https://github.com/ashutoshpariharr/Ghibli-art
cd ghibli art

# Install backend dependencies
cd server
npm install

# Set environment variables
touch .env
# Add:
# MONGO_URI=your_mongo_connection_string
# OPENAI_API_KEY=your_openai_key
# JWT_SECRET=your_jwt_secret
# PORT=5000

# Start backend server
npm start

# Open new terminal for frontend
cd ../client
npm install
npm start
