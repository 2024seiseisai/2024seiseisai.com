//ファーストビューのアニメーション
var logo_animation = lottie.loadAnimation({
    container: document.getElementById('logo_animation'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: "./static/img/logo.json" // JSONファイルのパス
});

var theme_animation = lottie.loadAnimation({
    container: document.getElementById('theme_animation'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: "./static/img/ignitions.json" // JSONファイルのパス
});

var scroll_animation = lottie.loadAnimation({
    container: document.getElementById('scroll_animation'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: "./static/img/scroll.json" // JSONファイルのパス
});

//画像等もすべて読み込まれた後に実行
$(window).on('load',function(){
    logo_animation.play();
    theme_animation.play();
    scroll_animation.play();
    $("#top_firstview_bg").css("animation","top_firstview_bg_animation 8s infinite linear")
    $(".__Top_title").css("animation","top_title_animation 8s infinite linear")
});



//ヘッダーの表示・非表示を示す変数を定義
let header = "hide";

//最初はヘッダーを非表示に
$(document).ready(function(){
    if($(window).scrollTop() < $("#top_firstview_bg").height() - $("header").height()){
        $("header").css("opacity","0");
        $(".click_hide").css("pointer-events","none");
    }else{
        $("header").css("opacity","1");
        $(".click_hide").css("pointer-events","auto");
    }
})

//ヘッダーの表示・非表示を切り替える
$(window).on('scroll',function(){ 
    if($(window).scrollTop() >= $(".top_firstview").height() - $("header").height()){
        header = "show";
        $("header").css("animation","header_show 1s ease-out");
        if(header === "show"){
            $("header").css("opacity","1");
            $(".click_hide").css("pointer-events","auto");
        }
    }else{
        if(menu == "closed"){
            header = "hide";
            $("header").css("animation","header_hide 1s ease-out");
            setTimeout(function(){
                if(header === "hide"){
                    $("header").css("opacity","0");
                    $(".click_hide").css("pointer-events","none");
                }
            },1000)
        }
    }
});

$("#hamburger").click(function(){
    if(menu == "closed"){
        if($(window).scrollTop() < $(".top_firstview").height() - $("header").height()){
                    header = "hide";
                    $("header").css("animation","header_hide 1s ease-out");
                    setTimeout(function(){
                        if(header === "hide"){
                            $("header").css("opacity","0");
                        }
                    },1000)
        }
    }
});

$("header").hover(function(){
    $(".click_hide").css("pointer-events","auto");
    setTimeout(function(){
        $(".click_hide").css("pointer-events","auto");
    },1000);
});





