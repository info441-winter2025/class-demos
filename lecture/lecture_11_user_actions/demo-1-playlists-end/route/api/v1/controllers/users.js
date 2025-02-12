import express from 'express'
let router = express.Router()

router.get("/", async(req, res) => {
    try {
        let allUsers = await req.models.User.find()
        res.json(allUsers);
    } catch (err) {
        console.log("error from get route", err)
        res.status(500).json({status: "error"})
    }
})

router.post("/", async(req, res) => {
    try {
        const username = req.body.username;
        let newUser = new req.models.User({
            username: username
        })
        await newUser.save();
        res.json({status: "success"})
    } catch (err) {
        console.log("error", err)
        res.status(500).json({status: "error"})
    }
})

router.post('/bands', async(req, res) => {
    let userId = req.body.userId;
    let band = req.body.band;

    //TODO: come back and do error handling
    // fund the right user
    let user = await req.models.User.findById(userId);

    // update with the new band, if it wasn't already there
    if(!user.favorite_bands.includes(band)) {
        user.favorite_bands.push(band);
    }
    await user.save();
    res.json({status: "success"})
})

router.delete("/", async(req, res) => {
    try {
        console.log("deleting, ", req)

        let userId = req.body.userId;

        // delete all playlists for user, THEN delete user
        await req.models.Playlist.deleteMany({user: userId});
        await req.models.User.deleteOne({_id: userId});
        res.json({status: "success"})
    } catch (err) {
        console.log("error", err)
        res.status(500).json({status: "error"})
    }
})

export default router;