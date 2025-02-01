import express from 'express';
import {promises as fs} from 'fs';

var router = express.Router();

/* users POST */
router.post('/', async function(req, res, next) {
  console.log(req.body);
 // await fs.writeFile("data/userData.json", JSON.stringify(req.body))
try{
    const newUser = new req.models.User({
      name: req.body.name,
      icecream:req.body.icecream
    })
    await newUser.save()
    res.send('success');
} catch(err) {
    console.log(err)
    res.status(500).json({"status": "error"})
}
 
});

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // const userInfo = await fs.readFile("data/userData.json");
  // res.type("json")
  // res.send(userInfo);
  try{
    const allUsers = await req.models.User.find()
    res.json(allUsers)
  } catch(err){
     res.status(500);
  }
});

export default router;
