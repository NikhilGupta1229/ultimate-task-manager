const router = require("express").Router();
const Task = require("../models/Task");

// ✅ GET tasks (role-based)
router.get("/", async (req, res) => {
  try {
    const role = req.headers.role;
    const userId = req.headers.userid;

    // Filter by projectId if provided
    const filter = {};
    if (req.query.projectId) {
      filter.projectId = req.query.projectId;
    }

    if (role === "admin") {
      const tasks = await Task.find(filter);
      return res.json(tasks);
    } else {
      filter.assignedTo = userId;
      const tasks = await Task.find(filter);
      return res.json(tasks);
    }
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// ✅ CREATE task (ADMIN ONLY)
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      status: "pending",
      assignedTo: req.body.assignedTo || "demo",
      projectId: req.body.projectId,
      dueDate: req.body.dueDate
    });

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Task creation failed" });
  }
});

// ✅ UPDATE task (user can mark done only for their own task)
router.put("/:id", async (req, res) => {
  try {
    const role = req.headers.role;
    const userId = req.headers.userid;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // 👤 USER → can only update their own task
    if (role !== "admin" && task.assignedTo !== userId) {
      return res.status(403).json({ error: "Not allowed" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Task update failed" });
  }
});

module.exports = router;