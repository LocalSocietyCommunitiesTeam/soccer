/** 画面表示用JavaScript **/
// 10問のランダムなクイズを取得
fetchRandomQuizzes(LIMIT_NUM_OF_QUIZ);

// // すべてのクイズを取得する非同期関数
// async function fetchAllQuizzes() {
//     // WEBAPPURLにパラメータを追加した新しいURLを作成
//     const newURL = addParametersToURL(WEBAPPURL, { action: 'allQuizzes' });

//     try {
//         // 10秒のタイムアウトを設定してAPIにリクエストを送信
//         const response = await fetch(newURL, {
//             timeout: timeout
//         });

//         // レスポンスからJSONデータをパース
//         const quizzes = await response.json();

//         if (quizzes.resultMessage) {
//             // サーバーエラー発生時
//             showErrorSec(quizzes.resultMessage);
//         } else {
//             // 取得したクイズデータをグローバル変数quizDataに格納
//             for (let i = 0; i < quizzes.result.length; i++) {
//                 quizData.push(JSON.parse(quizzes.result[i]));
//             }
//         }
//     } catch (e) {
//         // エラーが発生した場合、エラー画面を表示
//         showErrorSec(errMsg[0]);
//     } finally {
//         // ローダーを非表示
//         hideLoader();
//     }
// }

// // すべてのクイズランダム順で取得する非同期関数
// async function fetchAllRandomQuizzes() {
//     // WEBAPPURLにパラメータを追加した新しいURLを作成
//     const newURL = addParametersToURL(WEBAPPURL, { action: 'allRandomQuizzes' });

//     try {
//         // 10秒のタイムアウトを設定してAPIにリクエストを送信
//         const response = await fetch(newURL, {
//             timeout: timeout
//         });

//         // レスポンスからJSONデータをパース
//         const quizzes = await response.json();

//         if (quizzes.resultMessage) {
//             // サーバーエラー発生時
//             showErrorSec(quizzes.resultMessage);
//         } else {
//             // 取得したクイズデータをグローバル変数quizDataに格納
//             for (let i = 0; i < quizzes.result.length; i++) {
//                 quizData.push(JSON.parse(quizzes.result[i]));
//             }
//         }
//     } catch (e) {
//         // エラーが発生した場合、エラー画面を表示
//         showErrorSec(errMsg[0]);
//     } finally {
//         // ローダーを非表示
//         hideLoader();
//     }
// }

// 指定の問題数のクイズをランダム順で取得する非同期関数
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

        if (result.resultMessage) {
            // サーバーエラー発生時
            showErrorSec(quizzes.resultMessage);
        } else {
            // 取得したクイズデータをグローバル変数quizDataに格納
            for (let i = 0; i < result.result.length; i++) {
                quizData.push(JSON.parse(result.result[i]));
            }
        }
    } catch (e) {
        // エラーが発生した場合、エラー画面を表示
        showErrorSec(errMsg[0]);
    } finally {
        // ローダーを非表示
        hideLoader();
    }
}

// // すべてのログを取得する非同期関数
// async function fetchAllLogs() {
//     // WEBAPPURLにパラメータを追加した新しいURLを作成
//     const newURL = addParametersToURL(WEBAPPURL, { action: 'allLogs' });

//     try {
//         // 10秒のタイムアウトを設定してAPIにリクエストを送信
//         const response = await fetch(newURL, {
//             timeout: timeout
//         });

//         // レスポンスからJSONデータをパース
//         const logs = await response.json();

//         if (logs.resultMessage) {
//             // サーバーエラー発生時
//             showErrorSec(quizzes.resultMessage);
//         } else {
//             // 取得したログデータをグローバル変数logDataに格納
//             logData = logs.result;
//         }
//     } catch (e) {
//         // エラーが発生した場合、エラー画面を表示
//         showErrorSec(errMsg[0]);
//     } finally {
//         // ローダーを非表示
//         hideLoader();
//     }
// }

// // 指定されたユーザー名のログを取得する非同期関数
// async function fetchUserLog(userName) {
//     // WEBAPPURLにパラメータを追加した新しいURLを作成
//     const newURL = addParametersToURL(WEBAPPURL, { action: 'userLog', userName: userName });

//     try {
//         // 10秒のタイムアウトを設定してAPIにリクエストを送信
//         const response = await fetch(newURL, {
//             timeout: timeout
//         });

//         // レスポンスからJSONデータをパース
//         const log = await response.json();

//         if (log.resultMessage) {
//             // サーバーエラー発生時
//             showErrorSec(quizzes.resultMessage);
//         } else {
//             // 取得したログデータをグローバル変数logDataに格納
//             logData = log.result;
//         }
//     } catch (e) {
//         // エラーが発生した場合、エラー画面を表示
//         showErrorSec(errMsg[0]);
//     } finally {
//         // ローダーを非表示
//         hideLoader();
//     }
// }

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

        if (result.resultMessage) {
            // サーバーエラー発生時
            showErrorSec(quizzes.resultMessage);
        } else {
            // 要素を取得
            const quizSec = document.getElementsByClassName('sqq_quizSec')[0]; // クイズセクション
            const resultSec = document.getElementsByClassName('sqr_resultSec')[0]; // 結果セクション

            // クイズ画面を結果画面に切り替え
            quizSec.classList.add('com_hiddenFlg');
            resultSec.classList.remove('com_hiddenFlg');
        }
    } catch (e) {
        // エラーが発生した場合、エラー画面を表示
        showErrorSec(errMsg[0]);
    } finally {
        // フィードバックを表示
        feedback(parseInt(userData.point));
        // 解答情報を表示
        showAnswerInfo();
        // ローダーを非表示
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

// エラー画面を表示する関数
function showErrorSec(errMsg) {
    // 要素を取得
    const header = document.getElementsByTagName('header')[0]; // ヘッダー
    const footer = document.getElementsByTagName('footer')[0]; // フッター
    const sec = document.getElementsByClassName('com_screenSec'); // 画面セクション
    const errLeadText = document.getElementById('com_errLeadText'); // エラーメッセージ
    const errorSec = document.getElementsByClassName('com_errorSec')[0]; // エラーセクション

    // ヘッダー・フッターを非表示
    header.classList.add('com_hiddenFlg');
    footer.classList.add('com_hiddenFlg');

    // エラーセクション以外の画面セクションを非表示
    for (let i = 0; i < sec.length; i++) {
        if (sec[i] != errorSec) {
            sec[i].classList.add('com_hiddenFlg');
        }
    }

    // エラーメッセージをセット
    errLeadText.innerText = errMsg;

    // エラーセクションを表示
    errorSec.classList.remove('com_hiddenFlg');
}

// UUIDを設定
setUuid();

// UUID を設定する関数
function setUuid() {
    let uuid;

    // ローカルストレージから UUID を取得
    try {
        uuid = JSON.parse(localStorage.getItem('userData')).uuid;
    } catch {
        showErrorSec(errMsg[1]);
        // ローカルストレージから UUID を取得できない場合は、新しい UUID を生成
        uuid = crypto.randomUUID();
    } finally {
        // userData オブジェクトに UUID を設定
        userData.uuid = uuid;

        try {
            // 生成した UUID をローカルストレージに保存
            localStorage.setItem('userData', JSON.stringify(userData));
        } catch {
            showErrorSec(errMsg[2]);
        }
    }
}

// DOMツリー読込時の処理
window.addEventListener('DOMContentLoaded', function () {
    // 要素を取得
    const homeSec = document.getElementsByClassName('sqh_homeSec')[0]; // ホームセクション
    const goToLoginBtn = document.getElementById('sqh_goToLoginBtn'); // ログイン画面へボタン

    const userName = document.getElementById('sql_userName'); // ユーザー名入力欄
    const startBtn = document.getElementById('sql_loginBtn'); // クイズ開始ボタン

    // 選択肢ボタンの要素を取得
    const option = document.getElementsByName('sqq_option');

    // ホーム画面押下時の処理
    homeSec.addEventListener('click', function () {
        const goToLoginBtn = document.getElementById('sqh_goToLoginBtn');

        goToLoginBtn.click();
    });

    // ログイン画面へボタン押下時の処理
    goToLoginBtn.addEventListener('click', function (e) {
        e.stopPropagation();

        if (this.classList.contains('sqh_nextBtn_disabled')) {
            return;
        }

        // 要素を取得
        const homeSec = document.getElementsByClassName('sqh_homeSec')[0]; // ホーム画面
        const loginSec = document.getElementsByClassName('sql_loginSec')[0]; // ログイン画面

        // ホーム画面を非表示
        homeSec.classList.add('com_hiddenFlg');
        // ログイン画面を表示
        loginSec.classList.remove('com_hiddenFlg');
    });

    // ユーザー名入力欄Enter時の処理
    userName.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const startBtn = document.getElementById('sql_loginBtn'); // クイズ開始ボタン

            this.blur();
            startBtn.click();
        }
    });

    // クイズ開始ボタンを押下
    startBtn.addEventListener('click', function () {
        const loginSec = document.getElementsByClassName('sql_loginSec')[0]; // ログイン画面
        const quizSec = document.getElementsByClassName('sqq_quizSec')[0]; // クイズ画面

        if (isFilled(userName)) {
            // ログインセクションを非表示
            loginSec.classList.add('com_hiddenFlg');

            // ユーザーデータを登録
            userData.userName = userName.value; // ユーザー名
            userData.loginDate = formatDate(new Date()); // ログイン日時

            // 最初のクイズ情報をセット
            setFirstQuiz();

            // クイズセクションを表示
            quizSec.classList.remove('com_hiddenFlg');

            // ログインエラーを非表示
            hideLoginError();
        } else {
            userName.value = '';
            userName.parentElement.classList.add('c_textField_error');
            // ログインエラーを表示
            showLoginError('値を入力してください');
        }
    });

    // 選択肢ボタン押下時の処理
    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener('change', function () {
            if (this.checked) {
                // 要素を取得
                const quizNum = document.getElementById('sqq_quizNum'); // 問題番号
                const option = document.getElementsByName('sqq_option'); // 選択肢ボタン
                const correctImg = document.getElementById('correct'); // 〇アイコン
                const incorrectImg = document.getElementById('incorrect'); // ×アイコン
                // 現在の問題番号を取得
                const currentQuizNum = parseInt(quizNum.innerText);

                // 選択肢を非活性化
                disactivateOptions();

                // 解答をデータに追加
                userData.choice.push(i + 1);

                // 正誤判定
                if (judgeAnswer(currentQuizNum, i + 1)) {
                    // 正解の場合
                    // 〇を表示
                    correctImg.classList.remove('com_hiddenFlg');
                    // 点数を加点
                    userData.point = userData.point + 1;
                } else {
                    // 不正解の場合
                    // ×を表示
                    incorrectImg.classList.remove('com_hiddenFlg');
                    // 押下した選択肢をグレーに変更
                    this.classList.add('sqq_optionGray');
                }

                // 正解の選択肢をオレンジ色に変更
                option[quizData[currentQuizNum - 1].answer - 1].classList.add('sqq_optionOrange');
                // 1.5秒待つ
                setTimeout(() => {
                    // プログレスバーを進める
                    updateProgressbar();

                    // 選択肢を活性化
                    activateOptions();

                    // 〇×アイコンを非表示
                    if (!correctImg.classList.contains('com_hiddenFlg')) {
                        correctImg.classList.add('com_hiddenFlg');
                    }
                    if (!incorrectImg.classList.contains('com_hiddenFlg')) {
                        incorrectImg.classList.add('com_hiddenFlg');
                    }


                    if (currentQuizNum == 10) {
                        // 最終問題の場合
                        // ローダーを表示
                        showLoader();

                        userData.answerDate = formatDate(new Date());
                        // ログをPOST送信
                        logAnswer(userData);
                    } else {
                        // 1～9問目の場合、次のクイズデータをセット
                        updateQuiz(currentQuizNum);
                    }
                }, 1500);
            }
        });

        // 選択肢Enter時の処理
        option[i].nextElementSibling.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    }
});

// 要素の文字数が1文字以上か判定
function isFilled(element) {
    if (element.value.trim().length > 0) {
        return true;
    } else {
        return false;
    }
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

// 最初のクイズをセットする関数
function setFirstQuiz() {
    // 要素を取得
    const quizNum = document.getElementById('sqq_quizNum'); // 問題番号
    const question = document.getElementById('sqq_question'); // 問題文
    const optionText = document.getElementsByClassName('sqq_optionTypo'); // 選択肢テキスト

    quizNum.innerText = '1';
    question.innerText = quizData[0].question;
    for (let i = 0; i < quizData[0].option.length; i++) {
        optionText[i].innerText = quizData[0].option[i];
    }
}

// ログインエラーを表示する関数
function showLoginError(errMsg) {
    // 要素を取得
    const userName = document.getElementById('sql_userName'); // ユーザー名入力欄
    const loginErrMsg = document.getElementById('sql_loginErrMsg'); // ログインエラーメッセージ
    const loginErrorArea = document.getElementsByClassName('sql_loginErrorArea')[0]; // ログインエラーエリア

    // ユーザー名入力欄をエラー状態にする
    userName.parentElement.classList.add('c_textField_error');
    // ログインエラーメッセージを表示
    loginErrMsg.innerText = errMsg;
    // ログインエラーエリアを表示
    loginErrorArea.classList.remove('sql_loginErrorHidden');
}

// ログインエラーを非表示にする関数
function hideLoginError() {
    // 要素を取得
    const userName = document.getElementById('sql_userName'); // ユーザー名入力欄
    const loginErrMsg = document.getElementById('sql_loginErrMsg'); // ログインエラーメッセージ
    const loginErrorArea = document.getElementsByClassName('sql_loginErrorArea')[0]; // ログインエラーエリア

    // ユーザー名入力欄のエラー状態を解除
    userName.parentElement.classList.remove('c_textField_error');
    // ログインエラーメッセージを表示
    loginErrMsg.innerText = '';
    // ログインエラーエリアを表示
    loginErrorArea.classList.add('sql_loginErrorHidden');
}

// 選択肢を非活性化する関数
function disactivateOptions() {
    const option = document.getElementsByName('sqq_option');

    for (let i = 0; i < option.length; i++) {
        option[i].classList.add('sqq_noClick');
        if (option[i].checked) {
            option[i].checked = false;
        }
    }
};

// 選択肢を活性化する関数
function activateOptions() {
    const option = document.getElementsByName('sqq_option');

    for (let i = 0; i < option.length; i++) {
        option[i].classList.remove('sqq_optionOrange');
        option[i].classList.remove('sqq_optionGray');
        option[i].classList.remove('sqq_noClick');
    }
};

// 正誤判定する関数
// 引数：現在の問題番号、押下した選択肢番号
// 返り値：正解の場合はtrue、不正解の場合はfalse
function judgeAnswer(currentQuizNum, choiceNum) {
    if (choiceNum == quizData[currentQuizNum - 1].answer) {
        return true;
    } else {
        return false;
    }
}

// プログレスバーを更新する関数
function updateProgressbar() {
    // 要素を取得
    const circle = document.getElementsByClassName('c_progressbar_circle'); // プログレスバーの円

    // 活性クラスを次の円へ移動
    for (let i = 1; i < circle.length; i++) {
        if (circle[i - 1].classList.contains('c_progressbar_active')) {
            circle[i - 1].classList.remove('c_progressbar_active');
            circle[i].classList.add('c_progressbar_active');
            break;
        }
    }
}

// 問題情報を更新する関数
function updateQuiz(currentQuizNum) {
    // 要素を取得
    const quizNum = document.getElementById('sqq_quizNum'); // 問題番号
    const question = document.getElementById('sqq_question'); // 問題文
    const optionText = document.getElementsByClassName('sqq_optionTypo'); // 選択肢テキスト

    // 問題番号を更新
    quizNum.innerText = currentQuizNum + 1;
    // 問題文を更新
    question.innerText = quizData[currentQuizNum].question;
    // 選択肢を更新
    for (let i = 0; i < optionText.length; i++) {
        optionText[i].innerText = quizData[currentQuizNum].option[i];
    }
}

// フィードバックを表示する関数（引数：得点）
function feedback(point) {
    // 要素を取得
    const fbMsg = document.getElementById('sqr_message'); // フィードバックメッセージ
    const fbIcon = document.getElementsByClassName('sqr_charactorIcon'); // フィードバックアイコン
    const numOfCorrects = document.getElementById('sqr_numOfCorrects'); // 正解数

    // 得点によってフィードバックメッセージとアイコンを出し分け
    if (0 <= point && point < 5) {
        // 0点以上4点以下の場合
        fbMsg.innerText = 'もっと頑張ろう！';
        fbIcon[0].classList.add('sqr_showFbIcon');
    } else if (5 <= point && point < 8) {
        // 5点以上7点以下の場合
        fbMsg.innerText = 'その調子！';
        fbIcon[1].classList.add('sqr_showFbIcon');
    } else if (8 <= point && point <= 10) {
        // 8点以上の場合
        fbMsg.innerText = 'おめでとう！！';
        fbIcon[2].classList.add('sqr_showFbIcon');
    } else {
        // エラー
        console.log('Error：得点が範囲外です。');
        window.alert('Error：得点が範囲外です。');
    }

    // 正解数を表示
    numOfCorrects.innerText = point;
}

// 解答情報を表示する関数
function showAnswerInfo() {
    // 要素を取得
    const quizJudgeCell = document.getElementsByClassName('sqr_quizJudgeCell'); // 〇×セル
    const resultDialog = document.getElementById('sqr_resultDialog'); // 結果ダイアログ

    for (let i = 0; i < quizJudgeCell.length; i++) {
        // 問題番号を表示
        quizJudgeCell[i].parentElement.getElementsByClassName('sqr_quizNum')[0].innerText = i + 1;

        // 〇×を表示
        showJudgeIcon();

        // 〇×アイコン押下時の処理
        quizJudgeCell[i].firstElementChild.addEventListener('click', function () {
            // ダイアログ内の結果を初期化
            resetResult();
            // ダイアログ内の結果をセット
            setResult(this);
            // 結果ダイアログを表示
            showModalDialog01(resultDialog.getElementsByClassName('c_dialog_modal')[0]);
        });

        // 〇×アイコンEnter時の処理
        quizJudgeCell[i].firstElementChild.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    }
}

// 〇×を表示する関数
function showJudgeIcon() {
    // 要素を取得
    const quizJudgeCell = document.getElementsByClassName('sqr_quizJudgeCell'); // 〇×セル

    for (let i = 0; i < quizJudgeCell.length; i++) {
        if (userData.choice[i] == quizData[i].answer) {
            // 正解の場合、〇アイコンを表示
            quizJudgeCell[i].getElementsByClassName('sqr_correctIcon')[0].classList.remove('com_hiddenFlg');
        } else {
            // 不正解の場合、×アイコンを表示
            quizJudgeCell[i].getElementsByClassName('sqr_incorrectIcon')[0].classList.remove('com_hiddenFlg');
        }
    }
}

// ダイアログ内の結果を初期化する関数
function resetResult() {
    // 要素を取得
    const resultDialog = document.getElementById('sqr_resultDialog'); // 結果ダイアログ
    const dialogOptionText = resultDialog.getElementsByClassName('sqr_typo_optionText'); // 結果ダイアログ内選択肢テキスト
    const tagText = resultDialog.getElementsByClassName('sqr_typo_tag'); // タグテキスト

    for (let i = 0; i < dialogOptionText.length; i++) {
        // 正解選択肢の強調をリセット
        if (dialogOptionText[i].parentElement.classList.contains('sqr_correctOption')) {
            dialogOptionText[i].parentElement.classList.remove('sqr_correctOption');
        }

        // 選択した選択肢の強調をリセット
        if (dialogOptionText[i].parentElement.classList.contains('sqr_choice')) {
            dialogOptionText[i].parentElement.classList.remove('sqr_choice');
        }

        // タグテキストを削除
        tagText[i].innerText = '';
    }
}

// ダイアログ内の結果をセットする関数
function setResult(e) {
    // 要素を取得
    const resultDialog = document.getElementById('sqr_resultDialog'); // 結果ダイアログ
    const dialogQuizNum = resultDialog.getElementsByClassName('sqr_dialogQuizNum')[0]; // 結果ダイアログ内クイズ番号
    const dialogQuestion = resultDialog.getElementsByClassName('sqr_typo_statement')[0]; // 結果ダイアログ内問題文
    const dialogOptionText = resultDialog.getElementsByClassName('sqr_typo_optionText'); // 結果ダイアログ内選択肢テキスト
    const tagText = resultDialog.getElementsByClassName('sqr_typo_tag'); // タグテキスト

    // クイズ番号を取得
    const quizNum = parseInt(e.parentElement.parentElement.getElementsByClassName('sqr_quizNum')[0].innerText);

    // 結果ダイアログ内クイズ番号を表示
    dialogQuizNum.innerText = quizNum;

    // 結果ダイアログ内問題文を表示
    dialogQuestion.innerText = quizData[quizNum - 1].question;

    for (let i = 0; i < dialogOptionText.length; i++) {
        // 結果ダイアログ内選択肢テキストを表示
        dialogOptionText[i].innerText = quizData[quizNum - 1].option[i];

        if (i == quizData[quizNum - 1].answer - 1) {
            // 正解選択肢を強調
            dialogOptionText[i].parentElement.classList.add('sqr_correctOption');
        } else {
            if (i == userData.choice[quizNum - 1] - 1) {
                // 選択した選択肢を強調
                dialogOptionText[i].parentElement.classList.add('sqr_choice');
            }
        }
    }

    // タグテキストを表示
    if (userData.choice[quizNum - 1] == quizData[quizNum - 1].answer) {
        // 正解の場合
        tagText[quizData[quizNum - 1].answer - 1].innerText = '正解・あなたの解答';
    } else {
        // 不正解の場合
        tagText[quizData[quizNum - 1].answer - 1].innerText = '正解';
        tagText[userData.choice[quizNum - 1] - 1].innerText = 'あなたの解答';
    }
}