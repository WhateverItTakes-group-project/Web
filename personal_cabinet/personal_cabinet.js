const usernameDisplay = document.getElementById("usernameDisplay");
const emailDisplay = document.getElementById("emailDisplay");
const platformDisplay = document.getElementById("platformDisplay");
const disciplinesList = document.getElementById("disciplinesList");

// Загрузка данных пользователя из localStorage
// function loadUser Data() {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    usernameDisplay.textContent = userData.username || "Не указано";
    emailDisplay.textContent = userData.email || "Не указано";
    platformDisplay.textContent = userData.platform || "Не указано"; // Отображение платформы входа

    // Отображение созданных дисциплин
    const disciplines = userData.disciplines || [];
    disciplinesList.innerHTML = ""; // Очистка предыдущего списка
    disciplines.forEach(discipline => {
        const li = document.createElement("li");
        li.textContent = discipline;
        disciplinesList.appendChild(li);
    });
// }

// Функция для перенаправления на страницу входа
function redirectToLogin() {
    window.location.href = "/login/login.html"; // Перенаправление на страницу входа
}

// Загрузка данных при загрузке страницы
// loadUser Data();
