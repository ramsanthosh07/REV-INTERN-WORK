
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

function addTask() {
  let taskText = taskInput.value; 

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

 

  let li = document.createElement("li");
  li.textContent = taskText;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = function() {
    taskList.removeChild(li);
  };

  

  let completeBtn = document.createElement("button");
  completeBtn.textContent = "Done";
  completeBtn.onclick = function() {
    li.style.textDecoration = "line-through";
  };
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
}
