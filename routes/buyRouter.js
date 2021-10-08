const express = require("express")
const buyRouter = express.Router()
const Buy = require("../models/buy.js")

buyRouter.get("/", (req, res, next) => {
    Buy.find((err, buys) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(buys)
    })
})
buyRouter.get("/buyId", (req, res, next) => {
    Buy.findOne({ _id: req.params.buyId }, (err, buy) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(buy)
    })
})
buyRouter.post("/", (req, res, next) => {
    const newBuy = new Buy(req.body)
    newBuy.save((err, savedBuy) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedBuy)
    })
})
buyRouter.delete("/buyId", (req, res, next) => {
    Buy.findOneAndDelete({ _id: req.params.buyId }, (err, deletedBuy) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`successfully deleted ${deletedBuy.title}`)
    })
})
buyRouter.put("/buyId", (req, res, next) => {
    Buy.findOneAndUpdate({ _id: req.params.buyId }, req.body, {new: true}, (err, updatedBuy) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updatedBuy)
    })
})

module.exports = buyRouter