

window.onload = main

function main() {
    const div = document.querySelector('div')

    const formDiv = document.createElement('div')
    formDiv.classList = "form"

    let input = document.createElement('input')
    input.id = "input"

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

    let ol = document.createElement('ol')
    
    for (let i = 0; i < allTodos.length; i++) {
        let todos = allTodos[i]

        if (todos != "") {

            let item = document.createElement('li')
            item.innerText = todos
            item.classList = "p"
            console.log(todos)

            /* const removeButton = document.createElement('button')
            removeButton.classList = "button"
            removeButton.innerHTML = "Ta bort"
            removeButton.onclick = function () {
                removeTodo(todos, item, listDiv)
            } */

            listDiv.append(ol)
            ol.append(item)
            /* item.append(removeButton) */
        }
    }
}

function printTodo(todo, newTodo) {

    if (todo != "") {
        let div = document.getElementById('container')
        div.classList = "formList"

        let list = document.createElement('h4')
        list.id = "h4"
        list.innerText = todo
        list.classList = "h4"

        const removeButton = document.createElement('button')
        removeButton.classList = "button"
        removeButton.innerHTML = "Ta bort Todo"
        removeButton.onclick = function () {
            removeTodo(todo, list, div)
        }

        const viewButton = document.createElement('button')
        viewButton.classList = "button"
        viewButton.innerHTML = "Ändra Todo"
        viewButton.onclick = function () {
            editTodo(todo)
            list.innerText = newTodo
            if (newTodo == undefined) {
                list.remove()
            }
            console.log(todo)
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

function editTodo(todo) {

    makeRequest('/todos/' + todo, 'GET')
    console.log('Uppdatera', todo)
    updateTodo(todo)
}

function updateTodo(todo) {

    let editInput = document.getElementById('input')
    newTodo = input.value
    /* todo = newTodo */
    input.value = ""

    makeRequest('/todos/' + newTodo, 'PUT', { todo, newTodo })
    console.log('Uppdaterad till', newTodo)

    /* updateListTodo(newTodo) */
    /* let update = document.getElementById('h4')
    if (updateTodo) {
        if (update.innerText = todo) {
            update.innerText = newTodo
            console.log(newTodo)
        }
    } */
    printTodo(newTodo)
}

/* function updateListTodo(newTodo) {

    if (newTodo != "") {
        let updateList = document.getElementById('h4')
        updateList.innerText = newTodo
        console.log(newTodo)
    }
} */

function removeTodo(todo, item, list, listDiv, div) {

    item.remove()

    /*     let clear = document.getElementById('container') */

    if (item.innerText == "") {
        listDiv.remove()
    } /* else if (updateListTodo) {
        clear.innerHTML = ""
    } */

    makeRequest('/todos/' + todo, 'DELETE')
    console.log('Specifik ta bort', todo)
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