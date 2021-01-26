const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/storedb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log("Connected to the DB")
)



app.listen(5108, ()=> {
    console.log("port 5108 is waiting")
})