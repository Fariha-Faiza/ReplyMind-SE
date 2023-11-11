const router = require("express").Router();
const User = require("../models/Users");
const Information = require("../models/Information");
//give input of profile information


router.post("/info", async (req, res) => {
    const newPost = new Information(req.body);
    console.log("newPost", newPost);
    try {
      const savedPost = await newPost.save();

      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //get info by id
  router.get("/info/:id", async (req, res) => {
    try {
      const post = await Information.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  // router.get("/info/:id", async (req, res) => {
  // //  console.log('post', Post)
  //   try {                                                                                                                                                                                                                      
  //     const user = await Information.findById(req.params.id);
  
  //     if(Information.profession== null && Information.bio ==  null) {
  //       console.log("no info available");
  //     }
  //     console.log(Information.profession);
  //     const { password, ...others } = user._doc;
  //     res.status(200).json(others);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });


//update info by id 
  router.put("/info/:id", async (req, res) => {
    try {
     // const post = await Information.findById(req.params.id);
     
        try {
          const updatedPost = await Information.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      
    } catch (err) {
      res.status(500).json(err);
    }
  });

//delete info 
router.delete("/info/:id", async (req, res) => {
  try {
    const post = await Information.findById(req.params.id);
    
      try {
        await post.delete();
        res.status(200).json("info has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
   
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;