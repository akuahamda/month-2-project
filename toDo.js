let textInput = document.getElementById("todoInput");
let dateInput = document.getElementById("dateInput");
let textareaInput = document.getElementById("descriptionInput");
let todoList = document.getElementById("todoList");
let addBtn = document.getElementById("addBtn");
let editBtn = document.getElementById("editBtn");
let selectStatus = document.getElementById("statusSelect");
let logoutBtn = document.getElementById("logout");

let sortDate = document.getElementById("sortDate");
let sortStatus = document.getElementById("sortStatus");

let editId = null;
let todosArrayGlobal = [];

// display todos 
function getTodos() {
  const user_id = localStorage.getItem("userid");
  const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo/user/${user_id}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(result => {
      todosArrayGlobal = result;
      displayTodos(result);
    });
}

function displayTodos(todosArray) {
  let filteredTodos = [...todosArray];

  // Sort by status
  if (sortStatus.value !== "none") {
    filteredTodos = filteredTodos.filter(todo => 
      sortStatus.value === "completed" ? todo.is_completed : !todo.is_completed
    );
  }

  // Sort by date
  if (sortDate.value === "asc") {
    filteredTodos.sort((a,b) => new Date(a.due_date) - new Date(b.due_date));
  } else if (sortDate.value === "desc") {
    filteredTodos.sort((a,b) => new Date(b.due_date) - new Date(a.due_date));
  }

  todoList.innerHTML = "";

  if (filteredTodos.length === 0) {
    todoList.innerHTML = "<h3>No tasks found. Please add a task.</h3>";
    return;
  }

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");

    // Add classes for completed and overdue
    if (todo.is_completed) li.classList.add("completed");
    if (overdueTasks(todo) && !todo.is_completed) li.classList.add("overdue");

    li.innerHTML = `
      <div class="todo-title">${todo.title}</div>
      <div class="todo-date">Due: ${new Date(todo.due_date).toLocaleString()}</div>
      <div class="todo-date">Status: ${todo.is_completed ? "Completed" : "Incomplete"}</div>
      <p>${todo.description}</p>
      <div class="todo-actions">
        <button class="edit-btn" onclick="getEditItem(${todo.id})">Edit</button>
        <button class="delete-btn" onclick="deleteFn(${todo.id})">Delete</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

getTodos();

//adding todos
function addTodo(e) {
  e.preventDefault();
  addBtn.textContent = "Adding...";

  const user_id = localStorage.getItem("userid");
  const newTodo = {
    title: textInput.value,
    description: textareaInput.value,
    due_date: dateInput.value,
    user_id: user_id,
    is_completed: false
  };

  if (!newTodo.title || !newTodo.description || !newTodo.due_date) {
    alert("Please fill all the fields");
    addBtn.textContent = "Add Task";
    return;
  }

  fetch("https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(() => {
      textInput.value = "";
      dateInput.value = "";
      textareaInput.value = "";
      addBtn.textContent = "Add Task";
      getTodos();
    });
}

addBtn.addEventListener("click", addTodo);

// edit todos
function getEditItem(id) {
  editId = id;
  selectStatus.style.display = "block";
  addBtn.style.display = "none";
  editBtn.style.display = "inline-block";

  const editUrl = `https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo/${id}`;
  fetch(editUrl)
    .then(res => res.json())
    .then(todo => {
      textInput.value = todo.title;
      dateInput.value = new Date(todo.due_date).toISOString().slice(0, 16);
      textareaInput.value = todo.description;
      selectStatus.value = todo.is_completed;
    });
}

function editfn(e) {
  e.preventDefault();
  const user_id = localStorage.getItem("userid");

  const newTodo = {
    title: textInput.value,
    description: textareaInput.value,
    due_date: dateInput.value,
    user_id: user_id,
    is_completed: selectStatus.value
  };

  if (!newTodo.title || !newTodo.description || !newTodo.due_date) {
    alert("Please fill all the fields");
    return;
  }

  const editUrl = `https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo/${editId}`;

  fetch(editUrl, {
    method: "PATCH",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(() => {
      textInput.value = "";
      dateInput.value = "";
      textareaInput.value = "";
      selectStatus.value = false;
      editBtn.style.display = "none";
      addBtn.style.display = "inline-block";
      getTodos();
      alert("Updated successfully");
    });
}

editBtn.addEventListener("click", editfn);

// delete todos 
function deleteFn(id) {
  if (!confirm("Are you sure you want to delete this todo?")) return;
  const deleteUrl = `https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo/${id}`;

  fetch(deleteUrl, { method: "DELETE" })
    .then(res => res.json())
    .then(() => {
      alert("Todo deleted successfully");
      getTodos();
    });
}

// check overdue
function overdueTasks(todo) {
  const today = new Date().toISOString().slice(0,16);
  const dueDate = new Date(todo.due_date).toISOString().slice(0,16);
  return dueDate < today && !todo.is_completed;
}

// logout
function logoutFn() {
  localStorage.removeItem("userid");
  window.location.replace("index.html");
}
logoutBtn.addEventListener("click", logoutFn);

//sort event 
sortDate.addEventListener("change", () => displayTodos(todosArrayGlobal));
sortStatus.addEventListener("change", () => displayTodos(todosArrayGlobal));
