const express = require('express')
const authRouter = express.Router()
const User = require('../models/userData')
const jwt = require('jsonwebtoken')

// Signup
authRouter.post("/signup", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
      if(err){
        res.status(500)
        return next(err)
      }
      if(user){
        res.status(403)
        return next(new Error("That username is already taken"))
      }
      const newUser = new User(req.body)
      newUser.save((err, savedUser) => {
        if(err){
          res.status(500)
          return next(err)
        }
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        return res.status(201).send({ token, user: savedUser.withoutPassword() })
      })
    })
  })

  // Login
authRouter.post("/login", (req, res, next) => {
  const failedLogin = 'Username or password is incorrect'
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
      if(err){
        res.status(500)
        return next(err)
      }
      if(!user){
        res.status(403)
        return next(new Error(failedLogin))
      }
      user.checkPassword(req.body.password, (err, isMatch) => {
        if(err){
          res.status(403)
          return next(new Error(failedLogin))
        }
        if(!isMatch) {
          res.status(403)
          return next(new Error(failedLogin))
        }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
      return res.status(200).send({ token, user: user.withoutPassword() })
    })
  })
})

  module.exports = authRouter







// //Get all/Read
// userRouter.get('/', (req, res, next) => {
//     User.find((err, users) => {
//       if(err){
//         res.status(500)
//         return next(err)
//       }
//       return res.status(200).send(users)
//     })
//   })

//   //Get one/Read
//   userRouter.get('/:userId', (req, res, next) => {
//       User.findById(req.params.userId, (err, user) =>{
//           if(err){
//               res.status(500)
//               return next(err)
//           }
//           return res.status(201).send(user)
//       })
//   })

//   //Post/create
//   userRouter.post("/", (req, res, next) => {
//     const newUser = new User(req.body)
//     newUser.save((err, savedUser) => {
//         if(err){
//             res.status(500)
//             return next (err)
//         }
//         return res.status(201).send(savedUser)
//     })
// })

// //Put/update
// userRouter.put("/:userId", (req, res, next) => {
//     User.findOneAndUpdate(
//         {_id: req.params.userId},
//         req.body,
//         {new:true},
//         (err, updatedUser) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(201).send(updatedUser)
//         }
//     )
// })

// //Delete
// userRouter.delete("/:userId", (req, res, next) => {
//     User.findOneAndDelete(
//         {_id: req.params.userId},
//         (err, deletedUser) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(`Successfully deleted item ${deletedUser.user} from the database.`)
//         }
//     )
// })


//   module.exports = userRouter