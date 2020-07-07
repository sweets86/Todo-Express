const express = require('express')
const app = express()

let todos = []

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.get('/todos/:id', (req, res) => {

    const paramId = req.params.id
    res.json(paramId)
    res.render('/todos/:id')

    res.json('Hittar inte')

})

app.post('/todos', (req, res) => {
    console.log(req.body.todo)
    todos.push(req.body.todo)
    res.json("Ny todo")
})

app.put('/todos/:id', (req, res) => {
    let newTodo = req.body.todo
    let todo = req.body.newTodo
    let editTodo = req.params.id

    let findTodo = todos.findIndex((todo) => todo == newTodo)

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


/* let findTodo = todos.length

    for (let i = 0; i < todos.length; i++) {
        let findTodo = todos[i]

        if (findTodo = findTodo[i]) {
            findTodo = newTodo
        }

        if (findTodo[""] = todo) {
            todo = newTodo
        }

        if (newTodo == editTodo) {
            todo = newTodo
        }
        todos[0] = newTodo

    } */