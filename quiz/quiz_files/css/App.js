/** 共通 **/
window.addEventListener('DOMContentLoaded', function () {
    const userName = document.getElementById('sql_userName'); // ユーザー名テキストフィールド
    const startBtn = document.getElementById('sql_loginBtn'); // クイズ開始ボタン

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