$(function(){
    // #で始まるa要素をクリックした場合に処理（"#"←ダブルクォーテンションで囲むのを忘れずに。忘れるとjQueryのバージョンによっては動かない。。）
    $('a[href^="#"]').click(function(){
      // 移動先を0px調整する。0を30にすると30px下にずらすことができる
      var adjust = -$('header').height();
      // スクロールの速度（ミリ秒）
      var speed = 500;
      // アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
      var href= $(this).attr("href");
      // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
      var target = $(href == "#" || href == "" ? 'html' : href);
      // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
      var position = target.offset().top + adjust;
      // スムーススクロール linear（等速） or swing（変速）
      $('body,html').animate({scrollTop:position}, speed, 'swing');
    });

    $('#page_top').click(()=>{
        $('html, body').animate({scrollTop: 0}, 500, 'swing');
    });
});

$(window).scroll(()=>{
  // 現在のスクロール位置を取得
  var scrollPos = $(window).scrollTop();
    
  // スクロール位置に応じた処理を記述
  if (scrollPos < 100) {
    $('#page_top').fadeOut(300);
  }else{
    $('#page_top').fadeIn(300);
  }
});
