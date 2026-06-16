import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://codecraftersivanesh_db_user:Asdfghjkl@cluster0.cf3dmls.mongodb.net/?appName=Cluster0';

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Copy default profile avatar from client assets to server uploads if available
const defaultAvatarSource = path.join(__dirname, '..', 'client', 'src', 'assets', 'profile_avatar.jpg');
const defaultAvatarDest = path.join(uploadsDir, 'profile_avatar.jpg');
if (fs.existsSync(defaultAvatarSource) && !fs.existsSync(defaultAvatarDest)) {
  fs.copyFileSync(defaultAvatarSource, defaultAvatarDest);
}

// Serve uploaded static files
app.use('/uploads', express.static(uploadsDir));

// Configure Multer for image file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// MongoDB Connection Setup
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    seedProjects(); // Seed initial database projects if empty
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Please ensure your local MongoDB service is running or check your connection string.');
  });

// Mongoose Schema & Model definition
const projectSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  svgPreset: String,
  imagePath: String,
  githubUrl: String
});

const Project = mongoose.model('Project', projectSchema);

// Seed default initial projects if collection is empty
const seedProjects = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      const defaultProjects = [
        {
          tag: "Flask Website",
          title: "Netflix Clone.",
          type: "svg",
          svgPreset: "netflix"
        },
        {
          tag: "Database Website",
          title: "Login and Signin page.",
          type: "svg",
          svgPreset: "database"
        },
        {
          tag: "billing Web app Website",
          title: "OwnBillBook",
          type: "svg",
          svgPreset: "billing"
        },
        {
          tag: "Portfolio Website",
          title: "Sivanesh Portfolio.",
          type: "image",
          imagePath: "/uploads/profile_avatar.jpg"
        }
      ];
      await Project.insertMany(defaultProjects);
      console.log('Default projects database collection seeded.');
    }
  } catch (err) {
    console.error('Error seeding default projects collection:', err);
  }
};

// API Endpoints
// GET all projects from MongoDB
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error retrieving projects from MongoDB:', error);
    res.status(500).json({ error: 'Failed to retrieve projects from database' });
  }
});

// POST a new project to MongoDB
app.post('/api/projects', async (req, res) => {
  try {
    const { tag, title, type, svgPreset, imagePath, githubUrl } = req.body;
    
    if (!tag || !title || !type) {
      return res.status(400).json({ error: 'Tag, title and type are required' });
    }

    const newProject = new Project({ tag, title, type, svgPreset, imagePath, githubUrl });
    await newProject.save();

    res.status(201).json({ message: 'Project saved to MongoDB successfully', project: newProject });
  } catch (error) {
    console.error('Error saving project to MongoDB:', error);
    res.status(500).json({ error: 'Failed to save project to database' });
  }
});

// DELETE a project from MongoDB
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully', project: deletedProject });
  } catch (error) {
    console.error('Error deleting project from MongoDB:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// POST to upload an image file
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Error uploading image file:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
