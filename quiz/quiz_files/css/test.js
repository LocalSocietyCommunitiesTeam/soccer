/** テスト用JavaScript **/
const WEBAPPURL = 'https://script.google.com/macros/s/AKfycbx0ghxxDOCkNzh1E1aeFkgdR9FaciepvNveDTfCiUJNMZYjYe6bAGc43k7q1dBeldE2/exec';

var quizData;
var logData;

function addParametersToURL(url, params) {
    // URLオブジェクトを作成
    const urlObj = new URL(url);

    // 検索パラメータオブジェクトを取得
    const searchParams = urlObj.searchParams;

    // オブジェクトのキーと値をループ処理
    for (const [key, value] of Object.entries(params)) {
        // 検索パラメータに追加
        searchParams.append(key, value);
    }

    // 修正後のURLを返す
    return urlObj.toString();
}

async function fetchAllQuizzes() {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'allQuizzes' });

    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const quizzes = await response.json();
        quizData = quizzes;
        console.log(quizData);
    } catch (e) {
        console.error(e.name, e.message);
    }
}

async function fetchAllRandomQuizzes() {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'allRandomQuizzes' });

    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const quizzes = await response.json();
        quizData = quizzes;
        console.log(quizData);
    } catch (e) {
        console.error(e.name, e.message);
    }
}

async function fetchRandomQuizzes(num) {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'randomQuizzes', limitNumOfQuiz: num });

    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const quizzes = await response.json();
        quizData = quizzes;
        console.log(quizData);
    } catch (e) {
        console.error(e.name, e.message);
    }
}

async function fetchAllLogs() {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'allLogs' });

    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const logs = await response.json();
        logData = logs;
        console.log(logData);
    } catch (e) {
        console.error(e.name, e.message);
    }
}

async function fetchUserLog(userId) {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'userLog', userId: userId });

    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const log = await response.json();
        logData = log;
        console.log(logData);
    } catch (e) {
        console.error(e.name, e.message);
    }
}

window.addEventListener('DOMContentLoaded', function () {

    const quizBtn = document.getElementById('quizBtn');
    const randomQuizBtn = document.getElementById('randomQuizBtn');
    const random10QuizBtn = document.getElementById('random10QuizBtn');
    const allLogBtn = document.getElementById('allLogBtn');
    const userLogBtn = document.getElementById('userLogBtn');

    quizBtn.addEventListener('click', function () {
        console.log('quizBtn');
        fetchAllQuizzes();
    });

    randomQuizBtn.addEventListener('click', function () {
        console.log('randomQuizBtn');
        fetchAllRandomQuizzes();
    });

    random10QuizBtn.addEventListener('click', function () {
        console.log('random10QuizBtn');
        fetchRandomQuizzes(10);
    });

    allLogBtn.addEventListener('click', function () {
        console.log('allLogBtn');
        fetchAllLogs();
    });

    userLogBtn.addEventListener('click', function () {
        console.log('userLogBtn');
        // fetchUserLog('A123456');
        fetchUserLog('A876771');
    });
});
