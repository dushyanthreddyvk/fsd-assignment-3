const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept image files only
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// POST - Add a new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, role, registerNumber, email, contactNumber } = req.body;

    // Validation
    if (!name || !role || !registerNumber || !email || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Check if register number already exists
    const existingMember = await Member.findOne({ registerNumber });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'Register number already exists',
      });
    }

    const memberData = {
      name,
      role,
      registerNumber,
      email,
      contactNumber,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const member = new Member(memberData);
    await member.save();

    res.status(201).json({
      success: true,
      message: 'Member added successfully',
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error adding member',
    });
  }
});

// GET - Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching members',
    });
  }
});

// GET - Get member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found',
      });
    }
    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching member',
    });
  }
});

module.exports = router;
