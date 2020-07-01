

window.onload = main

function main() {
    const div = document.querySelector('div')

    const formDiv = document.createElement('div')
    formDiv.classList = "form"

    const input = document.createElement('input')

    const buttonAdd = document.createElement('button')
    buttonAdd.classList = "button"
    buttonAdd.innerHTML = "Lägg till Todo"
    buttonAdd.onclick = function () {
        addNewTodo(input.value)
        input.value = ""
    }

    const button = document.createElement('button')
    button.classList = "button"
    button.innerHTML = "Lista alla Todo"
    button.onclick = function () {
        getAllTodos()
    }

    div.append(formDiv)
    formDiv.append(input)
    formDiv.append(buttonAdd)
    formDiv.append(button)

}

async function getAllTodos() {
    const allTodos = await makeRequest('/todos', 'GET')
    console.log(allTodos)

    const div = document.querySelector('div')
    let listDiv = document.createElement('div')
    listDiv.classList = "form"

    for (let i = 0; i < allTodos.length; i++) {
        let todos = allTodos[i]

        if (todos != "") {

            let item = document.createElement('p')
            item.innerText = todos
            console.log(todos)

            const removeButton = document.createElement('button')
            removeButton.classList = "button"
            removeButton.innerHTML = "Ta bort Todo"
            removeButton.onclick = function () {
                removeTodo(todos, item, listDiv)
            }

            item.append(removeButton)
            listDiv.append(item)
            div.append(listDiv)
        }
    }
}

function printTodo(todo) {
    let div = document.getElementById('container')
    div.classList = "formList"

    if (todo != "") {

        let li = document.createElement('h4')
        li.classList = "h4"
        li.innerText = todo
        console.log(todo)

        const removeButton = document.createElement('button')
        removeButton.classList = "button"
        removeButton.innerHTML = "Ta bort Todo"
        removeButton.onclick = function () {
            removeTodo(todo, li)
        }

        const viewButton = document.createElement('button')
        viewButton.classList = "button"
        viewButton.innerHTML = "Se Todo"
        viewButton.onclick = function () {
            viewTodo(todo)
        }

        div.append(li)
        li.append(removeButton)
        li.append(viewButton)
    }
}

function addNewTodo(todo) {
    if (todo != "") {
        console.log(todo)
        makeRequest('/todos', 'POST', { todo })
    }

    printTodo(todo)
}

function viewTodo(todo) {
    console.log('Specifik', todo)

    makeRequest('/todos/' + todo, 'GET')
}

function removeTodo(todo, item, div) {
    console.log('Specifik ta bort', todo)

    makeRequest('/todos/' + todo, 'DELETE')

    item.innerText = ""
    if (item.innerText = "") {
        div.innerText = ""
    }
}


async function makeRequest(url, reqMethod, body) {

    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: reqMethod,
        body: JSON.stringify(body)
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data // return skickar med data så den kan användas vidare
}