{
    let tasks = [];

    let hideDoneTasks = false;

    const addNewTasks = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent }];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = tasks.filter((_, index) => index !== taskIndex);

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) =>
            index === taskIndex ? { ...task, done: !task.done } : task
        );

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let taskHtmlString = "";

        for (const task of tasks) {
            taskHtmlString += `			
            <li class="task${task.done && hideDoneTasks ? " tasks__itemHidden" : ""}">
            <button class="task__button js-done">${task.done ? "✔" : ""}</button>
            <span class="task__content${task.done ? " taskDone" : ""}">${task.content}</span>
            <button class="task__button task__button--remove js-remove">🗑️
            </button>
        </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = taskHtmlString;
    };

    const renderButtons = () => {
        let buttonsContent = "";

        if (tasks.length > 0) {
            buttonsContent = `			
            <button class="section__button js-toggleHideDoneTasks"${tasks.some(({ done }) => done) ? " " : "disabled"}>${hideDoneTasks ? "Show" : "Hide"} completed</button>
			<button class="section__button js-markAllTasksDoneButton"${tasks.every(({ done }) => done) ? "disabled" : ""}>Complete all</button>`;
        }
        const buttonsElement = document.querySelector(".js-buttons");
        buttonsElement.innerHTML = buttonsContent;
    };

    const bindButtonsEvents = () => {
        const toggleHideDoneButton = document.querySelector(
            ".js-toggleHideDoneTasks"
        );

        if (toggleHideDoneButton) {
            toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks);
        }

        const markAllTasksDoneButton = document.querySelector(
            ".js-markAllTasksDoneButton"
        );
        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
        bindToggleDoneEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const input = document.querySelector(".js-newTask");
        const newTaskContent = input.value.trim();

        if (newTaskContent !== "") {
            addNewTasks(newTaskContent);
            input.value = "";
          }
      
          input.focus();
        };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}