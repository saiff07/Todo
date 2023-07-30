const inputtext = document.getElementById("add");
const addBtn = document.getElementById("add-btn");
const toDO = document.getElementById("toDo");

addBtn.addEventListener('click', ()=> {
    var li = document.createElement('li');
    // var done = document.createElement('button')
    // var deleteBtn = document.createElement('button');
    // done.innerText =  'Done';
    // deleteBtn.innerText = 'Delete';
    li.innerText = inputtext.value;
    // done.classList.add('done')
    // deleteBtn.classList.add('delete-btn')
    
    toDO.appendChild(li);
    let cross = document.createElement('span');
    cross.innerHTML = "\u00d7";
    li.appendChild(cross);
    // toDO.appendChild(done)
    // toDO.appendChild(deleteBtn)

    inputtext.value = '';
    saveData();
})

toDO.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveData();
},false)


function saveData() {
    localStorage.setItem("data", toDO.innerHTML);
}

function showData() {
    toDO.innerHTML = localStorage.getItem("data");
}

showData();