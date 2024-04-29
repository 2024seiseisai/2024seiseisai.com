//メニューの開閉状況を示す変数を定義
let menu = "closed";



//ハンバーガーのアニメーション
var hamburger_animation_PC = lottie.loadAnimation({
    container: document.getElementById('hamburger'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "./static/img/hamburger.json" // JSONファイルのパス
});
hamburger_animation_PC.setSpeed(2.0);



//Xアイコン、Twitterアイコンのアニメーション
var menu_icon_animation = lottie.loadAnimation({
    container: document.getElementById('menu_SNS_item_X_img'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "./static/img/X-Twitter.json" // JSONファイルのパス
});
menu_icon_animation.setSpeed(3.0);

var footer_icon_animation = lottie.loadAnimation({
    container: document.getElementById('footer_X-Twitter'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "./static/img/X-Twitter.json" // JSONファイルのパス
});
footer_icon_animation.setSpeed(3.0);



//メニューの開閉
$("#hamburger").click(function(){
    if(menu === "closed"){
        hamburger_animation_PC.setDirection(1);
        hamburger_animation_PC.play();
        $(".menu").css("top","100px");
        $("header").css("border-bottom","1px solid #FFFFFF");
        menu = "opened";
    }else if(menu === "opened"){
        hamburger_animation_PC.setDirection(-1); // 逆再生方向を設定
        hamburger_animation_PC.play(); // アニメーションを再生
        $(".menu").css("top","-100vh");
        menu = "closed";
        setTimeout(function(){
            if(menu === "closed"){
                $("header").css("border-bottom","");
            }
        },200);
    }
});
    


//Xアイコン<=>Twitterアイコンのアニメーション
$("#menu_SNS_item_X").hover(function(){
    menu_icon_animation.setDirection(1);
    menu_icon_animation.play();
},function(){
    menu_icon_animation.setDirection(-1);
    menu_icon_animation.play();
});

$("#footer_nav_X").hover(function(){
    footer_icon_animation.setDirection(1);
    footer_icon_animation.play();
},function(){
    footer_icon_animation.setDirection(-1);
    footer_icon_animation.play();
});



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

function firstview_bg_animation(){
    $("#top_firstview_bg").css("opacity","1");
    $("#top_firstview_bg").fadeTo(2000,0,function(){
        $(this).fadeTo(1000,0,function(){
            $(this).fadeTo(3000,1);
        });
    });
}

$(document).ready(function(){
    logo_animation.play();
    theme_animation.play();
    firstview_bg_animation();
    setInterval(function(){
        firstview_bg_animation();
    },8000);
});
