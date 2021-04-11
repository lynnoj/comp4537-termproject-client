let commentData = [];

function init()
{
    loadQuack(id);
    
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", "API/V1/loadcomments", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("id=" + id);
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            commentData = JSON.parse(xhttp.responseText);
            loadComments();
        }
    }
}

function loadQuack()
{
    let dbID = localStorage.getItem("id");
    let quack = localStorage.getItem("quack");
    let parent = document.getElementById("quack-section");
    let user = document.createElement("p");
    let quackContent = document.createElement("p");
    let editBtn = document.createElement("button");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");

    editBtn.setAttribute("id", "editQuack")
    editBtn.setAttribute("type", "button");
    editBtn.setAttribute("onclick", "editQuack(" + dbID + ")");

    user.textContent = quack.username;
    quackContent.textContent = quack.content;
    editBtn.textContent = "edit";

    div1.append(user);
    div2.append(quackContent);
    div3.append(editBtn);

    parent.append(div1);
    parent.append(div2);
    parent.append(div3);
}

function editQuack()
{
    let parent = document.getElementById("quack-section");
    let container = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let editQuackArea = document.createElement("textarea");
    let updateBtn = document.createElement("button");
    let cancelBtn = document.createElement("button");

    container.setAttribute("id", "editQuackContainer");
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
    parent.after(container);
}

function updateQuack(id)
{
    let updatedQuack = document.getElementById("editQuackArea").value;
    let user = getUsername(); // probably don't need this if not using localstorage
    let jsonString = JSON.stringify({"quackid": localStorage.get("id"), "username": user, "content": updatedQuack});
    let xhr = new XMLHttpRequest();

    xhr.open("PUT", "https://comp4537-termproject-api.herokuapp.com/API/V1/editquack", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(xhr.responseText);
            localStorage.setItem("quack", jsonString);
            cancelQuackEdit();
        }
    }
}

function cancelQuackEdit()
{
    let container = document.getElementById("editQuackContainer");
    container.remove();
}

function loadComments()
{
    let parent = document.getElementById("comment-section");
    
    for (let i = 0; i < commentData.length; ++i)
    {
        let dbID = commentData[i].commentid;
        let div = document.createElement("div");
        let user = commentData[i].username;
        let comment = document.createElement("p");
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
        const linebreak = document.createElement("br");
        
        div.setAttribute("id", "commentDiv" + dbID);
        editBtn.setAttribute("id", "editComment" + dbID);
        editBtn.setAttribute("onclick", "editComment(this.id)");
        deleteBtn.setAttribute("id", "deleteComment" + dbID);
        deleteBtn.setAttribute("onclick", "deleteComment(this.id)");

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

function createComment()
{
    let xhttp = new XMLHttpRequest();
    let comment = document.getElementById("commentArea");
    let username = getUsername();
    let jsonString = JSON.stringify({"username": username, "comment": comment.value, "quackid": localStorage.getItem("id")});
    
    xhttp.open("POST", "https://comp4537-termproject-api.herokuapp.com/API/V1/createcomment", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(jsonString);
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 201)
        {
            console.log(xhttp.responseText);
            comment.value = "";
        }
    }
}

function editComment(id)
{
    let length = "editComment".length;
    let dbID = parseID(length, id);
    let parent = document.getElementById(id);
    let container = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let editCommentArea = document.createElement("textarea");
    let updateBtn = document.createElement("button");
    let cancelBtn = document.createElement("button");
    
    container.setAttribute("id", "editContainer" + dbID);
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
    let user = getUsername();
    let jsonString = JSON.stringify({"commentid": parseInt(dbID), "username": user, "comment": updatedComment});
    let xhttp = new XMLHttpRequest();

    xhttp.open("PUT", "https://comp4537-termproject-api.herokuapp.com/API/V1/editcomment", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(jsonString);
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(xhttp.responseText);
            let cancelEditID = "cancelEdit" + dbID;
            cancelEdit(cancelEditID);
        }
    }
}

// Deletes text area and buttons made from "editComment()"
function cancelEdit(id)
{
    let length = "cancelEdit".length;
    let dbID = parseID(length, id);
    let container = document.getElementById("editContainer" + dbID);

    container.remove();
}

function deleteComment(id)
{
    let length = "deleteComment".length;
    let dbID = parseID(length, id);
    let commentDiv = document.getElementById("commentDiv" + dbID);
    let jsonString = JSON.stringify({"commentid": parseInt(dbID)});
    let xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", "https://comp4537-termproject-api.herokuapp.com/API/V1/deletecomment", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(jsonString);
    xhttp.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 204)
        {
            console.log(xhttp.responseText);
            commentDiv.remove();
        }
    }
}

// The length is the length of the id before the digits
// ex: the length of "comment14" is the length of "comment", or 7
function parseID(length, elementID)
{
    return id.substring(length, elementID.length);
}

function getUsername()
{

}

function back()
{
    location.href = "/4537/termproject/API/V1/main";
}