let body = document.querySelector('body')
let containerDiv = document.querySelector('.container')
let tasksDiv = document.querySelector('.tasks')
let modal = document.querySelector('.modal')
let inputs = document.querySelectorAll('.modal [name]')

let tasks = []

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

const save = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    render(tasks)
}

const changeStatus = (index) => {
    tasks[index].status = tasks[index].status == 0 ? 1 : 0
    save()
}

const deleteTask = (index) => {
    if (confirm("Qaroringiz qat'iymi?")) {
        tasks.splice(index, 1)
        save()
    }
}

if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks')) 
    render(tasks)
}


const toggle = () => {
    modal.classList.toggle('open')
    body.classList.toggle('openModal')
    containerDiv.classList.toggle('openModal')
}

const add = () => {
    let task = {}
    inputs.forEach(el => {
        task[el.getAttribute('name')] = el.value
        el.value = ''
    })
    task.status = 0
    tasks.push(task)
    save()
    toggle()
    alert("Yangi task qo'shildi")
}

const filterTasks = (status) => {
    //  if (status == 'all'){
    //     render(tasks)
    //  } else{
    //     render([...tasks.filter(task => task.status == status)])
    //  }
      render (status == 'all' ? tasks : [...tasks.filter(task => task.status == status)])
}