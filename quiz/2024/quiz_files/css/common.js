/** 共通JavaScript **/
// クイズデータ
var quizData;

// ユーザーデータ
var userData = {
    uuid: null,
    userName: null,
    loginDate: null,
    answerDate: null,
    choice: [],
    point: 0
};

// ログデータ
var logData = [];

// SoccerQuizAppDB2024スプレッドシートのGoogle App ScriptのWEBアプリURL
const WEBAPPURL = 'https://script.google.com/macros/s/AKfycbx0ghxxDOCkNzh1E1aeFkgdR9FaciepvNveDTfCiUJNMZYjYe6bAGc43k7q1dBeldE2/exec';

// タイムアウト時間を30秒に設定
const timeout = 30000;

// すべてのクイズを取得する非同期関数
async function fetchAllQuizzes() {
    // WEBAPPURLにパラメータを追加した新しいURLを作成
    const newURL = addParametersToURL(WEBAPPURL, { action: 'allQuizzes' });

    // メッセージ変数を初期化
    let message = '';

    try {
        // 10秒のタイムアウトを設定してAPIにリクエストを送信
        const response = await fetch(newURL, {
            timeout: timeout
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
            timeout: timeout
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

    try {
        // 10秒のタイムアウトを設定してAPIにリクエストを送信
        const response = await fetch(newURL, {
            timeout: timeout
        });

        // レスポンスからJSONデータをパース
        const result = await response.json();

        quizData = result.result;
    } catch (e) {
        const header = document.getElementsByTagName('header')[0]; // ヘッダー
        const homeSec = document.getElementsByClassName('sqh_homeSec')[0]; // ホームセクション
        const errorSec = document.getElementsByClassName('com_errorSec')[0]; // エラーセクション
        const footer = document.getElementsByTagName('footer')[0]; // フッター
        header.classList.add('com_hiddenFlg');
        homeSec.classList.add('com_hiddenFlg');
        errorSec.classList.remove('com_hiddenFlg');
        footer.classList.add('com_hiddenFlg');
        // エラーが発生した場合
        window.alert('通信エラーが発生しました。\n電波が良い場所でもう一度ページを開いてください。\n\n解決しない場合は違うデバイスでクイズを解くか、管理者に問い合わせてください。\n\n管理者: meijiyasuda.kizuna@gmail.com\n\nError: Don\'t get quiz data.');
    } finally {
        hideLoader();
    }
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
            timeout: timeout
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
            timeout: timeout
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
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(data),
            timeout: timeout
        });

        // レスポンスからJSONデータをパース
        const result = await response.json();

        // 結果メッセージをコンソールに出力
        console.log('result.resultMessage: ' + result.resultMessage);

        // 要素を取得
        const quizSec = document.getElementsByClassName('sqq_quizSec')[0]; // クイズセクション
        const resultSec = document.getElementsByClassName('sqr_resultSec')[0]; // 結果セクション

        // クイズ画面を結果画面に切り替え
        quizSec.classList.add('com_hiddenFlg');
        resultSec.classList.remove('com_hiddenFlg');
    } catch (e) {
        // エラーが発生した場合
        // エラー情報をコンソールに出力
        console.error(e);
        // エラー画面を表示
        displayErrorScreen(e.message);
    } finally {
        hideLoader();
    }
}

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

// UUIDをローカルストレージに保存し、`setUuid` 関数に渡す関数
function saveUuidToLocalStorage() {
    // ローカルストレージから保存済みのUUIDを取得
    const storedUuid = localStorage.getItem('uuid');

    // 保存済みのUUIDがない場合
    if (!storedUuid) {
        // `crypto.randomUUID()` で新しいUUIDを生成
        const uuid = crypto.randomUUID();

        // ローカルストレージに 'uuid' キーで新しいUUIDを保存
        localStorage.setItem('uuid', uuid);

        // 生成したUUIDを `setUuid` 関数に渡す
        setUuid(uuid);
    } else {
        // 保存済みのUUIDを `setUuid` 関数に渡す
        setUuid(storedUuid);
    }
}

// UUIDを `userData` オブジェクトに設定する関数
function setUuid(uuid) {
    // `userData` オブジェクトにUUIDを設定
    userData.uuid = uuid;
}

// DOMContentLoadedイベントにイベントリスナーを登録
window.addEventListener('DOMContentLoaded', function () {
    // 関数：headタグの最後にhiddenクラスを追加する
    addHiddenClassAtEndOfHeadTag();
});

// 関数：headタグの最後にhiddenクラスを追加する
function addHiddenClassAtEndOfHeadTag() {
    // head要素を取得
    const head = document.getElementsByTagName('head')[0];

    // コメントノードを作成（画面共通CSS というコメント）
    const comment = document.createComment('画面共通CSS');

    // style要素を作成
    const style = document.createElement('style');

    // style要素にCSSコードを設定
    style.innerHTML = '.com_hiddenFlg { display: none; }';

    // head要素にコメントノードを追加
    head.appendChild(comment);

    // head要素にstyle要素を追加
    head.appendChild(style);
}

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

// エラー画面を表示する関数
function displayErrorScreen(errMsg) {
    // 要素を取得
    const sec = document.getElementsByClassName('com_screenSec'); // 画面セクション
    const errorSec = document.getElementsByClassName('com_errorSec')[0]; // エラーセクション

    // エラーセクション以外の画面セクションを非表示
    for (let i = 0; i < sec.length; i++) {
        if (sec[i] != errorSec) {
            sec[i].classList.add('com_hiddenFlg');
        }
    }

    // エラーセクションを表示
    errorSec.classList.remove('com_hiddenFlg');
}