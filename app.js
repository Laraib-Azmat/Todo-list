const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const selection = document.querySelector(".select-option");



// Event Listners

document.addEventListener("DOMContentLoaded", getTodo);
todoButton.addEventListener("click", makeTodo);
todoList.addEventListener("click", CheckDelete);
selection.addEventListener("click", selectOption);



// Functions

function makeTodo(e) {
    
 //prevent from default action
    
    e.preventDefault();

    // creating DIV for individual todo
    if (todoInput.value != "") {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
     
        //creating list for todo

        const List = document.createElement("li");
        List.classList.add("list");
        List.innerText = todoInput.value;

        // Save to Local Storage

        saveToLocalStorage(todoInput.value, false);

        //adding todoList to todoDiv
        todoDiv.appendChild(List);

        //create a "complete" button

        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");
        completeButton.innerHTML = ` <i class = "fas fa-check"></i> `
    
        //create a "delete" button

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = ` <i class = "fas fa-trash"></i> `
    
        //adding buttons to todoDiv

        todoDiv.appendChild(completeButton);
        todoDiv.appendChild(deleteButton);

        //adding todoDiv to the ul

        todoList.appendChild(todoDiv);
        todoInput.value = "";
    }
    else {
        alert("Enter some Text");
    }

}

function CheckDelete(e) {
    
    const item = e.target;
     


    if (item.classList[0] === "delete-button") {
        console.log(item);
        const todo = item.parentElement;
        todo.classList.add("fall");

        //delete from Local Storage
        deleteFromLocalStorage(todo);
        
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }
          if (item.classList[0] === "complete-button") {
           
              const todo = item.parentElement;
              saveToLocalStorage(todo, true);
              todo.classList.toggle("completed");
              
        
    }

}

function selectOption(e) {
    
    const todos = todoList.childNodes;

    todos.forEach(function (todo) {
        
     

        switch ( e.target.value) {
            
            case "all":

                todo.style.display = "flex";
                break;

            case "complete":
                if (todo.classList.contains("completed")) {
                    
                    todo.style.display = "flex";
                    
                
                }
                else {
                    todo.style.display = "none";
                
                }   
                break;
                
                case "incomplete":
                    if (!todo.classList.contains("completed")) {
                        
                        todo.style.display = "flex";
                        
                    
                    }
                    else {
                        todo.style.display = "none";
                    
                 }   

                 
        }


    });

}

function saveToLocalStorage(todo, val) {
    
    let todos;
    let comp;

    if (val === false) {

        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
        
            todos = JSON.parse(localStorage.getItem("todos"));

        }

        todos.push(todo);

        localStorage.setItem("todos", JSON.stringify(todos));
    }
    else {
       
        deleteFromLocalStorage(todo);
        const tod = todo.children[0].innerText;
        if (localStorage.getItem("comp") === null) {
            comp = [];
        } else {
        
            comp = JSON.parse(localStorage.getItem("comp"));

        }

        comp.push(tod);

        localStorage.setItem("comp", JSON.stringify(comp));

        
    }

}

function deleteFromLocalStorage(todo) {

    let todos = JSON.parse(localStorage.getItem("todos"));
    let comp = JSON.parse(localStorage.getItem("comp"));

    const text = todo.children[0].innerText;

    
    const index = todos.indexOf(text);
    
    if (index >= 0) {
        todos.splice(todos.indexOf(text), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    else {

    
        comp.splice(comp.indexOf(text), 1);
        localStorage.setItem("comp", JSON.stringify(comp));
    }
    
   


}





function getTodo(e) {
    
    let todos = JSON.parse(localStorage.getItem("todos"));
    let comp = JSON.parse(localStorage.getItem("comp"));

    todos.forEach(function (todo) {
        
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
     
        //creating list for todo

        const List = document.createElement("li");
        List.classList.add("list");
        List.innerText = todo;
        
       
        //adding todoList to todoDiv
        todoDiv.appendChild(List);

        //create a "complete" button

        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");
        completeButton.innerHTML = ` <i class = "fas fa-check"></i> `
    
        //create a "delete" button

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = ` <i class = "fas fa-trash"></i> `
    
        //adding buttons to todoDiv

        todoDiv.appendChild(completeButton);
        todoDiv.appendChild(deleteButton);

        //adding todoDiv to the ul

        todoList.appendChild(todoDiv);
     

    });


    comp.forEach(function (todo) {
        
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");
     
        //creating list for todo

        const List = document.createElement("li");
        List.classList.add("list");
        List.innerText = todo;
        
       
        //adding todoList to todoDiv
        todoDiv.appendChild(List);

        //create a "complete" button

        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");
        completeButton.innerHTML = ` <i class = "fas fa-check"></i> `
    
        //create a "delete" button

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = ` <i class = "fas fa-trash"></i> `
    
        //adding buttons to todoDiv

        todoDiv.appendChild(completeButton);
        todoDiv.appendChild(deleteButton);
    
        todoDiv.classList.add("completed");
        //adding todoDiv to the ul

        todoList.appendChild(todoDiv);
       

    });


}