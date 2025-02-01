import express from 'express';
import {promises as fs} from 'fs';
var router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body)

  await fs.writeFile("data/userData.json", JSON.stringify(req.body))

  res.send("success")
})

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let userInfo = await fs.readFile("data/userData.json")
  res.type("json")
  res.send(userInfo);
});

export default router;
