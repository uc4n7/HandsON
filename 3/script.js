
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");
const todoTable = document.getElementById("todoTable");
const message = document.getElementById("message");

loadBtn.addEventListener("click", function() {
    message.textContent = "Loading data...";
    todoTable.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/todos/")
        .then(function(response) {
            if (!response.ok) {
                throw new Error("HTTP Error: " + response.status);
            }
            return response.json();
        })
        .then(function(data) {
            data.forEach(function(todo) {
                const row = document.createElement("tr");

                const userId = document.createElement("td");
                const taskId = document.createElement("td");
                const title = document.createElement("td");
                const status = document.createElement("td");

                userId.textContent = todo.userId;
                taskId.textContent = todo.id;
                title.textContent = todo.title;

                status.textContent = todo.completed
                    ? "Completed"
                    : "Not yet Completed";

                status.className = todo.completed
                    ? "completed"
                    : "not-completed";

                row.appendChild(userId);
                row.appendChild(taskId);
                row.appendChild(title);
                row.appendChild(status);

                todoTable.appendChild(row);
            });

            message.textContent = "Successfully loaded " + data.length + " records.";
        })
        .catch(function(error) {
            message.textContent = "Error: " + error.message;
            console.error(error);
        });
});

clearBtn.addEventListener("click", function() {
    todoTable.innerHTML = "";
    message.textContent = "Table cleared.";
});
