let statsJSON;

function init(){
    getStats();
    
}
function getStats(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://comp4537-termproject-api.herokuapp.com/api/getStats',true);
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
