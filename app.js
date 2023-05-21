let body = document.querySelector('body')
let containerDiv = document.querySelector('.container')
let tasksDiv = document.querySelector('.tasks')
let modal = document.querySelector('.modal')
let inputs = document.querySelectorAll('.modal [name]')

let allFilter = document.querySelector('.allFilter')
let doneFilter = document.querySelector('.doneFilter')
let waitingFilter = document.querySelector('.waitingFilter')

let tasks = []
let url = 'http://localhost:3000/tasks'

const render = (list) => {
    tasksDiv.innerHTML = ''
    list.forEach((item, index) => {
        tasksDiv.innerHTML += `
        <div class="task ${item.status == 1 ? 'waiting' : 'done'}">
        <div class="title">${item.title}</div>
        <div class="closeBtn">
        <i class="fa-sharp fa-solid fa-pencil" onclick="changeStatus(${index})"></i>    
        <i class="fa-sharp fa-solid fa-xmark" onclick="deleteTask(${index})"></i>

        </div>
        <div class="text">${item.text}</div>
        <div class="bottom">
            <div class="deadline">23.03.2024</div>
            <div class="type">Ish</div>
        </div>
    </div>
        `
    })
}

const changeStatus = (index) => {
    tasks[index].status = tasks[index].status == 0 ? 1 : 0
    fetch(`${url}/${tasks[index].id}`,{
        method: "PUT",
        body: JSON.stringify(tasks[index]),
        headers: {
            'Content-type': 'application/json'
        }
        
    }).then(res => res.json())
    .then(() => {
        render(tasks)
    })
}
const deleteTask = (index) => {
    if (confirm("Qaroringiz qat'iymi?")) {
        fetch(`${url}/${tasks[index].id}`,{
            method: 'DELETE',
            headers: {
                'Content-type':'application/json'
            }
        }).then(() => {
            tasks.splice(index, 1)
            render(tasks)
        })
        
    }
}

fetch(url)
    .then(res => res.json())
    .then(list => {
        tasks = list
        render(tasks)
    })


const toggle = () => {
    modal.classList.toggle('open')
    body.classList.toggle('openModal')
    containerDiv.classList.toggle('openModal')
}

const post = (task) => {
    fetch(url, {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(newTask => {
        tasks.push(newTask)
        render(tasks)
    })
}

const add = () => {
    let task = {}
    inputs.forEach(el => {
        task[el.getAttribute('name')] = el.value
        el.value = ''
    })
    task.status = 0
    post(task)
    toggle()
}

const filterTasks = (status) => {
    //  if (status == 'all'){
    //     render(tasks)
    //  } else{
    //     render([...tasks.filter(task => task.status == status)])
    //  }
    render(status == 'all' ? tasks : [...tasks.filter(task => task.status == status)])
    if (status == 'all') {
        allFilter.classList.add('active')
        doneFilter.classList.remove('active')
        waitingFilter.classList.remove('active')
    } else if (status == '1') {
        allFilter.classList.remove('active')
        waitingFilter.classList.remove('active')
        doneFilter.classList.add('active')
    } else {
        doneFilter.classList.remove('active')
        allFilter.classList.remove('active')
        waitingFilter.classList.add('active')
    }
}