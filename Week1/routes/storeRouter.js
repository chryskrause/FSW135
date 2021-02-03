const express =  require("express")
const storeRouter = express.Router()
const Inventory = require("../models/inventory")


//get all
storeRouter.get("/", (req, res, next) => {
    Inventory.find((err, store) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(store)
    })
})

//POST
storeRouter.post("/", (req, res, next) => {
    const newInventory = new Inventory(req.body)
    newInventory.save((err, savedInventory) => {
        if(err){
            res.status(500)
            return next (err)
        }
        return res.status(201).send(savedInventory)
    })
})

//PUT
storeRouter.put("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndUpdate(
        {_id: req.params.inventoryId},
        req.body,
        {new:true},
        (err, updatedInventory) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedInventory)
        }
    )
})

//delete
storeRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete(
        {_id: req.params.inventoryId},
        (err, deletedInventory) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted item ${deletedInventory.item} from the database.`)
        }
    )
})

module.exports = storeRouter