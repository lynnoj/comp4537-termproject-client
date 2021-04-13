let statsJSON;
let status;
document.getElementById("login-btn").onclick = function () {
    loginAdmin();
};

function getStats(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://comp4537-termproject-api.herokuapp.com/API/V1/getStats',true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(xhr.responseText)
            let json = JSON.parse(xhr.responseText);
            statsJSON = json;
            fillTable();
        }
    }; 
}

function fillTable(){
    for(i = 0; i < Object.keys(statsJSON).length; i++){
        let tbodyRef = document.getElementById('stats-table').getElementsByTagName('tbody')[0];
        let newRow = tbodyRef.insertRow();
        let newCell = newRow.insertCell();
        let newCell2 = newRow.insertCell();
        let newCell3 = newRow.insertCell();
        let newText = document.createTextNode(statsJSON[i].method);
        let newText2 = document.createTextNode(statsJSON[i].endpoint);
        let newText3 = document.createTextNode(statsJSON[i].requests);
        newCell.appendChild(newText);
        newCell2.appendChild(newText2);
        newCell3.appendChild(newText3);
    }
}

function loginAdmin(){
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    let loginJson = {
        username:username,
        password:password
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://comp4537-termproject-api.herokuapp.com/API/V1/loginAdmin',true);
    xhr.setRequestHeader('Content-type', 'application/json');
    // xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("accessToken"));
    xhr.send(JSON.stringify(loginJson));
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            getStats();
            document.getElementById("login-container").style.display = "none"; 
            document.getElementById("tables").style.display = "block"; 
        }
        if (this.readyState == 4 && this.status == 401) {
            addErrorMessage(xhr.responseText);
        }
        
    };  
}

function addErrorMessage(responseText){
    let myDiv = document.getElementById("errorDiv");
    document.getElementById("errorDiv").innerHTML = "";
    myDiv.innerHTML = "<p>" + responseText + "<p>";

}