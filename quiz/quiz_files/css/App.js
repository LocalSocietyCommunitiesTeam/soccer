/** 共通 **/
/* コンポーネント：ローダー */
// ローダーを表示
function showLoader() {
    const loader = document.getElementsByClassName('com_loader')[0];

    loader.classList.remove('com_loader_hidden');
}

// ローダーを非表示
function hideLoader() {
    const loader = document.getElementsByClassName('com_loader')[0];

    loader.classList.add('com_loader_hidden');
}

// クイズDBのWEBアプリURL
const QUIZ_DB_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwekpsKlbmS5MX75qUJh-YSjES8wkDGW-FejUZR7QDE0SkXURWGt8fHZIvMEZGmYIU-2g/exec';


window.addEventListener('DOMContentLoaded', function () {
    // クイズデータの取得
    fetchfunction(QUIZ_DB_WEB_APP_URL);

});

async function fetchfunction(url) {
    await fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        return JSON.parse(data);
    }).then((jsonData) => {
        setQuizData(jsonData);
        hideLoader();
    }).catch((error) => {
        console.log('error: ' + error);
        // window.alert('通信エラーが発生しました。\n電波が良い場所でもう一度ページを開いてください。\n\n解決しない場合は管理者に問い合わせてください。\n管理者: meijiyasuda.kizuna@gmail.com');
    });
}

function setQuizData(quizData) {
    const quizNum = document.getElementById('sqq_quizNum');
    const question = document.getElementById('sqq_question');
    const optionList = document.getElementById('sqq_optionList');
}

/** ホーム画面 **/
window.addEventListener('DOMContentLoaded', function () {
    const homeSec = document.getElementsByClassName('com_homeSec')[0];
    const goToLoginBtn = document.getElementById('sqh_goToLoginBtn');

    homeSec.addEventListener('click', function () {
        const goToLoginBtn = document.getElementById('sqh_goToLoginBtn');

        goToLoginBtn.click();
    });

    goToLoginBtn.addEventListener('click', function (e) {
        e.stopPropagation();

        const homeSec = document.getElementsByClassName('com_homeSec')[0];
        const loginSec = document.getElementsByClassName('com_loginSec')[0];

        homeSec.classList.add('com_secHidden');
        loginSec.classList.remove('com_secHidden');
    });
});

/** ログイン画面 **/
window.addEventListener('DOMContentLoaded', function () {
    const userName = document.getElementById('sql_userName');
    const loginBtn = document.getElementById('sql_loginBtn');

    userName.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const userName = document.getElementById('userName');

            userName.blur();
            this.click();
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

function isFilled(element) {
    if (element.value.trim().length > 0) {
        return true;
    } else {
        return false;
    }
}

/** クイズ画面 **/
/** 結果画面 **/