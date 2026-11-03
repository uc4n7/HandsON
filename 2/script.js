
let records = [];

let editingIndex = null;

const form = document.getElementById("personForm");

const fields = {
    firstName: document.getElementById("firstName"),
    middleName: document.getElementById("middleName"),
    lastName: document.getElementById("lastName"),
    age: document.getElementById("age")
};

const body = document.getElementById("recordsBody");
const message = document.getElementById("message");

function showMessage(text) {
    message.textContent = text;
}

function clearForm() {
    form.reset();
    editingIndex = null;
    document.getElementById("insertButton").textContent = "Insert";
}

function renderRecords() {
    body.replaceChildren();

    records.forEach((person, index) => {
        const row = document.createElement("tr");

        ["firstName", "middleName", "lastName", "age"].forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = person[key];

            if (key === "age") {
                cell.className = "age";
            }

            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        actionCell.className = "action";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            records.splice(index, 1);
            clearForm();
            renderRecords();
            showMessage("Record deleted.");
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            const selected = records[index];

            fields.firstName.value = selected.firstName;
            fields.middleName.value = selected.middleName;
            fields.lastName.value = selected.lastName;
            fields.age.value = selected.age;

            editingIndex = index;

            document.getElementById("insertButton").textContent = "Update";

            fields.firstName.focus();
            showMessage("Edit the details, then click Update.");
        });

        actionCell.append(deleteButton, editButton);
        row.appendChild(actionCell);
        body.appendChild(row);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const person = {
        firstName: fields.firstName.value.trim(),
        middleName: fields.middleName.value.trim(),
        lastName: fields.lastName.value.trim(),
        age: Number(fields.age.value)
    };

    if (
        !person.firstName ||
        !person.lastName ||
        fields.age.value === "" ||
        !Number.isInteger(person.age) ||
        person.age < 0 ||
        person.age > 150
    ) {
        showMessage("Please enter valid information.");
        return;
    }

    if (editingIndex === null) {
        records.push(person);
        showMessage("Record inserted.");
    } else {
        records[editingIndex] = person;
        showMessage("Record updated.");
    }

    clearForm();
    renderRecords();
});

document.getElementById("clearButton").addEventListener("click", function() {
    clearForm();
    showMessage("Form cleared.");
});

document.getElementById("clearRecords").addEventListener("click", function() {
    if (confirm("Are you sure you want to clear all records?")) {
        records = [];
        clearForm();
        renderRecords();
        showMessage("All records cleared.");
    }
});

function sortRecords() {
    const key = document.getElementById("sortBy").value;

    const direction =
        document.getElementById("sortOrder").value === "asc" ? 1 : -1;

    records.sort((a, b) => {
        if (key === "age") {
            return (a.age - b.age) * direction;
        }

        return a[key].localeCompare(
            b[key],
            undefined,
            { sensitivity: "base" }
        ) * direction;
    });

    renderRecords();
}

document.getElementById("sortBy").addEventListener("change", sortRecords);
document.getElementById("sortOrder").addEventListener("change", sortRecords);

document.getElementById("saveButton").addEventListener("click", function() {
    try {
        localStorage.setItem(
            "javascriptWebOutput2Records",
            JSON.stringify(records)
        );

        showMessage("Records saved to Local Storage.");
    } catch (error) {
        showMessage("Unable to save records.");
    }
});

renderRecords();
