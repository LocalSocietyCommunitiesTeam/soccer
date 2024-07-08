/** コンポーネントJavaScript **/
/* ローダー */
if (document.getElementsByClassName('c_loader')) {
    // ローダーを表示
    function showLoader() {
        const loader = document.getElementsByClassName('c_loader')[0];

        loader.classList.remove('c_loader_hidden');
    }

    // ローダーを非表示
    function hideLoader() {
        const loader = document.getElementsByClassName('c_loader')[0];

        loader.classList.add('c_loader_hidden');
    }
}

/* ダイアログ */
if (!document.getElementsByClassName('com_dialog').length) {
    //該当の要素がない場合は処理を行なわない
} else {
    // ダイアログ表示処理
    function showModalDialog01(targetDialogArea) {
        // ダイアログウィンドウ表示
        targetDialogArea.classList.add('com_dialog_isShow');
        //iPhoneの場合Bodyでposition:fixedの必要あり
        document.body.style.top = '-' + window.scrollY + 'px';
        // 背景固定
        document.body.classList.add('com_dialog_bodyScroll');
        // 高さ設定
        setMaxHeightModal01(targetDialogArea);
    }

    // ダイアログ非表示処理
    function closeModalDialog01(targetDialogArea) {
        // スクロール位置を戻すための処理 
        scrollMove = document.body.style.getPropertyValue('top');
        if (scrollMove != '') {
            scrollMove = scrollMove.replace('-', '');
            scrollMove = scrollMove.replace('px', '');
            // ダイアログウィンドウ非表示
            targetDialogArea.classList.remove('com_dialog_isShow');
            // 背景固定解除
            document.body.classList.remove('com_dialog_bodyScroll');
            document.body.style.removeProperty('top');
            // スクロール位置を戻す
            window.scrollTo(0, scrollMove);
        }
    }

    // ダイアログ表示時用 高さ設定処理
    function setMaxHeightModal01(targetDialogArea) {
        const modalMaxHeight = 680;
        targetArea = targetDialogArea.getElementsByClassName('com_dialog_textArea')[0];
        //iphoneではheightがvhの場合、アドレスバーが表示エリアに含まれないためこちらでheightを指定
        targetDialogArea.style.height = window.innerHeight + 'px';
        //textAreaも上記同様の理由でmax-heightを指定
        //本来は64pxだがスクロールバーの表示調整でCSS側の「dialog_inner」の上下paddingが62pxのため計算値もあわせる
        targetArea.style.maxHeight = ((window.innerHeight * 0.9) - 62) + 'px';
        // ダイアログのダイアログボックスの高さは最大680px
        // ただし、PC時かつウィンドウの高さの90%が上記の高さより小さい場合は、
        // ウィンドウの90%をダイアログボックスの高さとする
        if (!window.matchMedia('(max-width: 760px)').matches) {
            if (window.innerHeight * 0.9 < modalMaxHeight) {
                //90%未満のときは指定したmax-heightを使用
            } else {
                //CSSで指定したmax-heightとするため削除
                targetArea.style.removeProperty('max-height');
            }
        }
    }

    // ページ表示時に各種イベント登録
    window.addEventListener('DOMContentLoaded', function () {
        // ダイアログウィンドウの表示制御 
        const showModal = document.getElementsByClassName('com_dialog_showModal');
        for (let i = 0; i < showModal.length; i++) {
            showModal[i].addEventListener('click', function () {
                showModalDialog01(this.nextElementSibling);
            });
        }

        // ダイアログウィンドウの非表示制御（×ボタン押下時）
        const closeBtn = document.getElementsByClassName('com_dialog_CloseBtn');
        for (let i = 0; i < closeBtn.length; i++) {
            closeBtn[i].addEventListener('click', function () {
                closeModalDialog01(this.parentElement.parentElement);
            });
        }

        // ダイアログウィンドウの非表示制御（背景押下時）
        const closeModal = document.getElementsByClassName('com_dialog_modal');
        for (let i = 0; i < closeModal.length; i++) {
            closeModal[i].addEventListener('click', function (e) {
                // IEの場合、×ボタン押下時にdiv要素全体の押下イベントも実行されてしまうため×ボタン押下か否かを判定
                if (undefined != e.target.classList) {
                    // 押下箇所が背景の場合 かつ 非活性制御がない場合はダイアログを閉じる
                    if (e.target.classList.contains('com_dialog_modal') && !(e.target.classList.contains('com_dialog_modal_disable'))) {
                        closeModalDialog01(this);
                    }
                }
            });
        }

        // リサイズ時 高さ再設定
        window.addEventListener('resize', function () {
            if (document.getElementsByClassName('com_dialog_isShow').length) {
                setMaxHeightModal01(document.getElementsByClassName('com_dialog_isShow')[0]);
            }
        });
    });
}