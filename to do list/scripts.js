function addTask() {
    const inputElement = document.getElementById('inputTask');
    const taskText = inputElement.value.trim();

    // Prevent adding empty tasks
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskList = document.getElementById('tasklist');
    
    // Create new list item
    const newTask = document.createElement('li');
    
    // Create text container inside <li>
    const textNode = document.createTextNode(taskText);
    newTask.appendChild(textNode);

    // Create delete button inside <li>
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
        newTask.remove();
    };

    // Attach button to task, and task to list
    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);

    // Clear the input box
    inputElement.value = "";
}