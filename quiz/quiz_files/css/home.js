/** ホーム画面JavaScript **/
// 10問のランダムなクイズを取得
fetchRandomQuizzes(10);

// ローカルストレージにUUIDを保存し、`setUuid` 関数に渡す
saveUuidToLocalStorage();

window.addEventListener('DOMContentLoaded', function () {
    // 要素を取得
    const homeSec = document.getElementsByClassName('sqh_homeSec')[0]; // ホームセクション
    const goToLoginBtn = document.getElementById('sqh_goToLoginBtn'); // ログイン画面へボタン

    homeSec.addEventListener('click', function () {
        window.alert('ホームセクションをクリック');
        const goToLoginBtn = document.getElementById('sqh_goToLoginBtn');

        goToLoginBtn.click();
    });

    goToLoginBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        
        if (this.classList.contains('sqh_nextBtn_disabled')) {
            return;
        }

        window.alert('ログイン画面へボタンをクリック');

        const homeSec = document.getElementsByClassName('sqh_homeSec')[0];
        const loginSec = document.getElementsByClassName('sql_loginSec')[0];

        homeSec.classList.add('com_hiddenFlg');
        loginSec.classList.remove('com_hiddenFlg');
    });
});

// クイズデータを取得する関数
function getQuizData(url) {
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        return JSON.parse(data);
    }).then((jsonData) => {
        quizData = jsonData;
        // クイズデータをセット
        setQuizData(quizData);
        hideLoader();
    }).catch((error) => {
        console.log('error: ' + error);
        // window.alert('通信エラーが発生しました。\n電波が良い場所でもう一度ページを開いてください。\n\n解決しない場合は管理者に問い合わせてください。\n管理者: meijiyasuda.kizuna@gmail.com');
    });
}

// クイズデータを画面にセットする関数
function setQuizData(data) {
    for (let i = 0; i < data.length; i++) {
        console.log('No.' + (i + 1)
            + '\n\tquizId: ' + data[i].quizId
            + '\n\tquestion: ' + data[i].question
            + '\n\toption: ' + data[i].option
            + '\n\tanswer: ' + data[i].answer + '\n');
    }
    const quizNum = document.getElementById('sqq_quizNum');
    const question = document.getElementById('sqq_question');
    const optionList = document.getElementById('sqq_optionList');
}