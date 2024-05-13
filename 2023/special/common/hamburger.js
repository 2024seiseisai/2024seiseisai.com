$('#hamburger').click(function () {
    $('nav').removeClass('hide');

    //スクロール禁止に変更
	$('body').css('overflow','hidden');
});
$('#nav_close').click(function() {
    //スクロール禁止解除
	$('body').css('overflow','auto');

    $('nav').addClass('hide');
})