const express = require('express')
const febesRouter = express.Router()
const { v4: uuidv4} = require('uuid')


const febes = [
    {
        title: "One Fake Data",
        _id: uuidv4()
    },
    {
        title: "Two Fake Data",
        _id: uuidv4()
    },
    {
        title: "Three Fake Data",
        _id: uuidv4()
    },
    {
        title: "Four Fake Data",
        _id: uuidv4()
    }

]

//GET ALL postman: localhost:3000/febes
febesRouter.get("/", (req, res)=>{
    res.send(febes)
})


//GET One postman: localhost:3001/febes/73b3fa6c-0012-40c6-b32a-e11d35d45eb8
febesRouter.get("/:febeId", (req, res) => {
    const febeId = req.params.febeId
    const foundFebe = febes.find(febe => febe._id === febeId)
    res.send(foundFebe)
})

//GET by title  postman: localhost:3001/febes/search/title?title=Two Fake Data
febesRouter.get("/search/title", (req, res)=> {
    const title = req.query.title
    const filteredFebes = febes.filter( febe => febe.title === title)
    res.send(filteredFebes)
})

//Post One postman: localhost:3001/febes  add body raw json
febesRouter.post("/", (req, res) => {
    const newFebe = req.body
    newFebe._id = uuidv4()
    febes.push(newFebe)
    res.send(`Successfully added ${newFebe.title} to the database!`)
})

//Delete One postman: localhost:3001/febes/73b3fa6c-0012-40c6-b32a-e11d35d45eb8
febesRouter.delete("/:febeId", (req, res) => {
    const febeId = req.params.febeId
    const febeIndex = febes.findIndex( febe => febe._id === febeId)
    febes.splice(febeIndex, 1)
    res.send("Successfully deleted febe!")
})

febesRouter.put("/:febeId", (req, res)=> {
    const febeId = req.params.febeId
    const updateObject = req.body
    const febeIndex = febes.findIndex(febe => febe._id === febeId)
    const updatedFebe = Object.assign(febes[febeIndex], updateObject)
    res.send(updatedFebe)

})

module.exports = febesRouter