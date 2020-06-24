window.onload = main

function main() {
    const div = document.querySelector('div')

    const formDiv = document.createElement('div')
    formDiv.classList = "form"

    const input = document.createElement('input')
    const todo = input.value
    input.value = ""

    const buttonAdd = document.createElement('button')
    buttonAdd.classList = "button"
    buttonAdd.innerHTML = "Lägg till Todo"
    buttonAdd.onclick = function () {
        addNewTodo(input.value)
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
    const listDiv = document.createElement('div')
    listDiv.classList = "form"

    for (let i = 0; i < allTodos.length; i++) {
        let todos = allTodos[i]

        const ul = document.createElement('ul')

        const li = document.createElement('li')
        li.innerText = todos
        console.log(todos)

        const removeButton = document.createElement('button')
        removeButton.classList = "button"
        removeButton.innerHTML = "Ta bort Todo"

        const viewButton = document.createElement('button')
        viewButton.classList = "button"
        viewButton.innerHTML = "Se Todo"

        listDiv.append(ul)
        ul.append(li)
        li.append(removeButton)
        li.append(viewButton)
        div.append(listDiv)
    }
}

function addNewTodo(todo) {
    console.log(todo)
}


async function makeRequest(url, reqMethod, todo) {

    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        method: reqMethod,
        body: JSON.stringify(todo)
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data // return skickar med data så den kan användas vidare
}