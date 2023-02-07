const express = require('express')
const app = express()

//middleware should end with next() or res.send()
//if the endpoint is removed it will fire on every

app.use(express.json())

app.use("/items", (req, res, next) =>{
    console.log("THE ITEMS MIDDLEWARE WAS EXECUTED")
    next()
})

app.get("/items", (req, res, next) =>{
    console.log("GET REQUEST RECIEVED")
    res.send("Hello World")
})
app.use("/febes", require("./routes/febesRouter.js"))


app.listen(3001, () => {
    console.log("The server is running on Port 3001")
})