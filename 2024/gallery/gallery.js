const description_list = [
    "",
    "PRパート パート員集会で使用したスライドから､一部抜粋です｡<br>製作セクションには新しく12人もが加入し､合計17人になりました！",
    ""
];

const length = [0,7,13,9,5,3,3,12,7,5,9,5,3,5,1,2,4,5,1,5,3,2,5,1,1]

let group = 1
let index = 1


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


function modal_set(){
    $("#description").html(description_list[group]);
    $("#gallery_modal_img").attr("src","/2024/gallery/" + group + "/" + index + ".webp");
    
    if(index >= length[group]){
        $("#modal-right").hide();
    }else{
        $("#modal-right").show();
    }

    if(index <= 1){
        $("#modal-left").css("display","none");
    }else{
        $("#modal-left").show();
    }

}



$(document).ready(function(){
    $(".modal-open").on("click", function(){
        // クリックされた要素の 'group' 属性を取得
        group = $(this).attr("group");
        index = 1;
        modal_set();
    });
    $("#modal-left").click(function(){
        index --;
        modal_set();
    });
    $("#modal-right").click(function(){
        index ++;
        modal_set();
    });

    
});