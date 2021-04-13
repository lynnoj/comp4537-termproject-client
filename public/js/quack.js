let commentData = [];
let username = "";
getUsername();
// let username = "johndoe1";

function init()
{
    loadQuack();
    
    let xhttp = new XMLHttpRequest();
    let params = "quackid=" + localStorage.getItem("id");

    xhttp.open("GET", "https://comp4537-termproject-api.herokuapp.com/API/V1/loadcomments" + "?" + params, true);
    xhttp.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('accessToken'));
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            commentData = JSON.parse(xhttp.responseText);
            console.log(commentData);
            loadComments();
        }

        if (this.readyState == 4 && this.status == 400)
        {
            console.log(xhttp.responseText);
        }
    }
}

function loadQuack()
{
    let dbID = localStorage.getItem("id");
    let quack = JSON.parse(localStorage.getItem("quack"));
    let parent = document.getElementById("quack-section");
    let container = document.createElement("div");
    let container2 = document.createElement("div");
    let user = document.createElement("h3");
    let quackContent = document.createElement("p");
    let editBtn = document.createElement("button");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");

    container.setAttribute("class", "quack-container-style");
    container2.setAttribute("class", "quack-container-header");
    editBtn.setAttribute("id", "editQuack")
    editBtn.setAttribute("type", "button");
    editBtn.setAttribute("onclick", "editQuack(" + dbID + ")");

    user.textContent = quack.username;
    quackContent.textContent = quack.Content;
    editBtn.textContent = "edit";

    div1.append(user);
    div3.append(editBtn);
    div2.append(quackContent);

    container2.append(div1);
    container2.append(div3);

    container.append(container2);
    container.append(div2);
    parent.append(container);
}

function editQuack()
{
    let editBtn = document.getElementById("editQuack");
    let parent = document.getElementById("quack-section");
    let container = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let editQuackArea = document.createElement("textarea");
    let updateBtn = document.createElement("button");
    let cancelBtn = document.createElement("button");

    editBtn.setAttribute("style", "display: none;");
    container.setAttribute("id", "editQuackContainer");
    container.setAttribute("class", "editQuackContainerStyle");
    editQuackArea.setAttribute("id", "editQuackArea");
    editQuackArea.setAttribute("col", "60");
    editQuackArea.setAttribute("rows", "6");
    editQuackArea.setAttribute("maxlength", "255");
    editQuackArea.setAttribute("placeholder", "Edit quack..")

    updateBtn.setAttribute("id", "updateQuack");
    updateBtn.setAttribute("onclick", "updateQuack()");
    cancelBtn.setAttribute("id", "cancelQuackEdit");
    cancelBtn.setAttribute("onclick", "cancelQuackEdit()");

    updateBtn.textContent = "update";
    cancelBtn.textContent = "cancel";

    div1.append(editQuackArea);
    div2.append(updateBtn);
    div2.append(cancelBtn);

    container.append(div1);
    container.append(div2);
    parent.append(container);
}

function updateQuack(id)
{
    let updatedQuack = document.getElementById("editQuackArea").value;
    let jsonString = JSON.stringify({"QuackID": localStorage.getItem("id"), "username": username, "Content": updatedQuack});
    let xhr = new XMLHttpRequest();

    xhr.open("PUT", "https://comp4537-termproject-api.herokuapp.com/API/V1/editquack", true);
    xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('accessToken'));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(xhr.responseText);
            localStorage.setItem("quack", jsonString);
            cancelQuackEdit();
            window.location.replace("/4537/termproject/API/V1/quack");
        }

        if (this.readyState == 4 && this.status == 400)
        {
            console.log(xhr.responseText);
        } 
    }
}

function cancelQuackEdit()
{
    let container = document.getElementById("editQuackContainer");
    let editBtn = document.getElementById("editQuack");

    editBtn.setAttribute("style", "display: inline-block");
    container.remove();
}

function loadComments()
{
    console.log("Inside loadComments()");
    let parent = document.getElementById("comment-section");
    
    for (let i = 0; i < commentData.length; ++i)
    {
        let dbID = commentData[i].commentid;
        let div = document.createElement("div");
        let user = document.createElement("h3");
        let comment = document.createElement("p");
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
        const linebreak = document.createElement("br");
        
        div.setAttribute("id", "commentDiv" + dbID);
        div.setAttribute("class", "commentDivStyle");
        editBtn.setAttribute("id", "editComment" + dbID);
        editBtn.setAttribute("onclick", "editComment(this.id)");
        deleteBtn.setAttribute("id", "deleteComment" + dbID);
        deleteBtn.setAttribute("onclick", "deleteComment(this.id)");
        
        user.textContent = commentData[i].username;
        comment.textContent = commentData[i].comment;
        editBtn.textContent = "edit";
        deleteBtn.textContent = "delete";

        div.append(user);
        div.append(comment);
        div.append(editBtn);
        div.append(deleteBtn);
        div.append(linebreak);

        parent.append(div);
    }
}

function createNewComment()
{
    let xhttp = new XMLHttpRequest();
    let comment = document.getElementById("commentArea");
    let jsonString = JSON.stringify({"username": username, "comment": comment.value, "quackid": localStorage.getItem("id")});
    
    xhttp.open("POST", "https://comp4537-termproject-api.herokuapp.com/API/V1/createcomment", true);
    xhttp.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('accessToken'));
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(jsonString);
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 201)
        {
            console.log(xhttp.responseText);
            comment.value = "";
            window.location.replace("/4537/termproject/API/V1/quack");
        }

        if (this.readyState == 4 && this.status == 400)
        {
            console.log(xhttp.responseText);
        }
    }
}

function editComment(id)
{
    let length = "editComment".length;
    let dbID = parseID(length, id);
    let editBtn = document.getElementById("editComment" + dbID);
    let parent = document.getElementById("commentDiv" + dbID);
    let container = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let editCommentArea = document.createElement("textarea");
    let updateBtn = document.createElement("button");
    let cancelBtn = document.createElement("button");
    
    editBtn.setAttribute("style", "display: none");
    container.setAttribute("id", "editContainer" + dbID);
    container.setAttribute("class", "commentDivStyle");
    editCommentArea.setAttribute("id", "editCommentArea" + dbID);
    editCommentArea.setAttribute("col", "60");
    editCommentArea.setAttribute("rows", "6");
    editCommentArea.setAttribute("maxlength", "255");
    editCommentArea.setAttribute("placeholder", "Edit comment..")
    updateBtn.setAttribute("id", "updateComment" + dbID);
    updateBtn.setAttribute("onclick", "updateComment(this.id)");
    cancelBtn.setAttribute("id", "cancelEdit" + dbID);
    cancelBtn.setAttribute("onclick", "cancelEdit(this.id)");

    updateBtn.textContent = "update";
    cancelBtn.textContent = "cancel";

    div1.append(editCommentArea);
    div2.append(updateBtn);
    div2.append(cancelBtn);

    container.append(div1);
    container.append(div2);
    parent.after(container);
}

function updateComment(id)
{
    let length = "updateComment".length;
    let dbID = parseID(length, id);
    let updatedComment = document.getElementById("editCommentArea" + dbID).value;
    console.log(updatedComment);
    let jsonString = JSON.stringify({"commentid": parseInt(dbID), "username": username, "comment": updatedComment});
    console.log(jsonString);
    let xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "https://comp4537-termproject-api.herokuapp.com/API/V1/editcomment", true);
    xhttp.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('accessToken'));
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(jsonString);
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(xhttp.responseText);
            let cancelEditID = "cancelEdit" + dbID;
            cancelEdit(cancelEditID);
            window.location.replace("/4537/termproject/API/V1/quack");
        }

        if (this.readyState == 4 && this.status == 400)
        {
            console.log(xhttp.responseText);
        }
    }
}

// Deletes text area and buttons made from "editComment()"
function cancelEdit(id)
{
    let length = "cancelEdit".length;
    let dbID = parseID(length, id);
    let editBtn = document.getElementById("editComment" + dbID);
    let container = document.getElementById("editContainer" + dbID);

    editBtn.setAttribute("style", "display: inline-block");
    container.remove();
}

function deleteComment(id)
{
    let length = "deleteComment".length;
    let dbID = parseID(length, id);
    let commentDiv = document.getElementById("commentDiv" + dbID);
    let jsonString = JSON.stringify({"quackid": localStorage.getItem("id"), "commentid": parseInt(dbID)});
    let xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "https://comp4537-termproject-api.herokuapp.com/API/V1/deletecomment", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('accessToken'));
    xhttp.send(jsonString);
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 204)
        {
            console.log(xhttp.responseText);
            commentDiv.remove();
        }

        if (this.readyState == 4 && this.status == 400)
        {
            console.log(xhttp.responseText);
        }
    }
}

// The length is the length of the id before the digits
// ex: the length of "comment14" is the length of "comment", or 7
function parseID(length, elementID)
{
    return elementID.substring(length, elementID.length);
}

function getUsername()
{
    console.log("inside getUsername()");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/4537/termproject/API/V1/getUserName", true);
    xhttp.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('accessToken'));
    xhttp.send();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            username = xhttp.response;
        }
    }
}

function back()
{
    location.href = "/4537/termproject/API/V1/main";
}