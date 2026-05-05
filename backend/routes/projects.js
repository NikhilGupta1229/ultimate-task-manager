const router = require('express').Router();
const Project = require('../models/Project');

// ✅ POST: Create a new project (Admin Only ideally, but we'll accept from frontend logic)
router.post('/', async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      assignedTo: req.body.assignedTo || [],
      dueDate: req.body.dueDate,
      status: 'todo'
    });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// ✅ GET: Fetch projects based on role
router.get('/', async (req, res) => {
  try {
    const role = req.headers.role;
    const userId = req.headers.userid;

    if (role === 'admin') {
      const projects = await Project.find();
      return res.json(projects);
    } else {
      // Member only sees projects where they are in the assignedTo array
      const projects = await Project.find({ assignedTo: userId });
      return res.json(projects);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// ✅ PUT: Update project status
router.put('/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

module.exports = router;
