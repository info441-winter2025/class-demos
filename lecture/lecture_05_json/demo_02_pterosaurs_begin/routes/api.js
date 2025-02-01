import {promises as fs} from 'fs'
import express from 'express';
var router = express.Router();
 
router.get('/getDinos', async function(req, res) {
  const data = await fs.readFile("data/pterosaur.json")
  let pterosaurInfo = JSON.parse(data)
 
  // filter out any without images
  let filteredPterosaurInfo = pterosaurInfo.filter(onePterosaur => {
    if(onePterosaur.img != ""){
        return true
    }else{
        return false
    }
  })
 
  res.json(filteredPterosaurInfo);
});

export default router;

