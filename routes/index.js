const express = require('express')
const app = express()

let todos = []

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.get('/todos/:id', (req, res) => {

    const paramId = req.params.id
    if (paramId) {
        res.json(paramId)
    } else {
        res.json('Hittar inte')
    }

})

app.post('/todos', (req, res) => {

    let todo = req.body.todo

    if (todo != "" && todo != null) {
        console.log(req.body.todo)
        todos.push(req.body.todo)
        res.json("Ny todo")
    } else {
        res.json("Inga todos")
    }
})

app.put('/todos/:id', (req, res) => {
    let oldTodo = req.body.todo
    let todo = req.body.newTodo
    let editTodo = req.params.id

    let findTodo = todos.findIndex((todo) => todo == oldTodo)

    if (findTodo == -1) {
        res.status(404).json({ status: "matchar inte" })
    } else {
        todos[findTodo] = todo
        res.json(todos)
    }

})

app.delete('/todos/:id', (req, res) => {

    const paramId = req.params.id

    let findTodo = todos.findIndex((todo) => todo == paramId)

    if (findTodo == -1) {
        res.status(404).json({ status: "matchar inte" })
    } else {
        todos.splice(findTodo, 1)
        res.json("Borttagen")
    }

})

module.exports = app