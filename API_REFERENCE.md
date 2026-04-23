# API Reference Guide

## Overview

Complete API documentation for Student Team Members Management Application backend.

**Base URL**: `http://localhost:5000/api`  
**Port**: 5000  
**Environment**: Development  
**Content-Type**: `application/json` (and `multipart/form-data` for file uploads)

---

## 📡 Authentication & Headers

Currently, the API does not require authentication. In future implementations, JWT tokens can be added.

### Standard Headers
```
Content-Type: application/json
```

### File Upload Headers
```
Content-Type: multipart/form-data
```

---

## 🏥 Health Check Endpoint

### GET /api/health

Check if the server is running and healthy.

**Request:**
```bash
curl -X GET http://localhost:5000/api/health
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Server is running"
}
```

**Usage**: Check server status before making other API calls.

---

## 👥 Members Endpoints

### POST /api/members - Add New Member

Create a new team member with profile information and optional image.

**Endpoint:**
```
POST /api/members
Content-Type: multipart/form-data
```

**Request Parameters:**
| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| name | string | Yes | Full name of member | "John Doe" |
| role | string | Yes | Member's role/position | "Frontend Developer" |
| registerNumber | string | Yes | Unique register number | "REG001" |
| email | string | Yes | Email address | "john@example.com" |
| contactNumber | string | Yes | 10-digit phone number | "9876543210" |
| image | file | No | Profile image (JPG, PNG, GIF, WebP, max 5MB) | [file] |

**Request Example (using curl):**
```bash
curl -X POST http://localhost:5000/api/members \
  -F "name=John Doe" \
  -F "role=Frontend Developer" \
  -F "registerNumber=REG001" \
  -F "email=john@example.com" \
  -F "contactNumber=9876543210" \
  -F "image=@/path/to/profile.jpg"
```

**Request Example (using JavaScript/Axios):**
```javascript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('role', 'Frontend Developer');
formData.append('registerNumber', 'REG001');
formData.append('email', 'john@example.com');
formData.append('contactNumber', '9876543210');
formData.append('image', imageFile);

axios.post('http://localhost:5000/api/members', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Member added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "role": "Frontend Developer",
    "registerNumber": "REG001",
    "email": "john@example.com",
    "contactNumber": "9876543210",
    "image": "/uploads/image-1629814400000-123456789.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "__v": 0
  }
}
```

**Error Response (400 Bad Request) - Validation Error:**
```json
{
  "success": false,
  "message": "Email is already registered"
}
```

**Validation Rules:**
- **name**: Required, 1-100 characters
- **role**: Required, 1-100 characters
- **registerNumber**: Required, unique, 1-50 characters
- **email**: Required, valid email format
- **contactNumber**: Required, 10 digits only
- **image**: Optional, max 5MB, image files only

**Status Codes:**
| Code | Meaning |
|------|---------|
| 201 | Member created successfully |
| 400 | Validation error or duplicate register number |
| 500 | Server error |

---

### GET /api/members - Get All Members

Retrieve a list of all team members.

**Endpoint:**
```
GET /api/members
```

**Request Parameters:**
None (future version may support query filters)

**Request Example:**
```bash
curl -X GET http://localhost:5000/api/members
```

**Request Example (Axios):**
```javascript
axios.get('http://localhost:5000/api/members')
  .then(response => {
    console.log(response.data.data);
  });
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "role": "Frontend Developer",
      "registerNumber": "REG001",
      "email": "john@example.com",
      "contactNumber": "9876543210",
      "image": "/uploads/image-1629814400000-123456789.jpg",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "role": "Backend Developer",
      "registerNumber": "REG002",
      "email": "jane@example.com",
      "contactNumber": "9876543211",
      "image": "/uploads/image-1629814500000-987654321.jpg",
      "createdAt": "2024-01-15T10:35:00Z",
      "updatedAt": "2024-01-15T10:35:00Z"
    }
  ]
}
```

**Empty Response (200 OK) - No members:**
```json
{
  "success": true,
  "data": []
}
```

**Error Response (500 Server Error):**
```json
{
  "success": false,
  "message": "Error fetching members"
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Whether request was successful |
| data | array | Array of member objects |
| data._id | string | MongoDB ObjectId |
| data.name | string | Member name |
| data.role | string | Member role |
| data.registerNumber | string | Register number |
| data.email | string | Email address |
| data.contactNumber | string | Phone number |
| data.image | string | Image URL path |
| data.createdAt | string | Creation timestamp (ISO 8601) |
| data.updatedAt | string | Last update timestamp (ISO 8601) |

**Status Codes:**
| Code | Meaning |
|------|---------|
| 200 | Successfully retrieved all members |
| 500 | Server error |

---

### GET /api/members/:id - Get Member by ID

Retrieve detailed information about a specific team member.

**Endpoint:**
```
GET /api/members/:id
```

**URL Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| id | string | MongoDB ObjectId of member | "507f1f77bcf86cd799439011" |

**Request Example:**
```bash
curl -X GET http://localhost:5000/api/members/507f1f77bcf86cd799439011
```

**Request Example (Axios):**
```javascript
const memberId = '507f1f77bcf86cd799439011';
axios.get(`http://localhost:5000/api/members/${memberId}`)
  .then(response => {
    console.log(response.data.data);
  });
```

**Request Example (React Router - from URL):**
```javascript
import { useParams } from 'react-router-dom';

function MemberDetails() {
  const { id } = useParams();
  // id will be: 507f1f77bcf86cd799439011
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "role": "Frontend Developer",
    "registerNumber": "REG001",
    "email": "john@example.com",
    "contactNumber": "9876543210",
    "image": "/uploads/image-1629814400000-123456789.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "__v": 0
  }
}
```

**Not Found Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Member not found"
}
```

**Invalid ID Response (500 Server Error):**
```json
{
  "success": false,
  "message": "Cast to ObjectId failed for value \"invalid-id\""
}
```

**Status Codes:**
| Code | Meaning |
|------|---------|
| 200 | Member found and retrieved |
| 404 | Member with given ID not found |
| 500 | Server error (invalid ID format) |

---

## 📊 Response Format

All API responses follow a standard format:

**Success Response:**
```json
{
  "success": true,
  "message": "Optional message",
  "data": {
    // Response data here
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

---

## 🔐 Validation Rules

### Email Validation
- Format: `user@example.com`
- Regex: `/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/`
- Must be unique in database

### Register Number Validation
- Must be unique
- 1-50 characters
- Cannot contain special characters

### Contact Number Validation
- Exactly 10 digits
- Only numbers
- No spaces or special characters

### Image Upload Validation
- Allowed types: JPEG, PNG, GIF, WebP
- Maximum size: 5 MB (5242880 bytes)
- Stored in: `/uploads/` folder
- Filename format: `image-[timestamp]-[random].ext`

---

## 🔗 Image URLs

Uploaded images are accessible via:

```
http://localhost:5000/uploads/image-filename.jpg
```

**Example:**
```
http://localhost:5000/uploads/image-1629814400000-123456789.jpg
```

In React frontend, use:
```javascript
<img src={`http://localhost:5000${member.image}`} alt={member.name} />
```

---

## 📈 Database Schema

### Member Collection

```javascript
{
  _id: ObjectId,                    // Auto-generated
  name: String,                     // Required, indexed
  role: String,                     // Required
  registerNumber: String,           // Required, Unique, indexed
  email: String,                    // Required, Unique, indexed, email format
  contactNumber: String,            // Required
  image: String,                    // Optional, file path
  createdAt: Date,                  // Auto-generated timestamp
  updatedAt: Date,                  // Auto-updated timestamp
  __v: Number                       // Mongoose version field
}
```

### Indexes
- `_id`: Primary key
- `registerNumber`: Unique index
- `email`: Unique index

---

## 🔄 Status Codes Summary

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST request (member added) |
| 400 | Bad Request | Validation failed, missing fields, duplicate register number |
| 404 | Not Found | Member ID doesn't exist |
| 500 | Server Error | Database error, server crash, invalid ObjectId format |

---

## 🚀 Common Use Cases

### 1. Add a New Member (Complete Flow)

```javascript
const addMember = async (memberData, imageFile) => {
  const formData = new FormData();
  formData.append('name', memberData.name);
  formData.append('role', memberData.role);
  formData.append('registerNumber', memberData.registerNumber);
  formData.append('email', memberData.email);
  formData.append('contactNumber', memberData.contactNumber);
  if (imageFile) {
    formData.append('image', imageFile);
  }

  try {
    const response = await axios.post(
      'http://localhost:5000/api/members',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    if (response.data.success) {
      console.log('Member added:', response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.error('Error:', error.response?.data?.message);
  }
};
```

### 2. Fetch All Members

```javascript
const fetchMembers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/members');
    
    if (response.data.success) {
      const members = response.data.data;
      console.log('Members:', members);
      return members;
    }
  } catch (error) {
    console.error('Error:', error.response?.data?.message);
  }
};
```

### 3. Fetch Single Member

```javascript
const fetchMemberById = async (memberId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/members/${memberId}`
    );
    
    if (response.data.success) {
      const member = response.data.data;
      console.log('Member:', member);
      return member;
    }
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('Member not found');
    } else {
      console.error('Error:', error.response?.data?.message);
    }
  }
};
```

### 4. Search Members (Client-side)

```javascript
const searchMembers = async (searchTerm) => {
  try {
    const response = await axios.get('http://localhost:5000/api/members');
    
    if (response.data.success) {
      const members = response.data.data;
      const filtered = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filtered;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 🧪 Testing with Postman

### Import this Postman Collection

1. Open Postman
2. Create requests for each endpoint
3. Test with provided examples

**Health Check Request:**
```
GET http://localhost:5000/api/health
```

**Get All Members Request:**
```
GET http://localhost:5000/api/members
```

**Get Member Request:**
```
GET http://localhost:5000/api/members/[paste_member_id_here]
```

**Add Member Request (Form-data):**
```
POST http://localhost:5000/api/members

Form-data:
- name: John Doe
- role: Frontend Developer
- registerNumber: REG001
- email: john@example.com
- contactNumber: 9876543210
- image: [select file]
```

---

## 🔗 API Endpoints Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/health | Check server status |
| POST | /api/members | Add new member |
| GET | /api/members | Get all members |
| GET | /api/members/:id | Get member details |

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Responses always include `success` field
- Error messages are user-friendly
- Images are served from `/uploads` directory
- Database: MongoDB (local: `mongodb://localhost:27017/student-team-members`)

---

## 🔮 Future Enhancements

Planned API features:
- [ ] PUT /api/members/:id - Update member
- [ ] DELETE /api/members/:id - Delete member
- [ ] Authentication with JWT
- [ ] Pagination for large datasets
- [ ] Advanced filtering and sorting
- [ ] Member statistics endpoints

---

## 📞 Support

For API issues:
1. Check request format matches examples
2. Verify all required fields are provided
3. Check response status codes
4. Review error messages
5. Verify MongoDB is running
6. Check server logs in terminal

---

**API Version**: 1.0.0  
**Last Updated**: April 2024
