/** ログイン画面JavaScript **/
window.addEventListener('DOMContentLoaded', function () {
    const userName = document.getElementById('sql_userName'); // ユーザー名テキストフィールド
    const startBtn = document.getElementById('sql_loginBtn'); // クイズ開始ボタン

    userName.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const startBtn = document.getElementById('sql_loginBtn'); // クイズ開始ボタン

            this.blur();
            startBtn.click();
        }
    });

    // クイズ開始ボタンを押下
    startBtn.addEventListener('click', function () {
        const loginSec = document.getElementsByClassName('sql_loginSec')[0];
        const quizSec = document.getElementsByClassName('sqq_quizSec')[0];
        const userName = document.getElementById('sql_userName');
        const loginErrorArea = document.getElementsByClassName('sql_loginErrorArea')[0];

        if (isFilled(userName)) {
            // ログインセクションを非表示
            loginSec.classList.add('com_hiddenFlg');
            // ログインエラーエリアを非表示
            loginErrorArea.classList.add('sql_loginErrorHidden');
            // ユーザー名テキストフィールドを正常状態に戻す
            userName.parentElement.classList.remove('com_textField_error');

            // ユーザーデータを登録
            userData.userName = userName.value; // ユーザー名
            userData.loginDate = formatDate(new Date()); // ログイン日時

            // 最初のクイズ情報をセット
            setFirstQuiz();

            // クイズセクションを表示
            quizSec.classList.remove('com_hiddenFlg');
        } else {
            userName.value = '';
            userName.parentElement.classList.add('com_textField_error');
            // ログインエラーエリアを表示
            loginErrorArea.classList.remove('com_hiddenFlg');
        }
    });
});

// 要素の文字数が1文字以上か判定
function isFilled(element) {
    if (element.value.trim().length > 0) {
        return true;
    } else {
        return false;
    }
}

// 最初のクイズをセットする関数
function setFirstQuiz() {
    // 要素を取得
    const quizNum = document.getElementById('sqq_quizNum'); // 問題番号
    const question = document.getElementById('sqq_question'); // 問題文
    const option = document.getElementsByName('sqq_option'); // 選択肢

    quizNum.innerText = '1';
    question.innerText = quizData[0].question;
    for (let i = 0; i < quizData[0].option.length; i++) {
        option[i].innerText = quizData[0].option[i];
    }
}