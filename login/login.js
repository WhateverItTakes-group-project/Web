function authorize(type) {
    const loginToken = 'token'; 

    let authUrl;

    if (type === 'yandex') {
authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=YOUR_YANDEX_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&state=${loginToken}`;
        // Замените YOUR_YANDEX_CLIENT_ID и YOUR_REDIRECT_URI своими значениями
    } else if (type === 'github') {
        authUrl = `https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email&state=${loginToken}`;
        // Заменить нужно YOUR_GITHUB_CLIENT_ID и YOUR_REDIRECT_URI своими значениями
    } else {
        console.error('Неизвестный тип авторизации:', type);
        return;
    }

    window.location.href = authUrl;
}