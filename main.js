let input  = document.getElementById("input");
let submit = document.getElementById("add");
let ul = document.getElementById("taskList");
let btn = document.querySelectorAll("btn-primary");
let sound = document.getElementById("audio");

let array = [];

if (localStorage.getItem("tasks")) {
    array = JSON.parse(localStorage.getItem("tasks"));
  }

getDataFromLocalStorage();

function music()
{
    sound.play();

}

submit.onclick = function () 
{
    if (input.value != "")
    {
        addTaskToArray(input.value);
        input.value = "";
    }
}

ul.addEventListener("click", function(e)
{
    if (e.target.classList.contains("btn-primary"))
     {
        music();
        let taskId = (e.target.parentElement.getAttribute("data-id"));
        deleteTaskWith(taskId);
        e.target.parentElement.remove();
      }

});


function addTaskToArray(tasks) 
{
    const task = 
    {
        id: Date.now(),
        title: tasks,
    }

    array.push(task);
    addToLocalStorge(array);
}

function addToLocalStorge(array)
{
    window.localStorage.setItem("tasks", JSON.stringify(array));
    let date =window.localStorage.getItem("tasks");
    let tasks = JSON.parse(date)
    addElementtopage(tasks);
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
      addElementtopage(tasks);
    }
  }
  

function addElementtopage(tasks)
{
    ul.innerHTML = "";
    
    array.forEach((task) =>
    {
      let newElement = document.createElement("li");
      newElement.className = "list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2";
      newElement.id = "li";
      newElement.setAttribute("data-id", task.id);
      let taskText  = document.createElement("div");
      taskText.textContent = task.title;
      taskText.style.fontSize   = "30px";
      taskText.style.fontFamily = "Arail";
      taskText.style.letterSpacing = "2px" 
      let newbtn = document.createElement("button");
      newbtn.className = "btn btn-primary";
      newbtn.id = "btn";
      newbtn.textContent = "Finish";
      newElement.appendChild(taskText);
      newElement.appendChild(newbtn);
      ul.appendChild(newElement);
    });
};

function deleteTaskWith(taskId) {
    array = array.filter((task) => task.id != taskId);
    addToLocalStorge(array);
};
