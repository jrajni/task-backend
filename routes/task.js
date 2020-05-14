const router = require('express').Router()
const TaskSchema = require('../models/Taskmodel')
const verify = require('./verifyToken')
const User = require('../models/Usermodel')
const mongoose = require('mongoose')

router.get("/:id", async (req, res) => {
    try {
        const user = await TaskSchema.findOne({
            user_id: req.params.id
        })
        if (!user) {
            return res.status(400).json({ msg: "There is no such user exist" });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.post('/:id', async (req, res) => {
    let myid = mongoose.Types.ObjectId(req.params.id)
    const user = await User.findOne({
        _id: myid
    }
    );
    if (!user) {
        return res.status(400).json({ msg: "There is no user" });
    }
    const task = await TaskSchema.findOne({
        user_id: req.params.id
    })
    if (!task) {
        const task = new TaskSchema({
            user_id: req.params.id,
            task: req.body.task
        });
        try {
            const saveduser = await task.save()
            res.send({ user: saveduser })
        } catch (err) {
            res.status(400).send(err)
        }
    } else {
        let task = req.body.task
        const taskupdate = await TaskSchema.findOneAndUpdate({ user_id: req.params.id },
            { task: req.body.task },
            { new: true, upsert: true })
        console.log("update", taskupdate)
        try {
            return res.status(200).json(taskupdate);
        } catch (err) {
            res.status(400).send(err)
        }
    }


})

module.exports = router