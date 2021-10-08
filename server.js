const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")

app.use(express.json())
app.use(morgan("dev"))

mongoose.connect("mongodb://localhost:27017/moviesdb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    },
    () => ("connected to the database")
)

app.use("/movies", require("./routes/movieRouter.js"))
app.use("/shows", require("./routes/showRouter.js"))
// app.use("/users", require("./routes/userRouter.js"))
// app.use("/buys", require("./routes/buyRouter.js"))

app.use((err, req, res, next) => {
    return res.send({ errMsg: err.message})
})

app.listen(9000, () => {
    console.log("successfully running on port 9000")
})