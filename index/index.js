const questsCounter = document.querySelector(".questsCounter");
const disciplineFilter = document.getElementById("disciplineFilter");

function loadTests() {
    const getTests = JSON.parse(localStorage.getItem("tests")) || [];
    const testsList = document.querySelector(".tests");
    testsList.innerHTML = "";

    const selectedDiscipline = disciplineFilter.value;

    const filteredTests = getTests.filter(test => 
        selectedDiscipline === "all" || test.discipline === selectedDiscipline
    );

    if (filteredTests.length > 0) {
        filteredTests.forEach((item, index) => {
            testsList.innerHTML += `
                <li class="test-item" data-index="${index}">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </li>`;
        });
    } else {
        const showNotElement = document.querySelector(".show-not");
        showNotElement.innerHTML = `<h3>Тесты отсутствуют</h3>`;
    }

    questsCounter.textContent = filteredTests.length;

    document.querySelectorAll(".test-item").forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const index = item.getAttribute("data-index");
            displayTest(index);
        });
    });
}

function displayTest(index) {
    const getTests = JSON.parse(localStorage.getItem("tests")) || [];
    const rightPanel = document.querySelector(".right-panel");

    if (getTests[index]) {
        const test = getTests[index];
        rightPanel.innerHTML = `
            <h2>${test.title}</h2>
            <p>${test.description}</p>
            <ul>
                ${test.questions.map((q, i) => `
                    <li>
                        <h3>${i + 1}. ${q.question}</h3>
                        <div class="answers">
                            ${q.answers.map((answer, j) => `
                                <label>
                                    <input type="radio" name="answer${i}" value="${j + 1}" /> ${answer}
                                </label><br>
                            `).join("")}
                        </div>
                    </li>
                `).join("")}
            </ul>`;

        test.questions.forEach((q, i) => {
            const selectedAnswer = localStorage.getItem(`selectedAnswer_${index}_${i}`);
            if (selectedAnswer) {
                const answerInput = document.querySelector(`input[name="answer${i}"][value="${selectedAnswer}"]`);
                if (answerInput) {
                    answerInput.checked = true; 
                }
            }
            const answers = document.querySelectorAll(`input[name="answer${i}"]`);
            answers.forEach((answer) => {
                answer.addEventListener("change", (event) => {
                    const selectedAnswer = event.target.value;
                    localStorage.setItem(`selectedAnswer_${index}_${i}`, selectedAnswer);
                });
            });
        });
    }
}

disciplineFilter.addEventListener("change", loadTests);


loadTests();