/** 共通JavaScript **/
// headタグの最後に非表示用クラスを追加
window.addEventListener('DOMContentLoaded', function () {
    const head = document.getElementsByTagName('head')[0];
    const comment = document.createComment('画面共通CSS');
    const style = document.createElement('style');
    style.innerHTML = '.com_hiddenFlg { display: none; }';
    head.appendChild(comment);
    head.appendChild(style);
});

// クイズデータ
var quizData;
// ユーザーデータ
var userData = {
    userName: null,
    loginDate: null,
    answerDate: null,
    option: [],
    point: null
};

// クイズDBのWEBアプリURL
const QUIZ_DB_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwekpsKlbmS5MX75qUJh-YSjES8wkDGW-FejUZR7QDE0SkXURWGt8fHZIvMEZGmYIU-2g/exec';
// ログDBのWEBアプリURL
const LOG_DB_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwD_Wk8BoPmRiLLu0O1gXvj8bgrglCYsNpHLs2ixYcN638OFjXuobBGCwJjzYEK_Gz5-A/exec';
