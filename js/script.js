/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
    // Array of colors for background change
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Function to change background color with a gradient effect
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop back to the start of color array
    };

    // Change color every 2 seconds
    setInterval(changeBackgroundColor, 2000);
});

let addButton = document.getElementById("addTask"); // "Add" button
let askUserButton = document.getElementById("askUser"); // "Ask User" button
let input = document.getElementById("userInput");
let ul = document.getElementById("taskList");
let item = document.getElementsByTagName("li");

// Check input field length
function inputLength() {
    return input.value.length;
}

// Check the number of list items
function listLength() {
    return item.length;
}

// Create a new list element
function createListElement() {
    let li = document.createElement("li"); // Create a new "li" element
    li.appendChild(document.createTextNode(input.value)); // Add input field text to the list item
    ul.appendChild(li); // Append the list item to the "ul"
    input.value = ""; // Clear the input field

    // Toggle strikethrough on click
    function crossOut() {
        li.classList.toggle("done"); // Toggle "done" class on the list item
    }

    li.addEventListener("click", crossOut);

    // Add delete button
    let dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X")); // Add "X" as delete button text
    li.appendChild(dBtn);

    // Delete list item on delete button click
    dBtn.addEventListener("click", () => {
        ul.removeChild(li);
    });
}

// Add a list item after "Add" button click
function addListAfterClick() {
    if (inputLength() > 0) { // Ensure input field is not empty
        createListElement();
    }
}

// Add a list item after pressing the "Enter" key
function addListAfterKeypress(event) {
    if (inputLength() > 0 && event.which === 13) { // Check if "Enter" key (key code 13) is pressed
        createListElement();
    }
}

// Continuously prompt the user to enter tasks (for "Ask User" button)
function askUserForTasks() {
    let task;
    while (true) {
        task = prompt("Enter a new task (type 'cancel' to stop):");
        if (task === null || task.toLowerCase() === "cancel") {
            break; // Exit the loop if user cancels
        } else if (task.length > 0 && !isDuplicate(task)) {
            input.value = task; // Set input field value to user input
            createListElement(); // Add task to the list
        } else if (isDuplicate(task)) {
            alert("This task already exists!");
        }
    }
}

// Check if the task is a duplicate
function isDuplicate(task) {
    let tasks = document.querySelectorAll("li");
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].firstChild.textContent === task) {
            return true; // Return true if task is already in the list
        }
    }
    return false; // Return false if task is new
}

// Add event listener for the "Add" button
addButton.addEventListener("click", addListAfterClick);

// Add event listener for the "Enter" key press
input.addEventListener("keypress", addListAfterKeypress);

// Add event listener for the "Ask User" button
askUserButton.addEventListener("click", askUserForTasks);
