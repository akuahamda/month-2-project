const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const erroemessage = document.getElementById('error');


//handle Login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  console.log("Email:", email);
  console.log("Password:", password);

  const newUser ={
        email,
        password
    }
    const apiUrl = "https://x8ki-letl-twmt.n7.xano.io/api:r-Xv20fU/auth/login";

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
         return 
    });
});
