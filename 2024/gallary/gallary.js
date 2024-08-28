const modal = $("#js-modal");
const overlay = $("#js-overlay");
const close = $("#js-close"); // 追記
const open = $("#js-open");

open.on('click', function () { //ボタンをクリックしたら
  modal.addClass("open"); // modalクラスにopenクラス付与
  overlay.addClass("open"); // overlayクラスにopenクラス付与
});

// 追記
close.on('click', function () { //×ボタンをクリックしたら
  modal.removeClass("open"); // modalクラスからopenクラスを外す
  overlay.removeClass("open"); // overlayクラスからopenクラスを外す
});