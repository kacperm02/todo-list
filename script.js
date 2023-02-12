{
    let tasks = [

    ];

    let hideDoneTasks = false;

    const render = () => {
        let htmlString = "";

        bindButtons();

        for (const task of tasks) {
            htmlString += `
                <li class="${task.done && hideDoneTasks ? "list__item--hidden " :""}list__item${task.done ? " list__item--done" : ""}">
                <button class="js-doneTask task__button">${task.done ? " &#10004" : ""}</button>
                <p class="task__content">${task.content}</p>
                <button class="js-removeTask task__button task__button--remove">&#128465</button>
                </li>
            `;
        }

        document.querySelector(".js-tasksList").innerHTML = htmlString;
        


        const removeButtons = document.querySelectorAll(".js-removeTask");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            })
        })

        const toggleDoneButtons = document.querySelectorAll(".js-doneTask");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        })
    };

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, {content: newTaskContent}];

        isListEmpty();
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0,taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        isListEmpty();
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
        newTaskElement.value = "";
        newTaskElement.focus();

    };

    const isListEmpty = () => {
        const taskList = document.querySelector(".js-taskList__header");
        if (tasks.length > 0) {
            taskList.innerHTML = `
            <li class="tasksList__item tasksList__header">Lista Zadań</li>
            <button class="tasksList__item tasksList__item--clickable js-displayDoneTasks">${hideDoneTasks ? "Pokaż" :"Ukryj"} ukończone</li>
            <button class="tasksList__item tasksList__item--clickable js-doneAllTasksButton" ${tasks.every(({ done }) => done) ? " disabled" : ""}>Ukończ wszystkie</li>
            `;
        }
        else {
            taskList.innerHTML = `
            <li class="tasksList__item tasksList__header">Lista Zadań</li>
            `;
        }
    }

    const bindButtons = () => {
        const hideButton = document.querySelector(".js-displayDoneTasks");
        const doneButton = document.querySelector(".js-doneAllTasksButton");

        if (hideButton) {
            hideButton.addEventListener("click", toggleHideDoneTasks);
        }

        if (doneButton) {
            doneButton.addEventListener("click", getAllTasksDone);
        }
    }

    const getAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done:true,
        }));

        render();
    }

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    }

    init();
}