const description_list = [
    [],
    ["1-1","1-2","1-3"],
    ["2-1"],
    ["3-1","3-2"]
];

let group = 0
let index = 0


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
    $("#description").text(description_list[group][index]);
    $("#gallery_modal_img").attr("src","/2024/gallery/" + group + "/" + index + ".png");
    
    if(index + 1 >= description_list[group].length){
        $("#modal-right").hide();
    }else{
        $("#modal-right").show();
    }

    if(index <= 0){
        $("#modal-left").css("display","none");
    }else{
        $("#modal-left").show();
    }

}



$(document).ready(function(){
    $(".modal-open").on("click", function(){
        // クリックされた要素の 'group' 属性を取得
        group = $(this).attr("group");
        index = 0;
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