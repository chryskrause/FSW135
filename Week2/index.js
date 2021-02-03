const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/storedb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)

app.use("/store", require("./routes/storeRouter"))

app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})

app.listen(5108, ()=> {
    console.log("port 5108 is waiting")
})