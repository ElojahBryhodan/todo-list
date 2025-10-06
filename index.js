let tasks = []

const input = document.getElementById('newTodo')

function sendOnEnter() {
  
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const value = input.value.trim(); 

      if (value !== '') {
        addTask(value)
        input.value = '';
      }
    }
  });
}
sendOnEnter(); 

function addTask(text) {
  const container =
    document.getElementById('tasks-container') ||
    document.querySelector('[id*="tasks-container"]') ||
    document.querySelector('.main') ||
    document.querySelector('.todo-list') ||
    document.body
  const checkbox = document.createElement('input')
  const div = document.createElement('div')
  const label = document.createElement('label')
  

  checkbox.type = 'checkbox'
  checkbox.id = `task-${Date.now()}`

  label.textContent = text
  label.setAttribute('for', checkbox.id)

  div.className = 'task'
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      div.classList.add('done')
      
    } else {
      div.classList.remove('done')
    }
    updateFooterVisibility()
  })
  div.appendChild(checkbox)
  div.appendChild(label)
  container.appendChild(div)
  updateFooterVisibility()
}
function updateFooterVisibility() {
  const footerContainer = document.querySelector('.footer-container')
  const todoCount = document.querySelector('.todo-count')
  const tasks = document.querySelectorAll('.task')

  if (todoCount) {
    const count = tasks.length
    const itemText = count === 1 ? 'item' : 'items'
    todoCount.textContent = `${count} ${itemText} left`
  }

  if (footerContainer) {
    footerContainer.style.display = tasks.length > 0 ? 'block' : 'none'
  }
}

const btnAll = document.querySelector('.filters a[href="#/"]')
if (btnAll) {
  btnAll.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('.task').forEach((el) => {
      el.style.display = 'block'
    })
  })
}

const btnActive = document.querySelector('.filters a[href="#/active"]')
if (btnActive) {
  btnActive.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('.task').forEach((el) => {
      el.style.display = el.classList.contains('done') ? 'none' : 'block'
    })
  })
}

const btnCompleted = document.querySelector('.filters a[href="#/completed"]')
if (btnCompleted) {
  btnCompleted.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('.task').forEach((el) => {
      el.style.display = el.classList.contains('done') ? 'block' : 'none'
    })
  })
}

const btnClearCompleted = document.querySelector('.clear-completed')
if (btnClearCompleted) {
  btnClearCompleted.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('.task.done').forEach((el) => {
      el.remove()
    })
    updateFooterVisibility()
  })
}
 