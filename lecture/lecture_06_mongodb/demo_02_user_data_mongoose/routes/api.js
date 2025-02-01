import express from 'express';
import {promises as fs} from 'fs';
import usersRouter from './users.js'

var router = express.Router();

router.use('/users', usersRouter);

/* GET api default. */
router.get('/', function(req, res, next) {
  res.send('respond with an api resource');
});

router.get('/getDinos', async function(req, res, next) {
    const data = await fs.readFile("data/pterosaur.json")
    let dinos = JSON.parse(data);
    const filteredDinos = dinos.filter(dino => dino.img)

    res.json(filteredDinos);
  });

export default router;
