

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

async function getApi() {
    let test = await makeAnOtherRequest("https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/11.975/lat/57.7088/data.json", "GET")
    console.log(test)

    const allTimes = []

    test.timeSeries.forEach(time => {
        if(time['validTime']) {
            allTimes.push(time)
        }
    })

    /* const allParam = []

    test.timeSeries.forEach(param => {
        if(param['parameters']) {
            allParam.push(param)
        }
    }) */

    const apiContainer = document.getElementsByClassName('apiContainer')[0]

    console.log(allTimes)
    /* console.log(allParam) */

    allTimes.forEach((times) => {
        const timeDiv = document.createElement('div')
        timeDiv.className = 'timeBox'

        const weatherDiv = document.createElement('div')
        weatherDiv.className = 'weather'

        let timeText = document.createElement('h5')
        timeText.className = 'h5'
        timeText.innerText = times.validTime

        let params = times.parameters
        console.log(times.parameters)

        params.forEach((param) => {
            let twoNames = param.name
            if(twoNames === 't') {
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

                console.log(celsius, celValue[0])
            }if (twoNames === 'ws') {
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

                console.log(wind, windValue[0])
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
    return data // return skickar med data så den kan användas vidare
}

async function makeAnOtherRequest(url, reqMethod, body) {
    const response = await fetch(url, {
        /* headers: {
            "Content-Type": "Application-json"
        }, */
        method: reqMethod,
        body: JSON.stringify(body)
    })

    const data = await response.json()
    return data // return skickar med data så den kan användas vidare
}