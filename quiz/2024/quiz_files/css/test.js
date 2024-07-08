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

// URLにパラメータを追加する関数
function addParametersToURL(url, params) {
    // URLオブジェクトを作成
    const urlObj = new URL(url);

    // 検索パラメータを取得
    const searchParams = urlObj.searchParams;

    // パラメータをループ処理
    for (const [key, value] of Object.entries(params)) {
        // 検索パラメータにキーと値を追加
        searchParams.append(key, value);
    }

    // URLオブジェクトを文字列に変換して返す
    return urlObj.toString();
}

// すべてのクイズを取得する非同期関数
async function fetchAllQuizzes() {
    // WEBAPPURLにパラメータを追加した新しいURLを作成
    const newURL = addParametersToURL(WEBAPPURL, { action: 'allQuizzes' });

    // メッセージ変数を初期化
    let message = '';

    try {
        // 10秒のタイムアウトを設定してAPIにリクエストを送信
        const response = await fetch(newURL, {
            timeout: 10000
        });

        // レスポンスからJSONデータをパース
        const quizzes = await response.json();

        // 取得したクイズデータをグローバル変数quizDataに格納
        quizData = quizzes.result;

        // コンソールにクイズデータを出力
        console.log(quizData);

        // メッセージ変数にクイズデータを格納
        message = quizData;
    } catch (e) {
        // エラーが発生した場合、エラー情報をコンソールに出力
        console.error(e.name, e.message);

        // メッセージ変数にエラーオブジェクトを格納
        message = e;
    }

    // 結果表示領域にメッセージを設定
    resultText.innerText = message;
}

// すべてのランダムクイズを取得する非同期関数
async function fetchAllRandomQuizzes() {
    // WEBAPPURLにパラメータを追加した新しいURLを作成
    const newURL = addParametersToURL(WEBAPPURL, { action: 'allRandomQuizzes' });

    // メッセージ変数を初期化
    let message = '';

    try {
        // 10秒のタイムアウトを設定してAPIにリクエストを送信
        const response = await fetch(newURL, {
            timeout: 10000
        });

        // レスポンスからJSONデータをパース
        const quizzes = await response.json();

        // 取得したクイズデータをグローバル変数quizDataに格納
        quizData = quizzes.result;

        // コンソールにクイズデータを出力
        console.log(quizData);

        // メッセージ変数にクイズデータを格納
        message = quizData;
    } catch (e) {
        // エラーが発生した場合、エラー情報をコンソールに出力
        console.error(e.name, e.message);

        // メッセージ変数にエラーオブジェクトを格納
        message = e;
    }

    // 結果表示領域にメッセージを設定
    resultText.innerText = message;
}

// ランダムなクイズを取得する非同期関数
async function fetchRandomQuizzes(num) {
    // WEBAPPURLにパラメータを追加した新しいURLを作成
    const newURL = addParametersToURL(WEBAPPURL, { action: 'randomQuizzes', limitNumOfQuiz: num });

    // メッセージ変数を初期化
    let message = '';

    try {
        // 10秒のタイムアウトを設定してAPIにリクエストを送信
        const response = await fetch(newURL, {
            timeout: 10000
        });

        // レスポンスからJSONデータをパース
        const quizzes = await response.json();

        // 取得したクイズデータをグローバル変数quizDataに格納
        quizData = quizzes.result;

        // コンソールにクイズデータを出力
        console.log(quizData);

        // メッセージ変数にクイズデータを格納
        message = quizData;
    } catch (e) {
        // エラーが発生した場合、エラー情報をコンソールに出力
        console.error(e.name, e.message);

        // メッセージ変数にエラーオブジェクトを格納
        message = e;
    }

    // 結果表示領域にメッセージを設定
    resultText.innerText = message;
}

// すべてのログを取得する非同期関数
async function fetchAllLogs() {
    // WEBAPPURLにパラメータを追加した新しいURLを作成
    const newURL = addParametersToURL(WEBAPPURL, { action: 'allLogs' });

    // メッセージ変数を初期化
    let message = '';

    try {
        // 10秒のタイムアウトを設定してAPIにリクエストを送信
        const response = await fetch(newURL, {
            timeout: 10000
        });

        // レスポンスからJSONデータをパース
        const logs = await response.json();

        // 取得したログデータをグローバル変数logDataに格納
        logData = logs.result;

        // コンソールにログデータを出力
        console.log(logData);

        // メッセージ変数にログデータを格納
        message = logData;
    } catch (e) {
        // エラーが発生した場合、エラー情報をコンソールに出力
        console.error(e.name, e.message);

        // メッセージ変数にエラーオブジェクトを格納
        message = e;
    }

    // 結果表示領域にメッセージを設定
    resultText.innerText = message;
}

// 指定されたユーザー名のログを取得する非同期関数
async function fetchUserLog(userName) {
    // WEBAPPURLにパラメータを追加した新しいURLを作成
    const newURL = addParametersToURL(WEBAPPURL, { action: 'userLog', userName: userName });

    // メッセージ変数を初期化
    let message = '';

    try {
        // 10秒のタイムアウトを設定してAPIにリクエストを送信
        const response = await fetch(newURL, {
            timeout: 10000
        });

        // レスポンスからJSONデータをパース
        const log = await response.json();

        // 取得したログデータをグローバル変数logDataに格納
        logData = log.result;

        // コンソールにログデータを出力
        console.log(logData);

        // メッセージ変数にログデータを格納
        message = logData;
    } catch (e) {
        // エラーが発生した場合、エラー情報をコンソールに出力
        console.error(e.name, e.message);

        // メッセージ変数にエラーオブジェクトを格納
        message = e;
    }

    // 結果表示領域にメッセージを設定
    resultText.innerText = message;
}

// 回答をログに記録する非同期関数
async function logAnswer(data) {
    // WEBAPPURLにパラメータを追加した新しいURLを作成
    const newURL = addParametersToURL(WEBAPPURL, { action: 'setUserLog' });

    try {
        // POSTメソッドでAPIにリクエストを送信
        const response = await fetch(newURL, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "body": JSON.stringify(data),
            "timeout": 10000
        });

        // レスポンスからJSONデータをパース
        const result = await response.json();

        // 結果メッセージをコンソールに出力
        console.log('result.resultMessage: ' + result.resultMessage);
    } catch (e) {
        // エラーが発生した場合、エラー情報をコンソールに出力
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

// 日付をフォーマットする関数
function formatDate(date) {
    // 出力文字列を初期化
    let output = '';

    // 年、月、日、時、分、秒を取得
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 出力文字列を組み立て
    output = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    // フォーマット済みの日付文字列を返す
    return output;
}

// ランダムなUUIDを生成する関数
function generateUUID() {
    // 16進数の桁
    const hexDigits = '0123456789abcdef';

    // 生成するUUIDを格納する変数
    let uuid = '';

    // 36回ループ
    for (let i = 0; i < 36; i++) {
        // 特定のインデックスでハイフンを追加
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid += '-';
        }

        // ランダムな16進数文字を取得
        const randomDigit = hexDigits[Math.floor(Math.random() * 16)];

        // UUID文字列にランダムな16進数文字を追加
        uuid += randomDigit;
    }

    // 生成したUUIDを返す
    return uuid;
}

// ローカルストレージからUUIDを取得する関数
function getUUID() {
    // ローカルストレージから 'uuid' キーで保存されている値を取得
    return localStorage.getItem('uuid');
}

// UUIDをローカルストレージに保存する関数
function setUuid() {
    // ローカルストレージから保存済みのUUIDを取得
    const storedUuid = getUUID();

    // 保存済みのUUIDがない場合
    if (!storedUuid) {
        // `crypto.randomUUID()` で新しいUUIDを生成
        const uuid = crypto.randomUUID();

        // ローカルストレージに 'uuid' キーで新しいUUIDを保存
        localStorage.setItem('uuid', uuid);
    }
}

saveUuidToLocalStorage();

// 指定された範囲内のランダムな整数を生成する関数
function getRandomNum(min, max) {
    // minからmaxまでの範囲でランダムな整数値を生成
    const randomNum = Math.floor(Math.random() * (max - min)) + min;

    // 生成したランダムな整数を返す
    return randomNum;
}
