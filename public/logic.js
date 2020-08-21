

window.onload = main

function main() {

    getApi()

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
        let id = todos.id
        let todo = todos.title
        console.log(todos.id)

        if (todos != "") {

            let item = document.createElement('li')
            item.innerText = todo
            item.classList = "p"
            console.log(todo)

            const editButton = document.createElement('button')
            editButton.classList = "button"
            editButton.innerHTML = "Ändra Todo"
            editButton.onclick = function () {
                updateTodo(todo, id)
            }

            const viewButton = document.createElement('button')
            viewButton.classList = "button"
            viewButton.innerHTML = "Visa Todo"
            viewButton.onclick = function () {
                viewTodo(todo, id)
            }

            const removeButton = document.createElement('button')
            removeButton.classList = "button"
            removeButton.innerHTML = "Ta bort Todo"
            removeButton.onclick = function () {
                removeTodo(todo, item, id)
            }

            listDiv.append(ol)
            ol.append(item)
            item.append(editButton)
            item.append(viewButton)
            item.append(removeButton)
        }
    }
}

function printTodo(todo, newTodo) {

    let div = document.getElementById('container')
    div.classList = "formList"

    let list = document.querySelector('h3')
    list.classList = "h4"

    if (todo != "" || newTodo != "") {

        if (todo) {
            list.innerText = todo
        } else list.innerText = newTodo
    }

    div.append(list)
}

function addNewTodo(todo) {

    if (todo != "") {
        console.log("Ny", todo)
        makeRequest('/todos', 'POST', { title: todo })
    }

    printTodo(todo)
}

function viewTodo(todo, id) {

    makeRequest('/todos/' + id, 'GET')
    console.log('Visa', todo)

    let colorTodo = document.querySelector('h4')
    colorTodo.className = "danger"

    if (todo) {
        colorTodo.innerText = todo
    } else {
        colorTodo.remove()
    }
}

function updateTodo(todo, id) {

    let editInput = document.getElementById('input')
    newTodo = input.value
    input.value = ""

    console.log(todo)
    makeRequest('/todos/' + id, 'PUT', { title: newTodo, id })
    console.log('Uppdaterad till', newTodo)

    printTodo(newTodo)
}

function removeTodo(todo, item, id) {

    item.remove()

    makeRequest('/todos/' + id, 'DELETE')
    console.log('Specifik ta bort', todo)
}

async function getApi() {
    let test = await makeAnOtherRequest("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/11.975/lat/57.7088/data.json", "GET")
    console.log(test)

    const allTimes = []

    test.timeSeries.forEach(time => {
        if (time['validTime']) {
            allTimes.push(time)
        }
    })

    const apiContainer = document.getElementsByClassName('apiContainer')[0]

    console.log(allTimes)

    allTimes.forEach((times) => {
        const timeDiv = document.createElement('div')
        timeDiv.className = 'timeBox'

        const weatherDiv = document.createElement('div')
        weatherDiv.className = 'weather'

        let timeText = document.createElement('h5')
        timeText.className = 'h5'
        timeText.innerText = times.validTime

        let params = times.parameters

        params.forEach((param) => {
            let twoNames = param.name
            if (twoNames === 't') {
                let celsius = param.unit
                let celValue = param.values

                let celText = document.createElement('h5')
                celText.className = 'h5'
                celText.innerText = celsius

                let cel = document.createElement('h5')
                cel.className = 'h5'
                cel.innerText = celValue

                weatherDiv.append(cel)
                weatherDiv.append(celText)

            } if (twoNames === 'ws') {
                let wind = param.unit
                let windValue = param.values

                let windText = document.createElement('h5')
                windText.className = 'h5'
                windText.innerText = wind

                let windVal = document.createElement('h5')
                windVal.className = 'h5'
                windVal.innerText = windValue

                weatherDiv.append(windVal)
                weatherDiv.append(windText)
            }
        })

        timeDiv.append(timeText)
        timeDiv.append(weatherDiv)
        apiContainer.append(timeDiv)
    })
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
    return data
}

async function makeAnOtherRequest(url, reqMethod, body) {
    const response = await fetch(url, {
        method: reqMethod,
        body: JSON.stringify(body)
    })

    const data = await response.json()
    return data
}