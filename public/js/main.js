let tweetData = [];

function init()
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "api/loadtweets", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log(JSON.parse(xhr.responseText));
            tweetData = JSON.parse(xhr.responseText);
            loadTweets();
        }
    }
}

// Populates the page with tweets and the user's name
function loadTweets()
{
    for (let i = 0; i < tweetData.length; ++i)
    {
        loadTweetsHelper(i);
    }
}

function loadTweetsHelper(i)
{
    let contentDiv = document.getElementById("display-tweet");
    let tweetDiv = document.createElement("div");
    let user = document.createElement("p");
    let tweetContent = document.createElement("p");
    let commentButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    const linebreak = document.createElement("br");

    tweetDiv.setAttribute("id", "div" + i);
    commentButton.setAttribute("id", "comment" + i);
    commentButton.setAttribute("type", "button");
    commentButton.setAttribute("onclick", "comment(this, this.id)");
    deleteButton.setAttribute("id", "delete" + i);
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("onclick", "delete(this, this.id)");

    user.textContent = tweetData[i].username;
    tweetContent.textContent = tweetData[i].content;
    commentButton.textContent = "comment";
    deleteButton.textContent = "delete";
    
    contentDiv.append(tweetDiv);
    tweetDiv.append(user);
    tweetDiv.append(tweetContent);
    tweetDiv.append(commentButton);
    tweetDiv.append(deleteButton);
    tweetDiv.append(linebreak);
    tweetDiv.append(linebreak);
}

function addToDB()
{
    let content = document.getElementById("create-tweet-content").value;
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "api/createtweet", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("status=add"); // "status=add?"
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let id = this.responseText;
            let json = JSON.parse(id);
            createTweet(json[0].id);
        }
    }
}

function createTweet(tweetID)
{
    let id = dbID;
    console.log(id);


}

function comment(id)
{
    let xhr = new XMLHttpRequest();


}

function deleteTweet()
{
    console.log("delete this later");
}
