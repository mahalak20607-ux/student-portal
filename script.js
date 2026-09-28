/* =========================================
   STUDENT REGISTRATION & RESULT PORTAL
========================================= */

const studentForm = document.getElementById("studentForm");
const studentTableBody = document.getElementById("studentTableBody");
const emptyState = document.getElementById("emptyState");
const tableContainer = document.getElementById("tableContainer");
const studentCount = document.getElementById("studentCount");

let students = [];


// =========================================
// FORM SUBMISSION
// =========================================

studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!studentForm.checkValidity()) {
        event.stopPropagation();
        studentForm.classList.add("was-validated");
        return;
    }

    const studentName =
        document.getElementById("studentName").value.trim();

    const registerNumber =
        document.getElementById("registerNumber").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const department =
        document.getElementById("department").value;

    const year =
        document.getElementById("year").value;

    const semester =
        document.getElementById("semester").value;

    const subject1 =
        Number(document.getElementById("subject1").value);

    const subject2 =
        Number(document.getElementById("subject2").value);

    const subject3 =
        Number(document.getElementById("subject3").value);


    // =========================================
    // MARK VALIDATION
    // =========================================

    const marks = [subject1, subject2, subject3];

    const invalidMarks = marks.some(
        mark => mark < 0 || mark > 100
    );

    if (invalidMarks) {
        alert("Marks must be between 0 and 100.");
        return;
    }


    // =========================================
    // CALCULATIONS
    // =========================================

    const total = subject1 + subject2 + subject3;

    const percentage = (total / 300) * 100;

    /*
       Student passes only when every subject
       has at least 40 marks.
    */

    const passed = marks.every(mark => mark >= 40);

    const result = passed ? "PASS" : "FAIL";


    // =========================================
    // CREATE STUDENT OBJECT
    // =========================================

    const student = {
        id: Date.now(),
        name: studentName,
        registerNumber: registerNumber,
        email: email,
        department: department,
        year: year,
        semester: semester,
        total: total,
        percentage: percentage.toFixed(2),
        result: result
    };


    // =========================================
    // ADD STUDENT
    // =========================================

    students.push(student);

    renderStudents();

    studentForm.reset();

    studentForm.classList.remove("was-validated");

    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
});


// =========================================
// DISPLAY STUDENTS
// =========================================

function renderStudents() {

    studentTableBody.innerHTML = "";

    studentCount.textContent = students.length;


    // No records
    if (students.length === 0) {

        emptyState.classList.remove("d-none");
        tableContainer.classList.add("d-none");

        return;
    }


    // Show table
    emptyState.classList.add("d-none");
    tableContainer.classList.remove("d-none");


    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${index + 1}</strong>
            </td>

            <td>
                <div class="student-name">
                    ${escapeHTML(student.name)}
                </div>

                <small class="text-muted">
                    ${escapeHTML(student.year)}
                </small>
            </td>

            <td>
                <span class="register-number">
                    ${escapeHTML(student.registerNumber)}
                </span>
            </td>

            <td>
                ${escapeHTML(student.department)}
            </td>

            <td>
                <strong>${student.total}/300</strong>
            </td>

            <td>
                <strong>${student.percentage}%</strong>
            </td>

            <td>
                <span class="
                    result-badge
                    ${student.result === "PASS"
                        ? "result-pass"
                        : "result-fail"}
                ">
                    ${student.result}
                </span>
            </td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})"
                    title="Delete student"
                >
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}


// =========================================
// DELETE STUDENT
// =========================================

function deleteStudent(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this student record?"
    );

    if (!confirmed) {
        return;
    }

    students = students.filter(
        student => student.id !== id
    );

    renderStudents();
}


// =========================================
// HTML SECURITY HELPER
// =========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =========================================
// INITIAL RENDER
// =========================================

renderStudents();