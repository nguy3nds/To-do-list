const btnAdd = document.getElementById("add");

let data = (localStorage.getItem("todoList")) ? JSON.parse(localStorage.getItem("todoList")) : {
  todo: [],
  completed: []
}

loadData();

function loadData(){
  if (!data.todo.length && !data.completed.length)
    return;
  for (let i = 0; i < data.todo.length; i++){
    addItemToDom(data.todo[i]);
  }
  for (let j = 0; j < data.completed.length; j++){
    addItemToDom(data.completed[j], true);
  }
}

// save data to local storage

function saveDataToLocal() {
  localStorage.setItem("todoList", JSON.stringify(data));
}

// Handle Add
btnAdd.addEventListener("click", addItem);

// Handle Enter Add
document.getElementById("item").addEventListener("keydown", (e) => {
  if (e.key === "Enter")
    addItem();
}) 

function addItem() {
  let item = document.getElementById("item");
  let value = item.value;

  if (value) {
    addItemToDom(value);
    data.todo.push(value);
    console.log(data);
  }
  saveDataToLocal();
  
  document.getElementById("item").value = '';
}

// Handle remove
function removeItem(e) {
  
  
  let item = e.target.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.textContent.slice(0, -1);
  (id === "todo") ? data.todo.splice(value, 1) : data.completed.splice(value, 1);
  saveDataToLocal();

  let list = document.getElementById(id);
  parent.removeChild(item);
}

// Handle Completed

function completed(e) {
  if (e.target.nodeName !== "BUTTON")
  {
    let item = e.target;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.textContent.slice(0, -1);

    if (id === "todo") {
      data.todo.splice(value, 1);
      data.completed.push(value);
    } else {
      data.completed.splice(value, 1);
      data.todo.push(value);
    }
    saveDataToLocal();
    
    let target = (id === "todo") ? document.getElementById("completed") : document.getElementById("todo");

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

  }  
  
}

function addItemToDom(value,isCompleted) {
  let list = (isCompleted) ? document.getElementById("completed") : document.getElementById("todo");
  let item = document.createElement("li");

  item.innerHTML = value;

  let button = document.createElement("button");
  button.classList.add("remove");
  button.innerHTML = 'X';
  button.addEventListener("click", removeItem);
  
  item.appendChild(button);
  item.addEventListener("click", completed);

  list.insertBefore(item, list.childNodes[0]);

}



