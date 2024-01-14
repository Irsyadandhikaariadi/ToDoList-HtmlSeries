document.addEventListener("DOMContentLoaded", function () {
    let addBtn = document.querySelector(".tambah-btn");
    addBtn.addEventListener("click", addToDoItem);

    let clearBtn = document.querySelector(".clear");
    clearBtn.addEventListener("click", clearCompletedToDoItems);

    let emptyBtn = document.querySelector(".empty");
    emptyBtn.addEventListener("click", emptyList);

    let saveBtn = document.querySelector(".save");
    saveBtn.addEventListener("click", saveList);

    let input = document.getElementById("todo-input");
    let list = document.querySelector(".list-todo");

    function makeToDoItem(itemtext, completed) {
        let item = document.createElement("li");
        let text = document.createTextNode(itemtext);
        item.appendChild(text);

        if (completed) {
            item.classList.add("completed");
        }

        list.appendChild(item);
        item.addEventListener("dblclick", toggleToDoItemState);
    }

    function addToDoItem() {
        let textItem = input.value;
        makeToDoItem(textItem, false);
        input.value = textItem;
    }

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }

    let textDecoration = this.style.textDecoration;
    this.style.textDecoration = textDecoration === "line-through" ? "none" : "line-through";
}

    function clearCompletedToDoItems() {
        let completedItems = list.getElementsByClassName("completed");

        while (completedItems.length > 0) {
            completedItems[0].remove();
        }
    }

    function emptyList() {
        list.innerHTML = "";
    }

    function saveList() {
        let toDos = [];

        for (let i = 0; i < list.children.length; i++) {
            let toDo = list.children[i];

            let toDoInfo = {
                "task": toDo.innerText,
                "completed": toDo.classList.contains("completed")
            };

            toDos.push(toDoInfo);
        }

        localStorage.setItem("toDos", JSON.stringify(toDos));
        console.log("List saved");
    }

    function loadList() {
        if (localStorage.getItem("toDos") != null) {
            let toDos = JSON.parse(localStorage.getItem("toDos"));

            for (let i = 0; i < toDos.length; i++) {
                let toDo = toDos[i];
                makeToDoItem(toDo.task, toDo.completed);
            }
        }
    }

    // loadList();
    // saya komen karena agar ketika di refresh list menjadi 0 lagi
});
