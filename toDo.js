let textInput = document.getElementById("todoInput");
let dateInput = document.getElementById("dateInput");
let textareaInput = document.getElementById("descriptionInput");
let todoList = document.getElementById("todoList");
let addBtn = document.getElementById("addBtn");
let editBtn = document.getElementById("editBtn");
let selectStatus = document.getElementById("statusSelect");
let logoutBtn = document.getElementById("logout");

let editId = null;

// function to get the users todos and display them
function getTodos() {
  const user_id = localStorage.getItem("userid");
  const apiUrl = `https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo/user/${user_id}`;
  fetch(apiUrl, { method: "GET" })
    .then((response) => response.json())
    .then((result) => displayTodos(result));
}

//  show todoList
function displayTodos(todosArray) {
  todoList.innerHTML = "";

  if(todosArray.length === 0){
    todoList.innerHTML = "<h3>No tasks found. Please add a task.</h3>";
    return;
  }

  todosArray.forEach((todo) => {
    const isOverdue = overdueTasks(todo);
    if(isOverdue){
      alert(`Your task with title "${todo.title}" is overdue! Please take necessary action.`);
    }

    todoList.appendChild(li);
  });
}
getTodos();

// create a function to add a new todo
function addTodo(e) {
  addBtn.textContent = "Adding...";
  e.preventDefault();
  const user_id = localStorage.getItem("userid");
  const newTodo = {
    title: textInput.value,
    description: textareaInput.value,
    due_date: dateInput.value,
    user_id: user_id,
    is_completed: false,
  };

  console.log(newTodo);

  if (!newTodo.title || !newTodo.description || !newTodo.due_date) {
    alert("Please fill all the fields");
    return;
  }

  const addTodoUrl = "https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo";
  const option = {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "content-Type": "application/json" },
  };

  fetch(addTodoUrl, option)
    .then((response) => response.json())
    .then((result) => {
      textInput.value = "";
      dateInput.value = "";
      textareaInput.value = "";
      addBtn.textContent = "Add Task";
      getTodos();
    });
}

addBtn.addEventListener("click", addTodo);

// function to update a todo
function getEditItem(id) {
  editId = id;
  console.log(id);
  selectStatus.style.display = "inline-block";

  const editUrl = `https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo/${id}`;
  fetch(editUrl, { method: "GET" })
    .then((response) => response.json())
    .then(
      (todo) => (
        (textInput.value = todo.title),
        (dateInput.value = new Date(todo.due_date).toISOString().slice(0, 16)),
        (textareaInput.value = todo.description),
        (selectStatus.value = todo.is_completed),
        (addBtn.style.display = "none"),
        (editBtn.style.display = "inline-block")
      )
    );
}
function editfn(e) {
  e.preventDefault();
  const user_id = localStorage.getItem("userid");
  const newTodo = {
    title: textInput.value,
    description: textareaInput.value,
    due_date: dateInput.value,
    user_id: user_id,
    is_completed: selectStatus.value,
  };

  if (!newTodo.title || !newTodo.description || !newTodo.due_date) {
    alert("Please fill all the fields");
    return;
  }

  const editTodoUrl = `https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo/${editId}`;
  const option = {
    method: "PATCH",
    body: JSON.stringify(newTodo),
    headers: { "content-Type": "application/json" },
  };

  fetch(editTodoUrl, option)
    .then((response) => response.json())
    .then((result) => {
      textInput.value = "";
      dateInput.value = "";
      textareaInput.value = "";
      selectStatus.value = false;
      editBtn.style.display = "none";
      addBtn.style.display = "block"
      getTodos();
      alert("Updated successfully");
    });
}

editBtn.addEventListener("click", editfn);

// function to delete a todo
function deleteFn(id) {
  let isDelete = confirm("Are you sure you want to delete this todo?");
  if (!isDelete) {
    return;
  }
  const deleteUrl = `https://x8ki-letl-twmt.n7.xano.io/api:YRL0pZT3/todo/${id}`;
  const option = {
    method: "DELETE",
    headers: { "content-Type": "application/json" },
  };
  fetch(deleteUrl, option)
    .then((response) => response.json())
    .then((result) => {
      alert("Todo deleted successfully");
      getTodos();
    })
    .catch((error) => {
      console.log(error.status);
      return;
    });
}

// Overdue task funtion
function overdueTasks(todo) {
  const today = new Date().toISOString().slice(0, 16);
  const dueDate = new Date(todo.due_date).toISOString().slice(0, 16);

  if (dueDate < today && !todo.is_completed) {
    return true;
  } else {
    return false;
  }
}



// function to logout user
function logoutFn() {
  localStorage.removeItem("userid");
  window.location.replace("index.html");
}
logoutBtn.addEventListener("click", logoutFn);