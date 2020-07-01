

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

    let listDiv = document.getElementById('div')
    listDiv.classList = "formList"
    listDiv.innerText = ""

    for (let i = 0; i < allTodos.length; i++) {
        let todos = allTodos[i]

        if (todos != "") {

            let item = document.createElement('p')
            item.innerText = todos
            item.classList = "p"
            console.log(todos)

            const removeButton = document.createElement('button')
            removeButton.classList = "button"
            removeButton.innerHTML = "Ta bort"
            removeButton.onclick = function () {
                removeTodo(todos, item, listDiv)
            }

            listDiv.append(item)
            item.append(removeButton)
        }
    }
}

function printTodo(todo) {

    if (todo != "") {
        let div = document.getElementById('container')
        div.classList = "formList"

        let list = document.createElement('h4')
        list.classList = "h4"
        list.innerText = todo
        console.log(todo)

        const removeButton = document.createElement('button')
        removeButton.classList = "button"
        removeButton.innerHTML = "Ta bort Todo"
        removeButton.onclick = function () {
            removeTodo(todo, list)
        }

        const viewButton = document.createElement('button')
        viewButton.classList = "button"
        viewButton.innerHTML = "Se Todo"
        viewButton.onclick = function () {
            viewTodo(todo)
        }

        div.append(list)
        list.append(removeButton)
        list.append(viewButton)
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

function removeTodo(todo, item, listDiv) {
    console.log('Specifik ta bort', todo)

    makeRequest('/todos/' + todo, 'DELETE')

    item.remove()
    if (item.innerText = "" ) {
        listDiv.remove()
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