//ハンバーガーのアニメーション
lottie.loadAnimation({
    container: document.getElementById('hamburger'),// アニメーションを格納するDOM要素 
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: "top_img/hamburger.json" // JSONファイルのパス
});