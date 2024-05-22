/** 共通 **/
/* コンポーネント：ローダー */
if (document.getElementsByClassName('com_loader')) {
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
}

window.addEventListener('DOMContentLoaded', function () {
    // クイズDBのWEBアプリURL
    const QUIZ_DB_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwekpsKlbmS5MX75qUJh-YSjES8wkDGW-FejUZR7QDE0SkXURWGt8fHZIvMEZGmYIU-2g/exec';
    // クイズデータの取得
    fetchfunction(QUIZ_DB_WEB_APP_URL);

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

    // クイズデータを画面にセット
    function setQuizData(quizData) {
        window.alert('quizData:\n' + quizData);
        const quizNum = document.getElementById('sqq_quizNum');
        const question = document.getElementById('sqq_question');
        const optionList = document.getElementById('sqq_optionList');
    }

    // 要素を取得
    const homeSec = document.getElementsByClassName('com_homeSec')[0]; // ホームセクション
    const goToLoginBtn = document.getElementById('sqh_goToLoginBtn'); // ログイン画面へボタン
    const userName = document.getElementById('sql_userName'); // ユーザー名テキストフィールド
    const startBtn = document.getElementById('sql_loginBtn'); // クイズ開始ボタン

    homeSec.addEventListener('click', function () {
        window.alert('ホームセクションをクリック');
        const goToLoginBtn = document.getElementById('sqh_goToLoginBtn');

        goToLoginBtn.click();
    });

    goToLoginBtn.addEventListener('click', function (e) {
        window.alert('ログイン画面へボタンをクリック');
        e.stopPropagation();

        window.navigator.vibrate(200);

        const homeSec = document.getElementsByClassName('com_homeSec')[0];
        const loginSec = document.getElementsByClassName('com_loginSec')[0];

        homeSec.classList.add('com_secHidden');
        loginSec.classList.remove('com_secHidden');
    });

    userName.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            window.alert('ユーザー名テキストフィールドでEnterキーを押下');

            this.blur();
            this.click();
        }
    });

    // クイズ開始ボタンを押下
    startBtn.addEventListener('click', function () {
        const loginSec = document.getElementsByClassName('com_loginSec')[0];
        const quizSec = document.getElementsByClassName('com_quizSec')[0];
        const userName = document.getElementById('sql_userName');
        const loginErrorArea = document.getElementsByClassName('sql_loginErrorArea')[0];

        if (isFilled(userName)) {
            // ローダーを表示
            showLoader();

            // ログインエラーエリアを非表示
            loginErrorArea.classList.add('sql_loginErrorHidden');

            userName.parentElement.classList.remove('com_textField_error');
            loginSec.classList.add('com_secHidden');
            quizSec.classList.remove('com_secHidden');

            /* ここでデータを登録 */
            // ユーザー名
            // ログイン日時

        } else {
            userName.value = '';
            userName.parentElement.classList.add('com_textField_error');
            // ログインエラーエリアを表示
            loginErrorArea.classList.remove('sql_loginErrorHidden');
        }

        // ローダーを非表示
        hideLoader();
    });

    // 要素の文字数が1文字以上か判定
    function isFilled(element) {
        if (element.value.trim().length > 0) {
            return true;
        } else {
            return false;
        }
    }
});

/** ホーム画面 **/
/** ログイン画面 **/
/** クイズ画面 **/
/** 結果画面 **/