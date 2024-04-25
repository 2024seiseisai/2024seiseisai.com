let accordionDetails = '.js-details';
let accordionSummary = '.js-details-summary';
let accordionContent = '.js-details-content';
let speed = 300;

$(accordionSummary).each(function() {
  $(this).on("click", function(event) {
    // デフォルトの挙動を無効化
    event.preventDefault();
    // summaryにis-activeクラスを切り替え
    $(this).toggleClass("is-active");

    // 他の要素を閉じる
    $(accordionSummary).not(this).removeClass("is-active");
    $(accordionContent).not($(this).next()).slideUp(speed, function() {
      $(this).parent().removeAttr("open");
    });

    if ($(this).parent().attr("open")) {
      // アコーディオンを閉じるときの処理
      $(this).nextAll(accordionContent).slideUp(speed, function() {
        // アニメーションの完了後にopen属性を取り除く
        $(this).parent().removeAttr("open");
      });
    } else {
      // アコーディオンを開くときの処理
      // open属性を付ける
      $(this).parent().attr("open", "true");
      // いったんdisplay:none;してからslideDownで開く
      $(this).nextAll(accordionContent).hide().slideDown(speed);
    }
  });
});
