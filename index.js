// Elements
const loginForm = document.getElementById('loginForm');
const nameinput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const erroemessage = document.getElementById('error');


// Handle Signup
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameinput.value;
    

    const newUser ={
        name ,
        email,
        password
    }
    const apiUrl = "https://x8ki-letl-twmt.n7.xano.io/api:r-Xv20fU/auth/signup";

    const option = {
        method: "POST",
        body:JSON.stringify(newUser),
        headers: {'content-Type' : 'application/json'}
    }

    fetch(apiUrl,option)
    .then(response => response.json())
    .then(results => {
        if(results.code){
            erroemessage.innerHTML = results.message;
        }else{
            localStorage.setItem('token',results.authToken);
            localStorage.setItem('userid',results.user_id);
             window.location.replace("toDo.html")

        }
    })
    .catch(error => {
        console.log(error.status) 
    });

    
});



// // Render tasks
// function renderTasks() {
//     todoList.innerHTML = '';
//     tasks.forEach((task, index) => {
//         const li = document.createElement('li');
        
//         // Task text
//         const taskSpan = document.createElement('span');
//         taskSpan.textContent = task;
//         li.appendChild(taskSpan);

//         // Edit button
//         const editBtn = document.createElement('button');
//         editBtn.textContent = 'Edit';
//         editBtn.style.marginLeft = '10px';
//         editBtn.addEventListener('click', () => editTask(index));
//         li.appendChild(editBtn);

//         // Delete button
//         const delBtn = document.createElement('button');
//         delBtn.textContent = 'Delete';
//         delBtn.style.marginLeft = '5px';
//         delBtn.addEventListener('click', () => {
//             tasks.splice(index, 1);
//             renderTasks();
//         });
//         li.appendChild(delBtn);

//         todoList.appendChild(li);
//     });
// }

// // Edit task
// function editTask(index) {
//     const newTask = prompt("Edit your task:", tasks[index]);
//     if(newTask !== null && newTask.trim() !== '') {
//         tasks[index] = newTask.trim();
//         renderTasks();
//     }
// }
