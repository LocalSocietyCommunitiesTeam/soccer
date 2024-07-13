/** 共通変数・定数 **/
// クイズ上限数
var LIMIT_NUM_OF_QUIZ = 10;

// クイズデータ
var quizData = [];

// ユーザーデータ
var userData = {
    "uuid": null,
    "userName": null,
    "loginDate": null,
    "answerDate": null,
    "choice": [],
    "point": 0
};

// ログデータ
var logData = [];

// SoccerQuizAppDB2024スプレッドシートのGoogle App ScriptのWEBアプリURL
const WEBAPPURL = 'https://script.google.com/macros/s/AKfycbx0ghxxDOCkNzh1E1aeFkgdR9FaciepvNveDTfCiUJNMZYjYe6bAGc43k7q1dBeldE2/exec';

// タイムアウト時間を30秒に設定
const timeout = 30000;

// エラーメッセージ
const errMsg = [
    '通信エラーが発生しました。ネットワーク環境の良い場所で再度開いてみてください。',
    'データが取得できませんでした。シークレットモードで再度開いてみてください。',
    'データを登録できませんでした。シークレットモードで再度開いてみてください。'
]