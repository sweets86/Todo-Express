const express = require('express')
const app = express()

let todos = [
    {
        title: "städa",
        id: "_f8vkr7fjp"
    },
]

function randomId () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

app.get('/todos', (req, res) => {
    res.json(todos)
})

app.get('/todos/:id', (req, res) => {

    const paramId = req.params.id

    const foundTodo = todos.find((todo) => todo.id == paramId)
    console.log(paramId)
    console.log(foundTodo)

    if (foundTodo) {
        res.json(foundTodo)
    } else {
        res.json('Hittar inte')
    }

})

app.post('/todos', (req, res) => {

    let todo = req.body
    todo.id = randomId()

    if (todo != "" && todo != null) {
        console.log(req.body)
        todos.push(req.body)
        res.json({status: "Ny todo"})
    } else {
        res.json("Inga todos")
    }
})

app.put('/todos/:id', (req, res) => {

    const paramId = req.params.id

    let findTodoIndex = todos.findIndex((todo) => todo.id == paramId)

    if (findTodoIndex == -1) {
        res.status(404).json({ status: "matchar inte" })
    } else {
        req.findTodoIndex = findTodoIndex
        todos[req.findTodoIndex] = req.body
        res.json({status: "Todo uppdaterad"})
    }

})

app.delete('/todos/:id', (req, res) => {

    const paramId = req.params.id
    console.log(paramId)

    let findTodo = todos.findIndex((todo) => todo.id == paramId)

    console.log(findTodo)
    
    if (findTodo == -1) {
        res.status(404).json({ status: "matchar inte" })
    } else {
        todos.splice(findTodo, 1)
        res.json("Borttagen")
    }

})

module.exports = app