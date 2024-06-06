/** テスト用JavaScript **/
const WEBAPPURL = 'https://script.google.com/macros/s/AKfycbx0ghxxDOCkNzh1E1aeFkgdR9FaciepvNveDTfCiUJNMZYjYe6bAGc43k7q1dBeldE2/exec';

var quizData;
var logData;
var userData = {
    "userId": "1234567890",
    "loginDate": "2024/05/30 15:46:30",
    "answerDate": "2024/05/30 15:48:27",
    "choice": [
        4,
        3,
        1,
        2,
        3,
        1,
        4,
        2,
        1,
        2
    ],
    "point": 8
};
var resultText = document.getElementById('resultText');

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
    let message = '';
    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const quizzes = await response.json();
        quizData = quizzes.result;
        console.log(quizData);
        message = quizData;
    } catch (e) {
        console.error(e.name, e.message);
        message = e;
    }

    resultText.innerText = message;
}

async function fetchAllRandomQuizzes() {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'allRandomQuizzes' });
    let message = '';
    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const quizzes = await response.json();
        quizData = quizzes.result;
        console.log(quizData);
        message = quizData;
    } catch (e) {
        console.error(e.name, e.message);
        message = e;
    }

    resultText.innerText = message;
}

async function fetchRandomQuizzes(num) {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'randomQuizzes', limitNumOfQuiz: num });
    let message = '';
    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const quizzes = await response.json();
        quizData = quizzes.result;
        console.log(quizData);
        message = quizData;
    } catch (e) {
        console.error(e.name, e.message);
        message = e;
    }

    resultText.innerText = message;
}

async function fetchAllLogs() {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'allLogs' });
    let message = '';
    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const logs = await response.json();
        logData = logs.result;
        console.log(logData);
        message = logData;
    } catch (e) {
        console.error(e.name, e.message);
        message = e;
    }

    resultText.innerText = message;
}

async function fetchUserLog(userId) {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'userLog', userId: userId });
    let message = '';
    try {
        const response = await fetch(newURL, {
            timeout: 10000
        });
        const log = await response.json();
        logData = log.result;
        console.log(logData);
        message = logData;
    } catch (e) {
        console.error(e.name, e.message);
        message = e;
    }

    resultText.innerText = message;
}

async function logAnswer(userId, loginDate, answerDate, choice, point) {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'setUserLog' });
    let message = '';
    try {
        const response = await fetch(newURL, {
            "method": "POST",
            "mode": "no-cors",
            "Content-Type": "application/x-www-form-urlencoded",
            "body": JSON.stringify({
                userId,
                loginDate,
                answerDate,
                choice,
                point
            }),
            "timeout": 10000
        });

        const data = response.json();
        message = data.result;

        return data.result;
    } catch (e) {
        console.error(e.name, e.message);
        message = e;
    }

    resultText.innerText = message;
}


window.addEventListener('DOMContentLoaded', function () {

    const quizBtn = document.getElementById('quizBtn');
    const randomQuizBtn = document.getElementById('randomQuizBtn');
    const random10QuizBtn = document.getElementById('random10QuizBtn');
    const allLogBtn = document.getElementById('allLogBtn');
    const userLogBtn = document.getElementById('userLogBtn');
    const postUserLogBtn = document.getElementById('postUserLogBtn');

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

    postUserLogBtn.addEventListener('click', function () {
        console.log('postUserLogBtn');
        logAnswer(userData.userId, userData.loginDate, userData.answerDate, userData.choice, userData.point);
    });
});


function formatDate(date) {
    let output = '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    output = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    return output;
}

function generateUUID() {
    const hexDigits = '0123456789abcdef';

    let uuid = '';
    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid += '-';
        }
        uuid += hexDigits[Math.floor(Math.random() * 16)];
    }

    return uuid;
}

function saveUuidToLocalStorage() {
    // ローカルストレージから UUID を取得する
    const storedUuid = localStorage.getItem('uuid');

    // UUID が保存されていない場合、新しい UUID を生成して保存する
    if (!storedUuid) {
        const uuid = crypto.randomUUID();
        localStorage.setItem('uuid', uuid);
        console.log('UUID を保存しました:', uuid);
    } else {
        console.log('UUID が保存されています:', storedUuid);
    }
}

saveUuidToLocalStorage();