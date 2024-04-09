//メニューの開閉状況を示す変数を定義
let menu = "closed";



//ハンバーガーのアニメーション
var hamburger_animation_PC = lottie.loadAnimation({
    container: document.getElementById('hamburger'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "top_img/hamburger.json" // JSONファイルのパス
});
hamburger_animation_PC.setSpeed(2.0);



//メニューの開閉
$("#hamburger").click(function(){
    if(menu === "closed"){
        hamburger_animation_PC.setDirection(1);
        hamburger_animation_PC.play();
        $(".menu").css("transform","scaleY(1)");
        $("header").css("border-bottom","1px solid #FFFFFF");
        menu = "opened";
    }else if(menu === "opened"){
        hamburger_animation_PC.setDirection(-1); // 逆再生方向を設定
        hamburger_animation_PC.play(); // アニメーションを再生
        $(".menu").css("transform","scaleY(0)");
        $("header").css("border-bottom","");
        menu = "closed";
    }
});
    
