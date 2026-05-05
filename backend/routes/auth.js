
const router=require('express').Router();
const jwt=require('jsonwebtoken');
const User=require('../models/User');

router.post('/signup', async(req,res)=>{
 const u=await User.create(req.body);
 res.json(u);
});

router.post('/login', async(req,res)=>{
 const u=await User.findOne(req.body);
 if(!u) return res.status(401).send("Invalid");
 const token=jwt.sign({id:u._id,role:u.role},process.env.JWT_SECRET);
 res.json({token});
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "_id email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


module.exports=router;
