/** 共通 **/
/* コンポーネント：ローダー */
function showLoader() {
    const loader = document.getElementsByClassName('com_loader')[0];

    loader.classList.remove('com_loader_hidden');
}

function hideLoader() {
    const loader = document.getElementsByClassName('com_loader')[0];

    loader.classList.add('com_loader_hidden');
}

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

        hideLoader();
    }).catch((error) => {
        console.log('error: ' + error);
        window.alert('通信エラーが発生しました。\n電波が良い場所でもう一度ページを開いてください。\n\n解決しない場合は管理者に問い合わせてください。\n管理者: meijiyasuda.kizuna@gmail.com');
    });
}

/** ホーム画面 **/
window.addEventListener('DOMContentLoaded', function () {
    const main = document.getElementsByTagName('main')[0];
    const nextBtn = document.getElementById('sqh_nextBtn');

    main.addEventListener('click', function () {
        const nextBtn = document.getElementById('sqh_nextBtn');

        nextBtn.click();
    });

    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();

        const homeSec = document.getElementsByClassName('com_homeSec')[0];
        const loginSec = document.getElementsByClassName('com_loginSec')[0];

        homeSec.classList.add('com_secHidden');
        loginSec.classList.remove('com_secHidden');
    });
});

/** ログイン画面 **/
window.addEventListener('DOMContentLoaded', function () {
    const userName = document.getElementById('userName');
    const loginBtn = document.getElementById('loginBtn');

    function isFilled(element) {
        if (element.value.trim().length > 0) {
            return true;
        } else {
            return false;
        }
    }

    userName.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const userName = document.getElementById('userName');
            const loginBtn = document.getElementById('loginBtn');

            userName.blur();
            loginBtn.click();
        }
    });

    loginBtn.addEventListener('click', function () {
        showLoader();

        const userName = document.getElementById('userName');
        if (isFilled(userName)) {
            const loginSec = document.getElementsByClassName('com_loginSec')[0];
            const quizSec = document.getElementsByClassName('com_quizSec')[0];

            userName.parentElement.classList.remove('com_textField_error');
            loginSec.classList.add('com_secHidden');
            quizSec.classList.remove('com_secHidden');
        } else {
            userName.value = '';
            userName.parentElement.classList.add('com_textField_error');
        }

        hideLoader();
    });
});

/** クイズ画面 **/
/** 結果画面 **/