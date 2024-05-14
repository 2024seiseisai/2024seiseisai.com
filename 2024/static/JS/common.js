//メニューの開閉状況を示す変数を定義
let menu = "closed";

//ヘッダーの表示・非表示を示す変数を定義
let header = "hide";

//最初はヘッダーを非表示に
$(document).ready(function(){
    if($(window).scrollTop() < $("#top_firstview_bg").height() - $("header").height()){
        $("header").css("display","none");
    }else{
        $("header").css("display","flex");
    }
})

//ページが読み込まれたときにmobile版メニューの表示・非表示を切り替える
$(document).ready(function(){
    if($(window).width() >= 1024){
        $("#menu_mobile").hide();
    }else{
        $("#menu_mobile").show();
    }
})


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
        header = "show";
        $("header").css("animation","header_show 1s ease-out");
        if(header === "show"){
            $("header").css("display","flex");
        }
    }else if(menu === "opened"){
        hamburger_animation_PC.setDirection(-1); // 逆再生方向を設定
        hamburger_animation_PC.play(); // アニメーションを再生
        $(".menu").css("top","-100vh");
        menu = "closed";
        if($(window).scrollTop() < $(".top_firstview").height() - $("header").height()){
            header = "hide";
            $("header").css("animation","header_hide 1s ease-out");
            setTimeout(function(){
                if(header === "hide"){
                    $("header").css("display","none");
                }
            },1000)
        }
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



//ヘッダーの表示・非表示を切り替える
$(window).on('scroll',function(){ 
    if($(window).scrollTop() >= $(".top_firstview").height() - $("header").height()){
        header = "show";
        $("header").css("animation","header_show 1s ease-out");
        if(header === "show"){
            $("header").css("display","flex");
        }
    }else{
        if(menu == "closed"){
            header = "hide";
            $("header").css("animation","header_hide 1s ease-out");
            setTimeout(function(){
                if(header === "hide"){
                    $("header").css("display","none");
                }
            },1000)
        }
    }
});



//mobile版メニューの表示・非表示を切り替える
$(window).on('resize',function(){
    if($(window).width() >= 1024){
        $("#menu_mobile").hide();
    }else{
        $("#menu_mobile").show();
    }
})
