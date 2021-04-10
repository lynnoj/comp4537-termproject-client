let quackData = [];

// Initializes the page
function init()
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "api/loadtweets", true);
    // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
        loadQuacksHelper(i);
    }
}

// Creates corresponding quack items using info from db
function loadQuacksHelper(i)
{
    let contentDiv = document.getElementById("display-quack");
    let quackDiv = document.createElement("div");
    let user = document.createElement("p");
    let quackContent = document.createElement("p");
    let commentButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    const linebreak = document.createElement("br");

    quackDiv.setAttribute("id", "div" + i);
    commentButton.setAttribute("id", "comment" + i);
    commentButton.setAttribute("type", "button");
    commentButton.setAttribute("onclick", "comment(this, this.id)");
    deleteButton.setAttribute("id", "delete" + i);
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("onclick", "delete(this, this.id)");

    user.textContent = quackData[i].username;
    quackContent.textContent = quackData[i].content;
    commentButton.textContent = "comment";
    deleteButton.textContent = "delete";
    
    contentDiv.append(tweetDiv);
    quackDiv.append(user);
    quackDiv.append(quackContent);
    quackDiv.append(commentButton);
    quackDiv.append(deleteButton);
    quackDiv.append(linebreak);
    quackDiv.append(linebreak);
}



// Quack (QuackID, username, Content)
// Sends the username and content to the DB
// DB handles QuackID through mysql auto-increment
function createQuack()
{
    let xhr = new XMLHttpRequest();
    // let username = getUsername();
    // let content = document.getElementById("create-quack-content").value;
    // let jsonString = JSON.stringify({"username": username, "Content": content});
    let jsonString = JSON.stringify({"username": "bob", "content": "yo"});

    xhr.open("POST", "https://comp4537-termproject-api.herokuapp.com/API/V1/createquack", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(xhr.responseText);
        }
    }
}

function comment(id)
{
    let xhr = new XMLHttpRequest();

    console.log("yo");
}

function deleteQuack()
{

}

// Sends a GET/POST? request to the DB to get the usersname
// using the user's session variable
function getUsername()
{

}
