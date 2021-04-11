document.getElementById("login").onclick = function () {
    location.href = "/4537/termproject/API/V1/login";
};

document.getElementById("register").onclick = function () {
    registerUser();
    
};

function registerUser(){
    let firstname = document.getElementById('fname').value
    let lastname = document.getElementById('lname').value
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let email = document.getElementById('email').value
    let registerJson = {
        firstname:firstname,
        lastname:lastname,
        username:username,
        password:password,
        email:email
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/API/V1/register',true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(registerJson));
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            window.location.replace("/4537/termproject/API/V1/login");
        }
        if (this.readyState == 4 && this.status == 400) {
            addErrorMessage(xhr.responseText);
        }
        
    };  
}

function addErrorMessage(responseText){
    let myDiv = document.getElementById("errorDiv");
    document.getElementById("errorDiv").innerHTML = "";
    myDiv.innerHTML = "<p>" + responseText + "<p>";

}