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
    let newTodo = req.body.todo
    let editTodo = req.params.id 

    todos[0] = newTodo
    
    /* let findTodo = todos.length

    if (findTodo < 0) {
        todos[2] = newTodo
    } else if (findTodo > 1) {
        todos[1] = newTodo
    } else {
        todos[0] = newTodo
    } */

    res.json(todos)
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