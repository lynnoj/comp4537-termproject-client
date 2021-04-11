let quackData = [];
let username = getUsername();

// Initializes the page
function init()
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "https://comp4537-termproject-api.herokuapp.com/API/V1/loadquacks", true);
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(JSON.parse(xhr.responseText));
            quackData = JSON.parse(xhr.responseText);
            loadQuacks();
        }
    }
}

// Populates the page with tweets and the user's name
function loadQuacks()
{
    for (let i = quackData.length - 1; i >= 0; --i)
    {
        let dbID = (i * 10) + 4;
        loadQuacksHelper(dbID, i);
    }
}

// Creates corresponding quack items using info from db
// need to create an edit button
// need to implement comments here. maybe have a load
// comments button below each quack? 
function loadQuacksHelper(dbID, i)
{
    let contentDiv = document.getElementById("display-quack");
    let quackDiv = document.createElement("div");
    let user = document.createElement("p");
    let quackContent = document.createElement("p");
    let loadButton = document.createElement("button");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    const linebreak = document.createElement("br");

    quackDiv.setAttribute("id", "quackDiv" + dbID);
    loadButton.setAttribute("id", "loadComment" + dbID);
    loadButton.setAttribute("type", "button");
    loadButton.setAttribute("onclick", "viewQuack(this.id)");
    editButton.setAttribute("id", "editQuack" + dbID);
    editButton.setAttribute("type", "button");
    editButton.setAttribute("onclick", "editQuack(this.id)");
    deleteButton.setAttribute("id", "deleteQuack" + dbID);
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("onclick", "deleteQuack(this.id)");
    
    user.textContent = quackData[i].username;
    quackContent.textContent = quackData[i].content;
    loadButton.textContent = "comments"
    editButton.textContent = "edit"
    deleteButton.textContent = "delete quack";
    
    quackDiv.append(user);
    quackDiv.append(quackContent);
    quackDiv.append(loadButton);
    quackDiv.append(editButton);
    quackDiv.append(deleteButton);
    quackDiv.append(linebreak);
    quackDiv.append(linebreak);
    contentDiv.append(quackDiv);
}

// Quack (QuackID, username, Content)
// Sends the username and content to the DB
// DB handles QuackID through mysql auto-increment
function createQuack()
{
    let xhr = new XMLHttpRequest();
    let content = document.getElementById("create-quack-content").value;
    let jsonString = JSON.stringify({"username": username, "Content": content});

    xhr.open("POST", "https://comp4537-termproject-api.herokuapp.com/API/V1/createquack", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 201)
        {
            console.log(xhr.responseText);
        }
    }
}

function editQuack(id)
{
    let length = "editQuack".length;
    let dbID = parseID(length, id);
    let parent = document.getElementById(id);
    let container = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let editQuackArea = document.createElement("textarea");
    let updateBtn = document.createElement("button");
    let cancelBtn = document.createElement("button");

    container.setAttribute("id", "editContainer" + dbID);
    editQuackArea.setAttribute("id", "editQuackArea" + dbID);
    editQuackArea.setAttribute("col", "60");
    editQuackArea.setAttribute("rows", "6");
    editQuackArea.setAttribute("maxlength", "255");
    editQuackArea.setAttribute("placeholder", "Edit quack..")
    updateBtn.setAttribute("id", "updateQuack" + dbID);
    updateBtn.setAttribute("onclick", "updateQuack(this.id)");
    cancelBtn.setAttribute("id", "cancelEdit" + dbID);
    cancelBtn.setAttribute("onclick", "cancelEdit(this.id)");

    updateBtn.textContent = "update";
    cancelBtn.textContent = "cancel";

    div1.append(editQuackArea);
    div2.append(updateBtn);
    div2.append(cancelBtn);

    container.append(div1);
    container.append(div2);
    parent.after(container);
}

// need to maybe edit the quackdata array?
function updateQuack(id)
{
    let length = "updateQuack".length;
    let dbID = parseID(length, id);
    let updatedQuack = document.getElementById("editQuackArea" + dbID).value;
    let jsonString = JSON.stringify({"quackid": parseInt(dbID), "username": username, "quack": updatedQuack});
    let xhr = new XMLHttpRequest();

    xhr.open("PUT", "https://comp4537-termproject-api.herokuapp.com/API/V1/editquack", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    xhr.onreadystatechange = function()
    {
        // Might need to change status code 
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(xhr.responseText);
            let cancelEditID = "cancelEdit" + dbID;
            cancelEdit(cancelEditID);
        }
    }
}

function cancelEdit(id)
{
    let length = "cancelEdit".length;
    let dbID = parseID(length, id);
    let container = document.getElementById("editContainer" + dbID);

    container.remove();
}

// Need the server to also delete associated comments to the quack
function deleteQuack(id)
{
    let xhr = new XMLHttpRequest();
    let length = "deleteQuack".length;
    let dbID = parseID(length, id);
    let quackDiv = document.getElementById("quackDiv" + dbID);
    let jsonString = JSON.stringify({"quackid": dbID});

    xhr.open("DELETE", "https://comp4537-termproject-api.herokuapp.com/API/V1/deletequack", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 204)
        {
            console.log(xhr.responseText);
            quackDiv.remove();
        }
    }
}

// Sets an ID into localstorage and redirects to quack.html
function viewQuack(id)
{
    let length = "loadComment".length;
    let dbID = parseInt(parseID(length, id));
    let quack = quackData[(dbID - 4) / 10];

    localStorage.setItem("quack", quack);
    localStorage.setItem("id", dbID);
    location.href = "/4537/termproject/API/V1/quack";
}

// Sends a GET/POST? request to the DB to get the usersname
// using the user's session variable
function getUsername()
{
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/4537/termproject/API/V1/getUserName", true);
    xhttp.send();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(xhttp.response);
            return xhttp.response;
        }
    }
}

// The length is the length of the id before the digits
// ex: the length of "comment14" is the length of "comment", or 7
function parseID(length, elementID)
{
    return id.substring(length, elementID.length);
}
