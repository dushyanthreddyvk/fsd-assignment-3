# Quick Start Guide

## 🚀 Getting Started in 5 Steps

### Step 1: Start MongoDB
```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or manually start MongoDB
mongod
```

### Step 2: Install Backend Dependencies
```bash
cd /Users/vkdushyanthreddy/Documents/assignment3/server
npm install
```

**Expected output:**
```
added 150 packages in 2m
```

### Step 3: Start Backend Server (Terminal 1)
```bash
cd /Users/vkdushyanthreddy/Documents/assignment3/server
npm start
```

**Expected output:**
```
✓ Server running on http://localhost:5000
✓ API Base URL: http://localhost:5000/api
✓ MongoDB connected successfully
```

### Step 4: Install Frontend Dependencies (Terminal 2)
```bash
cd /Users/vkdushyanthreddy/Documents/assignment3/client
npm install
```

**Expected output:**
```
added 250 packages in 3m
```

### Step 5: Start Frontend Server (Terminal 2)
```bash
cd /Users/vkdushyanthreddy/Documents/assignment3/client
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view student-team-members-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

---

## 🌐 Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

---

## 📝 Using the Application

### 1. **Home Page** (http://localhost:3000)
   - View welcome message
   - Click "➕ Add Member" or "👥 View Members"

### 2. **Add Member Page** (http://localhost:3000/add-member)
   - Fill in all required fields:
     - Full Name
     - Role (e.g., "Frontend Developer")
     - Register Number (e.g., "REG001")
     - Email
     - Contact Number (10 digits)
   - Upload a profile image (optional but recommended)
   - Click "Add Member"
   - You'll be redirected to View Members page

### 3. **View Members Page** (http://localhost:3000/view-members)
   - See all team members in card layout
   - Use search bar to filter members
   - Click "View Details" to see complete information
   - Click "Add New Member" to add another member

### 4. **Member Details Page** (http://localhost:3000/member/:id)
   - View complete member information
   - Click email to send email
   - Click phone number to make call
   - Use navigation buttons to go back or add new members

---

## 🔧 Terminal Commands Reference

### Run Both Servers Simultaneously (Optional)

**Terminal 1 - Backend:**
```bash
cd /Users/vkdushyanthreddy/Documents/assignment3/server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd /Users/vkdushyanthreddy/Documents/assignment3/client
npm start
```

### Rebuild Frontend
```bash
cd /Users/vkdushyanthreddy/Documents/assignment3/client
npm run build
```

### View MongoDB Data (Optional)
```bash
# Connect to MongoDB shell
mongosh

# Use the database
use student-team-members

# View all members
db.members.find().pretty()

# Count members
db.members.countDocuments()

# Exit
exit
```

---

## ✅ Verification Checklist

- [ ] MongoDB is running
- [ ] Backend server shows "MongoDB connected successfully"
- [ ] Frontend shows "Compiled successfully!"
- [ ] Browser opens at http://localhost:3000
- [ ] Can see Home page with navigation buttons
- [ ] Can navigate to Add Member page
- [ ] Can add a member successfully
- [ ] Can view all members on View Members page
- [ ] Can search and filter members
- [ ] Can view member details

---

## 🛑 Stopping the Application

1. **Stop Backend**: Press `Ctrl+C` in the backend terminal
2. **Stop Frontend**: Press `Ctrl+C` in the frontend terminal
3. **Stop MongoDB**:
   ```bash
   # macOS (Homebrew)
   brew services stop mongodb-community
   ```

---

## 🆘 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure `mongod` is running: `brew services start mongodb-community` |
| Port 5000 in use | Kill process: `lsof -ti:5000 \| xargs kill -9` |
| Port 3000 in use | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| npm install fails | Delete `node_modules` and `package-lock.json`, then run `npm install` again |
| Image upload not working | Ensure `server/uploads/` directory exists |
| CORS errors | Check that both servers are running and API URL is correct |

---

## 📚 Full Documentation

For detailed documentation, see [README.md](./README.md)

---

**Happy Coding! 🎉**
