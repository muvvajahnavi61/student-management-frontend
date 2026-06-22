const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");

window.onload = loadStudents;

async function loadStudents() {
    try {
        const response = await fetch("http://localhost:8081/students");
        const students = await response.json();

        tableBody.innerHTML = "";

        students.forEach(student => {
            addRow(student);
        });

    } catch (error) {
        console.error(error);
    }
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value,
        certification: document.getElementById("certification").value,
        futureUse: document.getElementById("futureUse").value
    };

    try {
        const response = await fetch("http://localhost:8081/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const savedStudent = await response.json();

        addRow(savedStudent);

        form.reset();

        alert("Student Added Successfully");

    } catch (error) {
        console.error(error);
    }
});

function addRow(student) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>${student.certification}</td>
        <td>${student.futureUse}</td>
    `;

    tableBody.appendChild(row);
}
function openSuggestions() {

    let course = document.getElementById("course").value;

    localStorage.setItem("course", course);

    window.location.href = "suggestions.html";
}
