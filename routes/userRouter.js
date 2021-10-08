const express = require("express")
const userRouter = express.Router()
const User = require("../models/user.js")

userRouter.get("/", (req, res, next) => {
    User.find((err, users) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users)
    })
})
userRouter.get("/userId", (req, res, next) => {
    User.findOne({ _id: req.params.userId }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})

module.exports = userRouter