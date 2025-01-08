document.getElementById("addQuestionButton").addEventListener("click", () => {
    const questionsContainer = document.getElementById("questionsContainer");
    const questionCount = questionsContainer.children.length;

    // Создание нового блока вопроса
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-block");
    questionDiv.innerHTML = `
        <label for="questionText${questionCount}">Вопрос ${questionCount + 1}:</label>
        <input type="text" id="questionText${questionCount}" required />

        <label for="answer1${questionCount}">Вариант 1:</label>
        <input type="text" id="answer1${questionCount}" required />
        
        <label for="answer2${questionCount}">Вариант 2:</label>
        <input type="text" id="answer2${questionCount}" required />
        
        <label for="answer3${questionCount}">Вариант 3:</label>
        <input type="text" id="answer3${questionCount}" required />

        <label for="answer4${questionCount}">Вариант 4:</label>
        <input type="text" id="answer4${questionCount}" required />
        
        <label for="correctAnswer${questionCount}">Правильный ответ:</label>
        <select id="correctAnswer${questionCount}" required>
            <option value="1">Вариант 1</option>
            <option value="2">Вариант 2</option>
            <option value="3">Вариант 3</option>
            <option value="4">Вариант 4</option>
        </select>
    `;
    questionsContainer.appendChild(questionDiv);
});

const titleInput = document.getElementById("surveyTitle");
const defaultTitleText = "Введите название теста...";

titleInput.addEventListener("focus", () => {
    if (titleInput.innerText === defaultTitleText) {
        titleInput.innerText = "";
    }
});

titleInput.addEventListener("blur", () => {
    if (titleInput.innerText.trim() === "") {
        titleInput.innerText = defaultTitleText; 
    }
});

async function writeNewQuestion() {
    const getTitle = document.getElementById("surveyTitle").innerText;
    const getText = document.getElementById("surveyDescription").value;
    const getSubject = document.getElementById("subject").value;

    if (!getTitle || getTitle === defaultTitleText) {
        return alert("Заполните название теста!");
    }

    const questionsContainer = document.getElementById("questionsContainer");
    if (questionsContainer.children.length < 1) {
        return alert("Добавьте хотя бы один вопрос!");
    }

    const tests = JSON.parse(localStorage.getItem("tests")) || [];
    const questions = [];

    for (let i = 0; i < questionsContainer.children.length; i++) {
        const questionText = document.getElementById(`questionText${i}`).value;
        const answer1 = document.getElementById(`answer1${i}`).value;
        const answer2 = document.getElementById(`answer2${i}`).value;
        const answer3 = document.getElementById(`answer3${i}`).value;
        const answer4 = document.getElementById(`answer4${i}`).value;
        const correctAnswer = document.getElementById(`correctAnswer${i}`).value;

        if (!answer1 || !answer2 || !answer3 || !answer4) {
            return alert("Пожалуйста, заполните все варианты ответов для каждого вопроса.");
        }

        questions.push({
            question: questionText,
            answers: [answer1, answer2, answer3, answer4],
            correctAnswer: correctAnswer,
        });
    }

    tests.push({
        title: getTitle,
        description: getText,
        subject: getSubject, // Сохранение дисциплины
        questions: questions,
    });

    localStorage.setItem("tests", JSON.stringify(tests));
    alert("Тест успешно сохранен!");

    window.location.href = "index.html";
}