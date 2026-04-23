# Student Team Members Management Application

A full-stack web application for managing student team members with their profiles, roles, contact information, and profile pictures.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Team Members](#team-members)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Home Page**: Welcome interface with navigation to add and view members
- **Add Member**: Form to add new team members with profile image upload
- **View Members**: Display all team members in a responsive card grid layout
- **Search & Filter**: Search members by name, register number, or role
- **Member Details**: View detailed information about each team member
- **Image Upload**: Secure file upload using Multer with validation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Form Validation**: Client-side and server-side validation
- **MongoDB Integration**: Persistent data storage with Mongoose ODM

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
assignment3/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.js             # Home page component
│   │   │   ├── AddMember.js        # Add member form
│   │   │   ├── ViewMembers.js      # Members list with search
│   │   │   ├── MemberDetails.js    # Member detail view
│   │   │   └── pages.css           # Pages styling
│   │   ├── App.js                  # Main app component with routing
│   │   ├── App.css                 # App styling
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── package.json                # Frontend dependencies
│   └── .env                        # Frontend environment variables
│
├── server/                          # Express Backend
│   ├── models/
│   │   └── Member.js               # Mongoose schema
│   ├── routes/
│   │   └── memberRoutes.js         # API routes
│   ├── uploads/                    # Uploaded images directory
│   ├── server.js                   # Express server setup
│   ├── package.json                # Backend dependencies
│   └── .env                        # Backend environment variables
│
├── README.md                        # Project documentation
└── .gitignore                       # Git ignore file
```

## 📦 Installation

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

### Step 1: Clone/Setup Project
```bash
cd assignment3
```

### Step 2: Install Backend Dependencies
```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. **MongoDB Connection**
   - Ensure MongoDB is running locally on `mongodb://localhost:27017`
   - Or update `MONGODB_URI` in `server/.env`

2. **Environment Variables** (`server/.env`)
   ```env
   MONGODB_URI=mongodb://localhost:27017/student-team-members
   PORT=5000
   NODE_ENV=development
   ```

### Frontend Configuration

1. **API URL** (`client/.env`)
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## 🚀 Running the Application

### Start MongoDB
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or start MongoDB manually
mongod
```

### Start Backend Server
```bash
cd server
npm start
# Server will run on http://localhost:5000
```

### Start Frontend Development Server (in another terminal)
```bash
cd client
npm start
# Frontend will open at http://localhost:3000
```

## 📡 API Endpoints

### Members Endpoints

#### 1. **Add New Member**
```
POST /api/members
Content-Type: multipart/form-data

Request Body:
{
  "name": "John Doe",
  "role": "Frontend Developer",
  "registerNumber": "REG001",
  "email": "john@example.com",
  "contactNumber": "9876543210",
  "image": <file>
}

Response:
{
  "success": true,
  "message": "Member added successfully",
  "data": {
    "_id": "ObjectId",
    "name": "John Doe",
    "role": "Frontend Developer",
    "registerNumber": "REG001",
    "email": "john@example.com",
    "contactNumber": "9876543210",
    "image": "/uploads/image-filename.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### 2. **Get All Members**
```
GET /api/members

Response:
{
  "success": true,
  "data": [
    {
      "_id": "ObjectId",
      "name": "John Doe",
      "role": "Frontend Developer",
      "registerNumber": "REG001",
      "email": "john@example.com",
      "contactNumber": "9876543210",
      "image": "/uploads/image-filename.jpg",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### 3. **Get Member by ID**
```
GET /api/members/:id

Response:
{
  "success": true,
  "data": {
    "_id": "ObjectId",
    "name": "John Doe",
    "role": "Frontend Developer",
    "registerNumber": "REG001",
    "email": "john@example.com",
    "contactNumber": "9876543210",
    "image": "/uploads/image-filename.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### 4. **Health Check**
```
GET /api/health

Response:
{
  "success": true,
  "message": "Server is running"
}
```

## 👥 Team Members

Add your team members following this format in the app:

| No. | Name | Register Number | Role | Email | Contact |
|-----|------|-----------------|------|-------|---------|
| 1 | [Member Name] | [REG###] | [Role] | [email@example.com] | [10-digit] |
| 2 | [Member Name] | [REG###] | [Role] | [email@example.com] | [10-digit] |
| 3 | [Member Name] | [REG###] | [Role] | [email@example.com] | [10-digit] |

**Note**: Replace placeholders with actual team member information through the application UI.

## 📝 Form Validation

### Add Member Form Validation

| Field | Validation |
|-------|-----------|
| Full Name | Required, minimum 1 character |
| Role | Required, minimum 1 character |
| Register Number | Required, must be unique |
| Email | Required, valid email format |
| Contact Number | Required, exactly 10 digits |
| Profile Image | Optional, accepts JPG, PNG, GIF, WebP (max 5MB) |

## 🎨 Styling

The application features:
- **Modern UI Design**: Gradient colors and smooth transitions
- **Responsive Grid Layout**: Adapts to all screen sizes
- **Card-based Components**: Clean presentation of data
- **Form Styling**: Professional input fields with validation feedback
- **Mobile Friendly**: Touch-friendly buttons and layouts

## 🔍 Features in Detail

### Home Page
- Welcome message and team introduction
- Quick navigation buttons to Add and View members
- Features list
- Professional layout with centered content

### Add Member Page
- **Form Fields**:
  - Full Name (text input)
  - Role (text input)
  - Register Number (text input, unique)
  - Email (email input with validation)
  - Contact Number (tel input, 10 digits)
  - Profile Image (file upload, optional)
- **Validation**: Real-time client-side and server-side validation
- **Image Preview**: Show uploaded image before submission
- **Success Message**: Confirmation after successful addition
- **Auto-redirect**: Redirects to members list after successful submission

### View Members Page
- **Search Functionality**: Filter by name, register number, or role
- **Card Layout**: Display members in responsive grid
- **Member Card Shows**:
  - Profile image (or placeholder)
  - Full name
  - Role
  - Register number
  - "View Details" button
- **Add Member Button**: Quick access to add new members
- **Empty State**: Message when no members exist

### Member Details Page
- **Complete Information**:
  - Profile image (large display)
  - Full name
  - Role
  - Register number
  - Email (clickable link)
  - Contact number (clickable phone link)
  - Join date
- **Navigation Buttons**:
  - Back to Members
  - Add Another Member

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Ensure MongoDB is running
- Check MongoDB URI in `server/.env`
- Verify MongoDB port is 27017

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
- Kill the process using port 5000: `lsof -ti:5000 | xargs kill -9`
- Or change PORT in `server/.env`

### Image Upload Not Working
- Check `server/uploads/` directory exists
- Verify file size is under 5MB
- Ensure file type is an image (JPG, PNG, GIF, WebP)

### CORS Errors
**Solution**:
- Frontend `.env` has correct API URL
- Backend CORS is properly configured
- Ensure both servers are running

### Frontend Can't Connect to Backend
**Solution**:
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `client/.env`
- Check network connectivity

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Axios Documentation](https://axios-http.com/)
- [React Router Documentation](https://reactrouter.com/)

## output
<img width="1470" height="956" alt="Screenshot 2026-04-23 at 11 12 28 PM" src="https://github.com/user-attachments/assets/f4a91fd7-32d8-47eb-bb1e-efe63a145219" />
<img width="1470" height="956" alt="Screenshot 2026-04-23 at 11 14 52 PM" src="https://github.com/user-attachments/assets/0414553b-cc9e-40f5-befa-96a112c2ce6b" />

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💼 Support

For issues or questions, please refer to the troubleshooting section or check the console logs for detailed error messages.

---

**Last Updated**: April 2024  
**Version**: 1.0.0
