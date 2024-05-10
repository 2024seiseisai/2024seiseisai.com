
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






