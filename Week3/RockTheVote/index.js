const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/rockthevote', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }, () => console.log("Connected to database"))

    app.use("/user", require("./routes/userRouter"))

    app.use((err, req, res, next) => {
        console.log(err)
        return res.send({errMsg: err.message})
      })

      app.listen(8811, ()=> {
        console.log("port 8811 is waiting")
    })