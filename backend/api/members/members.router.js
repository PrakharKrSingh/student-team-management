import express from 'express';
import multer from 'multer';
import { 
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
} from './members.controller.js';

const router = express.Router();

// Using memory storage for multer (we'll convert to base64)
const storage = multer.memoryStorage();

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  },
  fileFilter: fileFilter
});

// Process uploaded file to base64
function processFileMiddleware(req, res, next) {
  if (!req.file) {
    return next();
  }
  
  // Convert file buffer to base64 string
  const imageBase64 = req.file.buffer.toString('base64');
  
  // Create a data URL that can be used directly in img src
  const mimeType = req.file.mimetype;
  req.body.profileImage = `data:${mimeType};base64,${imageBase64}`;
  
  next();
}

// Define routes
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.post('/', upload.single('profileImage'), processFileMiddleware, createMember);
router.put('/:id', upload.single('profileImage'), processFileMiddleware, updateMember);
router.delete('/:id', deleteMember);

export default router;