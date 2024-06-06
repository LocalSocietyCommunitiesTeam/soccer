/** テスト用JavaScript **/
const WEBAPPURL = 'https://script.google.com/macros/s/AKfycbx0ghxxDOCkNzh1E1aeFkgdR9FaciepvNveDTfCiUJNMZYjYe6bAGc43k7q1dBeldE2/exec';

var quizData;
var logData;
var userData = {
    uuid: generateUUID(),
    userName: "1234567890",
    loginDate: formatDate(new Date()),
    answerDate: formatDate(new Date()),
    choice: [getRandomNum(1, 4), getRandomNum(1, 4), getRandomNum(1, 4), getRandomNum(1, 4), getRandomNum(1, 4), getRandomNum(1, 4), getRandomNum(1, 4), getRandomNum(1, 4), getRandomNum(1, 4), getRandomNum(1, 4)],
    point: getRandomNum(0, 10)
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

async function fetchUserLog(userName) {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'userLog', userName: userName });
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

async function logAnswer(data) {
    const newURL = addParametersToURL(WEBAPPURL, { action: 'setUserLog' });

    try {
        const response = await fetch(newURL, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "body": JSON.stringify(data),
            "timeout": 10000
        });

        const result = await response.json();
        console.log('result.resultMessage: ' + result.resultMessage);
    } catch (e) {
        console.error(e);
    }
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
        fetchUserLog(userData.userName);
    });

    postUserLogBtn.addEventListener('click', function () {
        console.log('postUserLogBtn');
        console.log('userData(JSON)\n' + JSON.stringify(userData));
        logAnswer(userData);
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

function getUUID() {
    return localStorage.getItem('uuid');
}

function saveUuidToLocalStorage() {
    // ローカルストレージから UUID を取得する
    const storedUuid = getUUID();

    // UUID が保存されていない場合、新しい UUID を生成して保存する
    if (!storedUuid) {
        const uuid = crypto.randomUUID();
        localStorage.setItem('uuid', uuid);
    }
}

saveUuidToLocalStorage();

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}