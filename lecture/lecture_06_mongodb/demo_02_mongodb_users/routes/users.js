import express from 'express';
import {promises as fs} from 'fs';
var router = express.Router();

/* users POST */
router.post('/', async (req, res) =>{
  console.log(req.body);

try{
  const newUser = new req.models.User({
    name: req.body.name,
    icecream: req.body.icecream
  })

  await newUser.save()

  res.send("success")
} catch (error) {
  console.log("Error connecting to db", error)
  res.status(500).json({"status": "error", "error": error})
}

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let allUsers = await req.models.User.find()
    res.json(allUsers)
  } catch (error) {
    console.log("error connecting to db", error)
    res.status(500).json({"status": "error", "error": error})
  }
});
});

export default router;
