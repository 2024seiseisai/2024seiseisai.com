// ハンバーガメニューの項目操作
document.addEventListener("DOMContentLoaded", function() {
    // 公開されているページのクラスをリストアップ
    const availablePages = [
        "Top", "ThemeLogo" , "News", "Access","PrivacyPolicy","Contact","Blog","Goods","Special","Reserve","Exhibition","Bazaar","Events","ClubMagazine","Archives",
    ];

// 追加すると勝手に変わるページ一覧　"Top", "ThemeLogo", "News", "Access", "Events", "Exhibition", "Bazaar", "Goods", "Blog", "ClubMagazine", "Special", "Archives", "PrivacyPolicy","Reserve",


    // 公開されているページから unfinished クラスを削除
    availablePages.forEach(function(pageClass) {
        // '.'を含めないクラス名のセレクターを生成
        const elements = document.querySelectorAll('.' + pageClass);
        elements.forEach(function(element) {
            element.classList.remove("unfinished");
            element.classList.remove("hide");
        });
    });
});




//メニューの開閉状況を示す変数を定義
let menu = "closed";


//mobile版メニューの開閉を表すリストを定義
menu_mobile = [0,0,0,0];




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
    path: "/2024/static/img/hamburger.json" // JSONファイルのパス
});
hamburger_animation_PC.setSpeed(2.0);



//Xアイコン、Twitterアイコンのアニメーション
var menu_icon_animation = lottie.loadAnimation({
    container: document.getElementById('menu_SNS_item_X_img'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "/2024/static/img/X-Twitter.json" // JSONファイルのパス
});
menu_icon_animation.setSpeed(3.0);

var footer_icon_animation = lottie.loadAnimation({
    container: document.getElementById('footer_X-Twitter'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "/2024/static/img/X-Twitter.json" // JSONファイルのパス
});
footer_icon_animation.setSpeed(3.0);



//メニューの開閉
$("#hamburger").click(function(){
    if(menu === "closed"){
        hamburger_animation_PC.setDirection(1);
        hamburger_animation_PC.play();
        $(".menu").css("top","100px");
        $("header").css("border-bottom","1px solid #FFFFFF");
        header = "show";
        $("header").css("animation","header_show 1s ease-out");
        if(header === "show"){
            $("header").css("opacity","1");
        }
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




//mobile版メニューのプラスボタンのアニメーション
var menu_mobile_plus_btn_1 = lottie.loadAnimation({
    container: document.getElementById('menu_mobile_plus_btn_1'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "/2024/static/img/pink_plus.json" // JSONファイルのパス
});
menu_mobile_plus_btn_1.setSpeed(2.5);

var menu_mobile_plus_btn_2 = lottie.loadAnimation({
    container: document.getElementById('menu_mobile_plus_btn_2'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "/2024/static/img/pink_plus.json" // JSONファイルのパス
});
menu_mobile_plus_btn_2.setSpeed(2.5);

var menu_mobile_plus_btn_3 = lottie.loadAnimation({
    container: document.getElementById('menu_mobile_plus_btn_3'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "/2024/static/img/pink_plus.json" // JSONファイルのパス
});
menu_mobile_plus_btn_3.setSpeed(2.5);

var menu_mobile_plus_btn_4 = lottie.loadAnimation({
    container: document.getElementById('menu_mobile_plus_btn_4'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "/2024/static/img/pink_plus.json" // JSONファイルのパス
});
menu_mobile_plus_btn_4.setSpeed(2.5);


//mobile版メニューの開閉
$("#menu_mobile_trigger_1").click(function(){
    if(menu_mobile[0] === 0){
        menu_mobile_plus_btn_1.setDirection(1);
        menu_mobile_plus_btn_1.play();
        $("#menu_mobile_main_1").css("height","198px")
        $("#menu_mobile_object_1").css("transform","scaleY(1)");
        menu_mobile[0] = 1;
    }else{
        menu_mobile_plus_btn_1.setDirection(-1);
        menu_mobile_plus_btn_1.play();
        $("#menu_mobile_main_1").css("height","64px")
        $("#menu_mobile_object_1").css("transform","scaleY(0)");
        menu_mobile[0] = 0;
    }
})

$("#menu_mobile_trigger_2").click(function(){
    if(menu_mobile[1] === 0){
        menu_mobile_plus_btn_2.setDirection(1);
        menu_mobile_plus_btn_2.play();
        $("#menu_mobile_main_2").css("height","198px")
        $("#menu_mobile_object_2").css("transform","scaleY(1)");
        menu_mobile[1] = 1;
    }else{
        menu_mobile_plus_btn_2.setDirection(-1);
        menu_mobile_plus_btn_2.play();
        $("#menu_mobile_main_2").css("height","64px")
        $("#menu_mobile_object_2").css("transform","scaleY(0)");
        menu_mobile[1] = 0;
    }
})

$("#menu_mobile_trigger_3").click(function(){
    if(menu_mobile[2] === 0){
        menu_mobile_plus_btn_3.setDirection(1);
        menu_mobile_plus_btn_3.play();
        $("#menu_mobile_main_3").css("height","198px")
        $("#menu_mobile_object_3").css("transform","scaleY(1)");
        menu_mobile[2] = 1;
    }else{
        menu_mobile_plus_btn_3.setDirection(-1);
        menu_mobile_plus_btn_3.play();
        $("#menu_mobile_main_3").css("height","64px")
        $("#menu_mobile_object_3").css("transform","scaleY(0)");
        menu_mobile[2] = 0;
    }
})

$("#menu_mobile_trigger_4").click(function(){
    if(menu_mobile[3] === 0){
        menu_mobile_plus_btn_4.setDirection(1);
        menu_mobile_plus_btn_4.play();
        $("#menu_mobile_main_4").css("height","198px")
        $("#menu_mobile_object_4").css("transform","scaleY(1)");
        menu_mobile[3] = 1;
    }else{
        menu_mobile_plus_btn_4.setDirection(-1);
        menu_mobile_plus_btn_4.play();
        $("#menu_mobile_main_4").css("height","64px")
        $("#menu_mobile_object_4").css("transform","scaleY(0)");
        menu_mobile[3] = 0;
    }
})







//mobile版メニューの表示・非表示を切り替える
$(window).on('resize',function(){
    if($(window).width() >= 1024){
        $("#menu_mobile").hide();
    }else{
        $("#menu_mobile").show();
    }
})
