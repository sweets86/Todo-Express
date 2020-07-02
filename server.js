const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

const indexRouter = require('./routes/index')

app.use('/', indexRouter)

app.listen(3000, 'localhost', () => {
    console.log("Server at port 3000")
})