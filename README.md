## Realtime Chat Application

A realtime chat application built with **Node.js**, **Express**, **Socket.IO**, **MongoDB**, and **React**.

### Features

- Realtime private messaging using **Socket.IO**.
- Persistent chat history stored in **MongoDB**.
- User authentication and session management.
- Responsive UI built with **React** and **Material-UI**.

### Technologies Used

- **Backend:** Node.js, Express, MongoDB, Socket.IO.
- **Frontend:** React, Material-UI.
- **API Communication:** RTK Query

### Screeenshots
#### Home Page
![Screenshot 2024-11-23 at 10 11 49 AM](https://github.com/user-attachments/assets/45bf42dd-c329-4226-a69b-e47d177aa6e1)
#### Real Time Messaging
![Screenshot 2024-11-23 at 10 13 14 AM](https://github.com/user-attachments/assets/56320d89-4a75-40b4-a579-7e447b3f65c1)
![Screenshot 2024-11-23 at 10 13 19 AM](https://github.com/user-attachments/assets/173ea888-2afe-4a7c-a698-d20019e8260f)


#### LoginPage
![Screenshot 2024-11-23 at 10 03 44 AM](https://github.com/user-attachments/assets/4e3bd833-431c-436e-b474-a1aec07a1f36)
#### Register Page
![Screenshot 2024-11-23 at 10 03 59 AM](https://github.com/user-attachments/assets/64c390e9-1f62-4af7-b065-efdbee218b03)




### Prerequisites

- **Node.js** and **npm** installed.
- **MongoDB** running locally or in the cloud.
- `.env` file with the following variables:
```
PORT=3000
MONGO_URI=<your_mongodb_uri>
```
### Installation

**1. Clone the repository:**
 ```
 git clone https://github.com/srikriydv/chatApp-mern-socket.io-rtkquery-mui.git
 cd chatApp-mern-socket.io-rtkquery-mui
```
**2.	Install backend dependencies:**
```
cd backend
npm install
```

**3.	Install frontend dependencies:**
```
cd frontend
npm install
```

**4.	Setup environment variables:**
Create a **.env** file in the backend directory with your MongoDB connection string and desired port.

**5.	Run the application:**
•	Start the backend:
```
cd backend
npm run dev
```

•	Start the frontend:
```
cd frontend
npm run dev
```

**6.	Access the app:**
Open http://localhost:5173 in your browser.

**API Endpoints**

**•	User Routes:** /api/users
**•	Message Routes:** /api/messages

**Socket.IO Events**

•	**joinRoom:** Join a private chat room.
•	**sendMessage:** Send a message to a specific room.
•	**receiveMessage:** Receive messages in real-time.

**Directory Structure**
```
project/
├── backend/
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
└── README.md
```
