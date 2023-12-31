const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

//REGISTER for account
router.post("/register", async (req, res) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash( req.body.password, salt );
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        role: req.body.role,
  
      });
       const user = await newUser.save();
       res.status(200).json(user);
  
  }catch(err) {
      res.status(500).json(err);
  }
  
  })
  
  
  //login for account
  router.post("/login", async (req, res) => {
  try{
  const user = await User.findOne({username: req.body.username})
  !user && res.status(400).json("wrong credentials");
  
  const validated = await  bcrypt.compare(req.body.password, user.password)
  !validated && res.status(400).json("wrong credentials");
  
  // const validatedrole = (req.body.role === user.role)
  
  // !validatedrole && res.status(400).json("wrong role");
  
  res.status(200).json(user);
  
  }catch(err){
    res.status(500).json(err);
  }
  
  })

module.exports = router;