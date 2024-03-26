$(document).ready(function(){
    //メニューーの開閉を示す変数を定義
    let menu_open_rate = 0
    //スクロール量取得用の変数を定義
    let scroll_now = 0;
    let scroll_pre = 0;


    function changeContent(object,original_text,changed_text){
        $(object).hover(function(){
            $(this).text(changed_text);//hoverした時の関数
        },function(){
            $(this).text(original_text);//hover解除したときの関数
        });
    };

    changeContent("#top","TOP","トップ");
    changeContent("#blog","BLOG","ブログ");
    changeContent("#access","ACCESS","アクセス");


    //メニューを開閉する関数
    $(".menu_btn").click(function(){
        if(menu_open_rate == 0){
            $("#menu_open").fadeTo(100,0);
            $("#menu_close").fadeTo(100,1);
            $("body").css("overflow","hidden");
            $(".menu_large").css("transform","scaleY(1)");
            $(".menu").css("display","flex");
            menu_open_rate = 1;
        }else{
            $("#menu_close").fadeTo(100,0);
            $("#menu_open").fadeTo(100,1);
            $("body").css("overflow","visible");
            $(".menu_large").css("transform","scaleY(0)")
            menu_open_rate = 0;
        }
    });


    //相対的なスクロール量を取得する関数
    function get_scroll(){
        scroll_pre = scroll_now;
        scroll_now = $(window).scrollTop();
        return (scroll_now - scroll_pre);
    };

    //スクロール時にメニューを表示・非表示にする関数
    $(window).on('scroll',function(){
        if(menu_open_rate == 0){
            if(get_scroll() >= 0){
                $(".menu").css("display","none");
            }else{
                $(".menu").css("display","flex");
            };
        };
    });
});