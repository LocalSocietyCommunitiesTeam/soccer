/** クイズ画面JavaScript **/
window.addEventListener('DOMContentLoaded', function () {
    // 選択肢ボタンの要素を取得
    const option = document.getElementsByName('sqq_option');

    // 選択肢ボタン押下時の処理
    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener('change', function () {
            if (this.checked) {
                // 要素を取得
                const quizNum = document.getElementById('sqq_quizNum'); // 問題番号
                const option = document.getElementsByName('sqq_option'); // 選択肢ボタン

                // 現在の問題番号を取得
                const currentQuizNum = parseInt(quizNum.innerText);

                // 選択肢を非活性化
                disactivateOptions();

                console.log('選択：' + (i + 1) + '番目');
                console.log('正解：' + quizData[currentQuizNum - 1].answer + '番目');

                // 正誤判定
                if (judgeAnswer(currentQuizNum, i + 1)) {
                    // 正解の場合
                    // 〇を表示
                    const correctImg = document.getElementById('correct');
                    correctImg.classList.remove('sqq_none');
                    correctImg.classList.remove('sqq_transmission');
                } else {
                    // 不正解の場合
                    // ×を表示
                    const incorrectImg = document.getElementById('incorrect');
                    incorrectImg.classList.remove('sqq_none');
                    incorrectImg.classList.remove('sqq_transmission');
                    // 押下した選択肢をグレーに変更
                    this.classList.add('sqq_optionGray');
                }

                // 正解の選択肢をオレンジ色に変更
                option[quizData[currentQuizNum - 1].answer - 1].classList.add('sqq_choiceOrange');
                // 1.5秒待つ
                // プログレスバーを進める
                // 選択肢を活性化
                activateOptions();
                // 次のクイズデータをセット
            }
        });
    }
});

// 選択肢を非活性化する関数
function disactivateOptions() {
    const option = document.getElementsByName('sqq_option');

    for (let i = 0; i < option.length; i++) {
        option[i].classList.add('sqq_noClick');
    }
};

// 選択肢を活性化する関数
function activateOptions() {
    const option = document.getElementsByName('sqq_option');

    for (let i = 0; i < option.length; i++) {
        option[i].classList.remove('sqq_optionGray');
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

// 解答データを追加する関数
function addAnswerData() {
    // 要素を取得
    const quizNum = document.getElementById('sqq_quizNum'); // 問題番号
    const option = document.getElementsByName('sqq_option'); // 選択肢ボタン

    // 現在の問題番号を取得
    const currentQuizNum = parseInt(quizNum.innerText);

    for (let i = 0; i < option.length; i++) {
        if (option[i].checked) {
            userData.choice = i + 1;

            // 正解の場合、解答データの点数を加点
            if (quizData[currentQuizNum - 1].answer == (i + 1)) {
                quizData[currentQuizNum - 1].point = parseInt(quizData[currentQuizNum - 1].point) + 1;
            }
        }
    }
}

// プログレスバーを更新する関数
function updateProgressbar() {
    // 要素を取得
    const progressbar = document.getElementsByClassName('c_progressbar')[0]; // プログレスバー
    const circle = progressbar.getElementsByClassName('c_progressbar_circle'); // プログレスバーの円

    // 活性クラスを次の円へ移動
    for (let i = 0; i < circle.length; i++) {
        if (circle[i - 1].classList.contains('c_progressbar_active')) {
            circle[i - 1].classList.remove('c_progressbar_active');
            circle[i].classList.add('c_progressbar_active');
        }
    }
}

// 問題情報を更新する関数
function updateQuiz() {
    // 要素を取得
    const quizNum = document.getElementById('sqq_quizNum'); // 問題番号
    const question = document.getElementById('sqq_question'); // 問題文
    const option = document.getElementsByName('sqq_option'); // 選択肢

    // 現在の問題番号を取得
    const currentQuizNum = parseInt(quizNum.innerText);

    // 問題番号を更新
    quizNum.innerText = currentQuizNum + 1;
    // 問題文を更新
    question.innerText = quizData[currentQuizNum].question;
    // 選択肢を更新
    for (let i = 0; i < option.length; i++) {
        option[i].innerText = quizData[currentQuizNum].option[i];
    }
}



// window.addEventListener('DOMContentLoaded', function () {
//     // 問題番号テキストの要素を取得
//     const QuizId = document.getElementById('QuizId');
//     // 問題文テキストの要素を取得
//     const Question = document.getElementById('Question');
//     // 選択肢テキストの要素を取得
//     const Option1 = document.getElementById('Option1');
//     const Option2 = document.getElementById('Option2');
//     const Option3 = document.getElementById('Option3');
//     const Option4 = document.getElementById('Option4');
//     // 選択肢の要素を取得
//     const select = document.getElementsByClassName('sqq_choiceBtn');
//     // ○×アイコンの要素を取得
//     const correctImg = document.getElementById('correct');
//     const incorrectImg = document.getElementById('incorrect');
//     // 選択肢エリアの要素を取得
//     const choiceArea = document.getElementsByClassName('sqq_choiceArea')[0];
//     // プログレスバーの円の要素を取得
//     const progressCircle = document.getElementsByClassName('sqc_progressBar_circle');

//     // 現在の問題番号を定義
//     let quizNum = 1;

//     // サッカークイズGASのデプロイURLを設定
//     const deployUrl = 'https://script.google.com/macros/s/AKfycbyT5b10xb-Ave5Ozgi2aaAnqABD-TWzJFEgJLgO88N_Jj-V75R3x0_l7myxritXTyuw/exec';
//     // Dexie.jsのデータベースを作成
//     const db = new Dexie('QuizAppDB');
//     // ストア（テーブル）の定義
//     db.version(4).stores({
//         UserDB: '++id, UserId, LoginDate, AnswerDate, Choice, Point',
//         QuizDB: '++id, &QuizId, Question, Option1, Option2, Option3, Option4, Answer'
//     });
//     // ユーザーの回答を格納するためのテーブル
//     const userTable = db.table('UserDB');
//     // クイズの問題を格納するためのテーブル
//     const quizTable = db.table('QuizDB');

//     userTable.orderBy('id').last(function (record) {
//         // 指定されたURLにリクエストを送信
//         fetch(deployUrl).then(function (response) {
//             // レスポンスデータをJSON形式に変換
//             return response.json();
//         }).then(function (data) {
//             // クイズデータを取得
//             const textData = data.content;
//             // クイズデータを要素ごとに分割
//             const splitData = textData.split('[sep]');
//             // クイズテーブルに情報を格納
//             for (let i = 0; i < splitData.length; i++) {
//                 if (i % 7 == 6) {
//                     // 1問目の情報を表示
//                     if (i == 6) {
//                         QuizId.innerText = splitData[i - 6];
//                         Question.innerText = splitData[i - 5];
//                         Option1.innerText = splitData[i - 4];
//                         Option2.innerText = splitData[i - 3];
//                         Option3.innerText = splitData[i - 2];
//                         Option4.innerText = splitData[i - 1];
//                     }

//                     // クイズDBにデータを格納
//                     quizTable.add({
//                         QuizId: Number(splitData[i - 6]),
//                         Question: splitData[i - 5],
//                         Option1: splitData[i - 4],
//                         Option2: splitData[i - 3],
//                         Option3: splitData[i - 2],
//                         Option4: splitData[i - 1],
//                         Answer: Number(splitData[i])
//                     });
//                 }
//             }
//         }).then(function () {
//             // ローダーの非表示
//             hideLoader();
//         });

//         // ユーザの選択を格納
//         const userChoice = [];
//         // 得点を換算
//         let point = 0;

//         // 選択肢を押下時の処理
//         for (let i = 0; i < select.length; i++) {
//             let selectValue = 0;
//             select[i].addEventListener('click', function () {
//                 // 選択肢の要素を取得
//                 const select = document.getElementsByClassName('sqq_choiceBtn');
//                 // 選択肢をクリック不可にする
//                 choiceArea.classList.add('sqq_noClick');
//                 selectValue = Number(this.value);
//                 userChoice.push(selectValue);
//                 // 正解の選択肢番号を格納
//                 let answerNum = 0;

//                 quizTable.where('QuizId').equals(quizNum).first(function (record) {
//                     // 正解の選択肢番号を格納
//                     answerNum = record.Answer;
//                     if (selectValue == record.Answer) {
//                         // 正解の場合
//                         // 〇を表示
//                         correctImg.classList.remove('sqq_none');
//                         correctImg.classList.remove('sqq_transmission');
//                         // 回答した選択肢をオレンジ
//                         select[selectValue - 1].classList.add('sqq_choiceOrange');
//                         // 得点を加算
//                         point += 1;
//                     } else {
//                         // 不正解の場合
//                         // ×を表示
//                         incorrectImg.classList.remove('sqq_none');
//                         incorrectImg.classList.remove('sqq_transmission');
//                         // 誤答の選択肢をグレー、正解の選択肢をオレンジ
//                         select[selectValue - 1].classList.add('sqq_optionGray');
//                         select[record.Answer - 1].classList.add('sqq_choiceOrange');
//                     }
//                 }).then(function () {
//                     quizTable.where('QuizId').equals(quizNum + 1).first(function (record) {
//                         if (quizNum < 10) {
//                             quizNum += 1;

//                             setTimeout(function () {
//                                 // ○×アイコンを非表示に変更
//                                 correctImg.classList.add('sqq_transmission');
//                                 incorrectImg.classList.add('sqq_transmission');
//                             }, 900);

//                             setTimeout(function () {
//                                 // ○×アイコンを非表示に変更
//                                 correctImg.classList.add('sqq_none');
//                                 incorrectImg.classList.add('sqq_none');

//                                 // 正解・不正解の選択肢を目立たせるのを辞める
//                                 select[answerNum - 1].classList.remove('sqq_choiceOrange');
//                                 select[selectValue - 1].classList.remove('sqq_optionGray');

//                                 //スクロールバーを進める
//                                 progressCircle[quizNum - 2].classList.remove('sqc_progressBar_active');
//                                 progressCircle[quizNum - 1].classList.add('sqc_progressBar_active');

//                                 // クイズ情報を表示
//                                 QuizId.innerText = quizNum;
//                                 Question.innerText = record.Question;
//                                 Option1.innerText = record.Option1;
//                                 Option2.innerText = record.Option2;
//                                 Option3.innerText = record.Option3;
//                                 Option4.innerText = record.Option4;

//                                 // 選択肢をクリック可にする
//                                 choiceArea.classList.remove('sqq_noClick');
//                             }, 1500);
//                         } else {
//                             // 解答日時の取得
//                             const answerDate = changeDateFormat(new Date());

//                             // ユーザテーブルに値を格納
//                             userTable.orderBy('id').last().then(function (record) {
//                                 userTable.update(record.id, {
//                                     AnswerDate: answerDate,
//                                     Choice: userChoice,
//                                     Point: point
//                                 }).then(function () {
//                                     // POST送信用のURLを定義
//                                     const postUrl = 'https://script.google.com/macros/s/AKfycbw4lKj3w8zccvqvyfwTfu-e1iGTfvh_vsIB3vn1TBA1cd-EKwBznXLgDLQoKCO2hoch/exec';

//                                     // 送信データ
//                                     let SendDATA = {
//                                         'UserId': record.UserId,
//                                         'LoginDate': record.LoginDate,
//                                         'AnswerDate': answerDate,
//                                         'Choice1': userChoice[0],
//                                         'Choice2': userChoice[1],
//                                         'Choice3': userChoice[2],
//                                         'Choice4': userChoice[3],
//                                         'Choice5': userChoice[4],
//                                         'Choice6': userChoice[5],
//                                         'Choice7': userChoice[6],
//                                         'Choice8': userChoice[7],
//                                         'Choice9': userChoice[8],
//                                         'Choice10': userChoice[9],
//                                         'Point': point
//                                     };

//                                     // 送信パラメータ
//                                     let postparam = {
//                                         "method": "POST",
//                                         "mode": "no-cors",
//                                         "Content-Type": "application/x-www-form-urlencoded",
//                                         "body": JSON.stringify(SendDATA)
//                                     };

//                                     // フェッチ
//                                     fetch(postUrl, postparam).then(function () {
//                                         location.href = './result.html';
//                                     }).catch(function (error) {
//                                         window.alert('通信エラーが発生しました。もう一度クイズをやり直すか、管理者に問い合わせてください。\n\n' + error);
//                                         location.href = './login.html';
//                                     });
//                                 });
//                             });
//                         }
//                     });
//                 });
//             });
//         }
//     });
// });