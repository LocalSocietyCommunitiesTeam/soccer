/** 共通 **/
let quizData;
window.addEventListener('DOMContentLoaded', function () {
    // クイズデータを取得
    const QUIZ_DB_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwekpsKlbmS5MX75qUJh-YSjES8wkDGW-FejUZR7QDE0SkXURWGt8fHZIvMEZGmYIU-2g/exec';

    fetchfunction(QUIZ_DB_WEB_APP_URL);
});

async function fetchfunction(url) {
    await fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        return JSON.parse(data);
    }).then((jsonData) => {
        quizData = jsonData;
        // 要素を取得
        const loader = document.getElementsByClassName('com_loader')[0]; // ローダー

        // ローダーを非表示
        loader.classList.add('com_loader_hidden');
    }).catch((error) => {
        console.log('error: ' + error);
    });
}

/** ホーム画面 **/
window.addEventListener('DOMContentLoaded', function () {
    const nextBtn = document.getElementById('sqh_nextBtn');

    nextBtn.addEventListener('click', function () {
        const homeSec = document.getElementsByClassName('com_homeSec')[0];
        const loginSec = document.getElementsByClassName('com_loginSec')[0];

        homeSec.classList.add('com_secHidden');
        loginSec.classList.remove('com_secHidden');
    });
});
/** ログイン画面 **/
/** クイズ画面 **/
/** 結果画面 **/