//ハンバーガーのアニメーション
var hamburger_animation_PC = lottie.loadAnimation({
    container: document.getElementById('hamburger'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "top_img/hamburger.json" // JSONファイルのパス
});
hamburger_animation_PC.setSpeed(2.0);

$("#hamburger").click(function(){
    hamburger_animation_PC.play();
});