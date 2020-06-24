const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

let todos = [
    "städa", "handla", "träna", "laga mat"
]

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.get('/todos/:id', (req, res) => {
    res.json("En specifik todo")
})

app.post('/todos', (req, res) => {
    console.log(req.body)
    todos.push(req.body)
    res.json("Ny todo")
})

app.put('/todos/:id', (req, res) => {
    res.json("Uppdaterad todo")
})

app.delete('/todos/:id', (req, res) => {
    res.json("Borttagen todo")
})






app.listen(3000, 'localhost', () => {
    console.log("Server at port 3000")
})