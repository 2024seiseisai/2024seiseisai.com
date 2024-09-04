$(function(){
    // 変数に要素を入れる
    var open = $('.modal-open'),
        close = $('.modal-close'),
        container = $('.modal-container');

    // 開くボタンをクリックしたらモーダルを表示する
    open.on('click', function(e){
        e.preventDefault(); // デフォルトの動作を防ぐ
        container.addClass('active');
        $('body').css('overflow', 'hidden');
        $(window).on('touchmove.noScroll', function(e) {
            e.preventDefault();
        });
    });

    // 閉じるボタンをクリックしたらモーダルを閉じる
    close.on('click', function(e){
        e.preventDefault(); // デフォルトの動作を防ぐ
        container.removeClass('active');
        $('body').css('overflow', '');
        $(window).off('touchmove.noScroll');
    });

    // モーダル外をクリックで閉じる（オプション）
    $(window).on('click', function(e){
        if ($(e.target).is('.modal-container')) {
            container.removeClass('active');
            $('body').css('overflow', '');
            $(window).off('touchmove.noScroll');
        }
    });
});