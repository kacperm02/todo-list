{
    const tasks = [
        
    ];

    const render = () => {
        let htmlString = "";

        for(const task of tasks) {
            htmlString += `
                <li class="list__item${task.done ? " list__item--done" : ""}">
                <button class="js-doneTask task__button">${task.done ? " &#10004" : ""}</button>
                <p class="task__content">${task.content}</p>
                <button class="js-removeTask task__button task__button--remove">&#128465</button>
                </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = htmlString;

        
        
        const removeButtons = document.querySelectorAll(".js-removeTask");

        removeButtons.forEach((removeButtons, index) =>{
            removeButtons.addEventListener("click", () =>{
                removeTask(index);
            })
        })

        const toggleDoneButtons = document.querySelectorAll(".js-doneTask");

        toggleDoneButtons.forEach((toggleDoneButton, index) =>{
            toggleDoneButton.addEventListener("click", () =>{
                toggleTaskDone(index);
            })
        })
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        
        if (newTaskElement !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
        
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    }

    init();
}