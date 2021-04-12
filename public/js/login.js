document.getElementById("register").onclick = function () {
    location.href = "/4537/termproject/API/V1/register";
};
document.getElementById("login").onclick = function () {
    loginUser();
};

function loginUser(){
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let loginJson = {
        username:username,
        password:password
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://comp4537-termproject-api.herokuapp.com/API/V1/login',true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(loginJson));
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(xhr.responseText)
            localStorage.setItem('accessToken',data.accessToken)
            localStorage.setItem('refreshToken',data.refreshToken)
            window.location.replace("/4537/termproject/API/V1/main");
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