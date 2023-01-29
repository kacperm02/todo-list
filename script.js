{
    const tasks = [
        {
            content: "obejrzyj film",
            done:true,
        },
        {
            content: "zrobić stronę",
            done:false,
        }
    ];

    const render = () => {
        let htmlString = "";

        for(const task of tasks) {
            htmlString += `
                <li class="list__item${task.done ? " list__item--done" : ""}">
                <button class="js-doneTask">Zrobione?</button>
                <button class="js-removeTask">Usuń</button>
                ${task.content}
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

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        
        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    }

    init();
}