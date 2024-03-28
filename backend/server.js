require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const propertyRoute = require('./routes/propertyRoute')
const roommateRoute = require('./routes/roommateRoute')

const app = express()

app.use(cors());

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/property',propertyRoute)
app.use('/roommate',roommateRoute)

//rest api
app.get('/',(req,res)=>{
    res.send("<h1>Welcome to SplitIn app</h1>")
})

//connect to db
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    //listen for requests
    app.listen(process.env.PORT,()=>{
        console.log(`connected to db&listening on port ${process.env.PORT}`)
    })

})
.catch((err)=>{
    console.log(`${err}`)
})

