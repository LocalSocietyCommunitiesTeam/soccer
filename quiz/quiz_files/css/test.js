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

async function logAnswer(userId, loginDate, answerDate, choice, point) {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'setUserLog' });

    try {
        const response = await fetch(newURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                loginDate,
                answerDate,
                choice,
                point
            }),
            timeout: 10000
        });

        const data = response.json();
        
        return data;
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
    const postUserLogBtn = document.getElementById('postUserLogBtn');

    const date = new Date();

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
        fetchUserLog(userData.userId, userData.loginDate, userData.answerDate, userData.choice, userData.point);
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