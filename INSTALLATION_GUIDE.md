# Complete Installation & Setup Guide

## 🎯 Objective
Set up and run the "Student Team Members Management Application" on your local machine.

---

## 📋 Pre-Requirements Check

Before you start, ensure you have:

### Required Software
- [ ] **Node.js** v14 or higher
  - Check: `node --version`
  - Download: https://nodejs.org/
  
- [ ] **npm** (comes with Node.js)
  - Check: `npm --version`
  
- [ ] **MongoDB** Community Edition
  - Check: `mongod --version`
  - Download: https://www.mongodb.com/try/download/community

- [ ] **Git** (optional, for version control)
  - Check: `git --version`
  - Download: https://git-scm.com/

### System Requirements
- [ ] At least 500 MB free disk space
- [ ] Internet connection (for npm installations)
- [ ] Text editor or IDE (VS Code recommended)

---

## ⚙️ Step-by-Step Installation

### Step 1: Verify Node.js Installation

Open terminal and run:
```bash
node --version
npm --version
```

Expected output:
```
v18.x.x or higher
9.x.x or higher
```

If not installed, download and install from https://nodejs.org/

---

### Step 2: Set Up MongoDB

#### macOS with Homebrew:
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify MongoDB is running
brew services list
```

#### macOS Manual Installation:
```bash
# Download from https://www.mongodb.com/try/download/community
# Follow installation wizard
# Start MongoDB manually:
mongod
```

#### Linux (Ubuntu/Debian):
```bash
# Install MongoDB
sudo apt-get update
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongodb

# Enable on startup
sudo systemctl enable mongodb

# Verify
sudo systemctl status mongodb
```

#### Windows:
1. Download MongoDB installer from: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Install MongoDB as a Service"
4. Follow the wizard
5. MongoDB will start automatically

---

### Step 3: Navigate to Project Directory

```bash
cd /Users/vkdushyanthreddy/Documents/assignment3
```

Verify you're in the correct location:
```bash
ls -la
# Should show: README.md, QUICK_START.md, client/, server/, .gitignore
```

---

### Step 4: Install Backend Dependencies

```bash
# Navigate to server directory
cd server

# Install npm packages
npm install
```

Expected output:
```
added X packages in Xm
up to date in Xs
```

Wait for completion (this may take 2-3 minutes).

---

### Step 5: Verify Backend Configuration

Check the `.env` file:
```bash
cat .env
```

Expected content:
```
MONGODB_URI=mongodb://localhost:27017/student-team-members
PORT=5000
NODE_ENV=development
```

**Note**: If MongoDB is on different host/port, update `MONGODB_URI`

---

### Step 6: Start MongoDB (if not already running)

In a new terminal:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Verify MongoDB is running
brew services list

# Test MongoDB connection
mongosh
# Type: exit
```

---

### Step 7: Start Backend Server

In the terminal where you installed backend dependencies:
```bash
npm start
```

Expected output:
```
✓ Server running on http://localhost:5000
✓ API Base URL: http://localhost:5000/api
✓ MongoDB connected successfully
```

**Leave this terminal open**. The server is now running!

---

### Step 8: Install Frontend Dependencies (New Terminal)

Open a new terminal window:
```bash
# Navigate to client directory
cd /Users/vkdushyanthreddy/Documents/assignment3/client

# Install npm packages
npm install
```

Expected output:
```
added Y packages in Xm
up to date in Xs
```

Wait for completion (this may take 2-3 minutes).

---

### Step 9: Verify Frontend Configuration

Check the `.env` file:
```bash
cat .env
```

Expected content:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Step 10: Start Frontend Server

In the terminal where you installed frontend dependencies:
```bash
npm start
```

Expected output:
```
Compiled successfully!

You can now view student-team-members-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

Browser will automatically open. If not:
- **Manually open**: http://localhost:3000

---

## ✅ Verification Steps

Once both servers are running, verify everything works:

### 1. Check Home Page
- [ ] Page loads at http://localhost:3000
- [ ] See "Welcome to Team Management System"
- [ ] Two buttons visible: "Add Member" and "View Members"
- [ ] Features list is displayed

### 2. Test Add Member
- [ ] Click "Add Member" button
- [ ] Form appears with all fields
- [ ] Can fill form without errors
- [ ] Image upload preview works

### 3. Test API Endpoint
Open new terminal and run:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"success":true,"message":"Server is running"}
```

---

## 🎮 First Time Usage

### Add Your First Team Member

1. **Go to Add Member Page**
   - URL: http://localhost:3000/add-member
   - Or click "Add Member" button on home page

2. **Fill Form**
   ```
   Full Name:        John Doe
   Role:             Frontend Developer
   Register Number:  REG001
   Email:            john@example.com
   Contact Number:   9876543210
   Profile Image:    [optional - select an image]
   ```

3. **Submit**
   - Click "Add Member" button
   - Success message appears
   - Redirected to View Members page

4. **View Members**
   - See member card with image
   - Click "View Details" to see full information
   - Use search to find members

---

## 🔄 Daily Workflow

### Every Time You Start Development

**Terminal 1 - MongoDB:**
```bash
brew services start mongodb-community
# or manually: mongod
```

**Terminal 2 - Backend:**
```bash
cd /Users/vkdushyanthreddy/Documents/assignment3/server
npm start
```

**Terminal 3 - Frontend:**
```bash
cd /Users/vkdushyanthreddy/Documents/assignment3/client
npm start
```

### When You're Done

**Stop Everything:**
```bash
# Terminal 2: Press Ctrl+C (Backend)
# Terminal 3: Press Ctrl+C (Frontend)
# Terminal 1: Stop MongoDB
brew services stop mongodb-community
```

---

## 📁 Project Structure After Installation

```
assignment3/
├── node_modules/                    [NOT shown - created by npm install]
├── README.md
├── QUICK_START.md
├── PROJECT_SUMMARY.md
├── .gitignore
│
├── client/
│   ├── node_modules/                [created by npm install]
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── pages/
│   │       ├── Home.js
│   │       ├── AddMember.js
│   │       ├── ViewMembers.js
│   │       ├── MemberDetails.js
│   │       └── pages.css
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── server/
    ├── node_modules/                [created by npm install]
    ├── models/
    │   └── Member.js
    ├── routes/
    │   └── memberRoutes.js
    ├── uploads/                     [stores uploaded images]
    │   └── .gitkeep
    ├── server.js
    ├── package.json
    ├── .env
    └── .gitignore
```

---

## 🐛 Troubleshooting

### Problem: MongoDB Connection Error

**Error Message:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
1. Check if MongoDB is running:
   ```bash
   brew services list
   # Should show: mongodb-community started
   ```

2. Start MongoDB:
   ```bash
   brew services start mongodb-community
   ```

3. Check MongoDB URI in `server/.env`:
   ```bash
   cat server/.env
   # MONGODB_URI should be: mongodb://localhost:27017/student-team-members
   ```

---

### Problem: Port 5000 Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution 1 - Find and kill the process:**
```bash
# Find process using port 5000
lsof -ti:5000

# Kill it
kill -9 <PID>
# or
lsof -ti:5000 | xargs kill -9
```

**Solution 2 - Change port:**
```bash
# Edit server/.env
PORT=5001

# Restart backend server
npm start
```

---

### Problem: Port 3000 Already in Use

**Error Message:**
```
Something is already running on port 3000.
```

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or restart frontend
# Press Ctrl+C in frontend terminal
# Run: npm start
```

---

### Problem: npm install fails

**Error Message:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**
```bash
# Option 1: Use legacy peer deps
npm install --legacy-peer-deps

# Option 2: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Option 3: Update npm
npm install -g npm@latest
npm install
```

---

### Problem: Image Upload Not Working

**Symptoms:** Image not saving in uploads folder

**Solutions:**
1. Check uploads folder exists:
   ```bash
   ls -la server/uploads/
   # Should show: .gitkeep
   ```

2. Check file permissions:
   ```bash
   chmod 755 server/uploads/
   ```

3. Ensure file is valid image:
   - Accept formats: JPG, PNG, GIF, WebP
   - Max size: 5MB

4. Check file path in API response

---

### Problem: CORS Errors in Browser Console

**Error Message:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions:**
1. Verify both servers are running
2. Check `REACT_APP_API_URL` in `client/.env`:
   ```bash
   cat client/.env
   # Should be: REACT_APP_API_URL=http://localhost:5000/api
   ```
3. Restart frontend:
   ```bash
   # Press Ctrl+C
   npm start
   ```

---

### Problem: Frontend Can't Connect to Backend

**Symptoms:** Error messages when trying to add/view members

**Solutions:**
1. Verify backend is running:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. Check API URL in frontend `.env`

3. Check browser console for errors (F12)

4. Restart both servers

---

## 🔍 Testing Commands

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Get All Members
```bash
curl http://localhost:5000/api/members
```

### View MongoDB Data
```bash
mongosh
use student-team-members
db.members.find().pretty()
exit
```

---

## 📊 Development Workflow

### Making Changes

**Backend Changes:**
1. Edit files in `server/`
2. If using nodemon, server auto-restarts
3. Test with curl or frontend

**Frontend Changes:**
1. Edit files in `client/src/`
2. Save file - auto-recompiles
3. Refresh browser (Cmd+R)

### Debugging

**Frontend (Chrome DevTools):**
```
Press F12 → Console tab
Check for errors and network calls
```

**Backend (Terminal):**
```
Check server terminal output
Look for error messages
```

**MongoDB (mongosh):**
```bash
mongosh
use student-team-members
db.members.find()
```

---

## 📚 Next Steps

1. **Review Documentation**:
   - Read [README.md](./README.md) for full details
   - Check [QUICK_START.md](./QUICK_START.md) for quick reference
   - See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for overview

2. **Try All Features**:
   - Add multiple team members
   - Upload different images
   - Search and filter members
   - View detailed information

3. **Customize** (Optional):
   - Change colors in CSS files
   - Add more fields to form
   - Modify validation rules
   - Add delete/edit functionality

4. **Deploy** (Advanced):
   - Build frontend: `npm run build`
   - Deploy to Heroku, Vercel, or your server
   - Use Atlas MongoDB for production
   - Configure environment variables

---

## 🆘 Getting Help

### Check These Resources
1. See troubleshooting section above
2. Review console logs (F12 in browser, terminal output)
3. Check README.md for detailed information
4. Visit package documentation:
   - Express: https://expressjs.com/
   - React: https://react.dev/
   - Mongoose: https://mongoosejs.com/
   - Axios: https://axios-http.com/

### Common Issues Checklist
- [ ] MongoDB is running: `brew services list`
- [ ] Both servers are running: Check terminal output
- [ ] Frontend can reach backend: Check browser console
- [ ] No port conflicts: `lsof -i :5000` and `lsof -i :3000`
- [ ] .env files configured correctly
- [ ] All dependencies installed: `npm install` completed

---

## ✨ Success Indicators

You'll know everything is set up correctly when:

✅ Backend terminal shows:
```
✓ Server running on http://localhost:5000
✓ MongoDB connected successfully
```

✅ Frontend terminal shows:
```
Compiled successfully!
You can now view student-team-members-frontend in the browser.
```

✅ Browser displays home page with:
- Welcome message
- Navigation buttons
- Features list

✅ You can:
- Add a member successfully
- View all members
- Search members
- View member details

---

## 🎉 You're All Set!

Congratulations! Your development environment is ready. Start building! 

**Quick Reference Commands:**
```bash
# Start MongoDB
brew services start mongodb-community

# Start Backend (Terminal 1)
cd server && npm start

# Start Frontend (Terminal 2)
cd client && npm start

# Stop everything when done
brew services stop mongodb-community
# Ctrl+C in both terminals
```

---

## 📞 Support

For issues:
1. Check troubleshooting section
2. Review error messages carefully
3. Check console logs
4. Restart servers
5. Clear browser cache (Cmd+Shift+Delete)

**Happy Coding! 🚀**
