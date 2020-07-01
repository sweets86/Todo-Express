const express = require('express')
const app = express()

let todos = []

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.get('/todos/:id', async (req, res) => {
    try {
        const paramId = await req.params.id
        res.json(paramId)
        res.render('/todos/:id')
    } catch {
        res.json('Hittar inte')
    }
})

app.post('/todos', (req, res) => {
    console.log(req.body.todo)
    todos.push(req.body.todo)
    res.json("Ny todo")
})

app.put('/todos/:id', (req, res) => {
    res.json("Uppdaterad todo")
})

app.delete('/todos/:id', async (req, res) => {

    try {
        const paramId = await req.params.id
        todos.splice(paramId, 1)
        res.json("Borttagen")
    } catch {
        res.json('Hittar inte')
    }
})

module.exports = app