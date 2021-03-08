const express = require("express")
const app = express()
require('dotenv').config()
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/rockthevote', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, () => console.log("Connected to database"))

    app.use("/user", require("./routes/authRouter"))
    app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['RS256'] }))
    app.use('/api/todo', require('./routes/todoRouter'))

    app.use((err, req, res, next) => {
        console.log(err)
        if(err.name === "UnauthorizedError"){
            res.status(err.status)
        }
        return res.send({errMsg: err.message})
      })

      app.listen(8811, ()=> {
        console.log("port 8811 is waiting")
    })