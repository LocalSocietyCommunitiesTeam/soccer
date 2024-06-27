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
        const goToLoginBtn = document.getElementById('sqh_goToLoginBtn');

        goToLoginBtn.click();
    });

    goToLoginBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        
        if (this.classList.contains('sqh_nextBtn_disabled')) {
            return;
        }

        const homeSec = document.getElementsByClassName('sqh_homeSec')[0];
        const loginSec = document.getElementsByClassName('sql_loginSec')[0];

        homeSec.classList.add('com_hiddenFlg');
        loginSec.classList.remove('com_hiddenFlg');
    });
});