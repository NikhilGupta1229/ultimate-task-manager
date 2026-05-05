
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const projectRoutes = require('./routes/projects');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

app.get('/api/dashboard', async (req,res)=>{
  const Task = require('./models/Task');
  const total = await Task.countDocuments();
  const completed = await Task.countDocuments({status:'done'});
  const pending = await Task.countDocuments({status:'pending'});
  res.json({total, completed, pending});
});

app.listen(process.env.PORT || 5000, ()=>console.log("Server running"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));