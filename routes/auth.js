const router = require('express').Router()
const User = require('../models/Usermodel')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('./validation')
const bcrypt = require('bcryptjs')
// validation

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const emailExists = await (User.findOne({ email: req.body.email }))
    if (emailExists) return res.status(400).send("Email already exist")

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,

    });
    try {
        const saveduser = await user.save()
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
})
router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //    check if email exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Email doesn't Exist")

    const validPassword = bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("invalid password")
    // create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET,
        {
            expiresIn: '24h'
        })
    res.header('auth-token', token).send({ token, user: user._id })

})

module.exports = router;
