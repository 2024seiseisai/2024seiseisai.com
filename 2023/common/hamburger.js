const nav = $('nav');
const header = $('header');
const nav_open = $('#nav_open');
const nav_close = $('#nav_close');
const top_logo = $('#header_logo')
const nav_sns_block = $('#nav_sns_block');

const width = $(window).width();

//#header_logoの表示のトリガーとなる要素のセレクタを設定
const scroll_element = '#scroll_trigger'

/**
 * #header_logoの表示のトリガー位置を調整
 * 正:要素より上側、負:要素より下側にずれる
 * 単位はpx
*/
const scroll_offset = 0;

/*TOPページ用*/
let element_top = -1000;

$(window).on('load', function (){
    //画面読み込み時
    format();
});

//画面リサイズ時にフォーマットを実行し直す
$(window).resize(
    format()
);

function format(){
    //htmlの初期化
    //scroll_elementが存在する場合top_logoを非表示にし、スクロールエレメントのオフセットを取得
    if($(scroll_element).length >= 1){
        element_top = $(scroll_element).offset().top;
        top_logo.hide();
    }
    
    if(width < 1025){
        //スマホの場合

        //ハンバーガーメニュー内のそれぞれのクリック要素を非表示
        $('nav ul a').each(function(i){ 
            var element = this;
            $(element).hide();
        });

    }else{
        //PCの場合
        //navを非表示
        if($(scroll_element).length >= 1){
            nav.hide();
        }
    }
}

$(window).on('scroll', scroll_logo);


function scroll_logo() {
    //現在のwindowのスクロール位置を取得
    var scrollPosition = $(window).scrollTop();

    if(width < 1025){
        //スマホの場合
        if(element_top - scrollPosition - scroll_offset <= 0){
            top_logo.fadeIn(500);
        }else{
            top_logo.fadeOut(500);
        }
    }else{
        //PCの場合
        if(element_top - scrollPosition - scroll_offset <= 0){
            $('nav,#header_logo').fadeIn(500);
        }else{
            $('nav,#header_logo').fadeOut(500);
        }
    }
}

nav_open.click(()=>{
    //#nav_openがクリックされたときの処理

    //スクロール禁止に変更
	$('body').css('overflow', 'hidden');

    //連打防止
    $('#nav_open,#nav_close').css('pointer-events', 'none');
    setTimeout(function () {
        $('#nav_open,#nav_close').css('pointer-events', '');
    }, 1500);
    
    //mainをフェードアウトで実装すると、スクロール位置が変わってしまうため、やむを得ずopacityで指定しています。
    $('main').css('opacity','0');

    //main,footer,#nav_openを隠す(0.5s)
    $('footer,#nav_open').fadeOut(500, ()=>{

        //nav,#nav_close,#header_logoを表示(0.5s)
        $('nav,#nav_close,#header_logo').fadeIn(500);

        //メニューのliを順番に表示
        $('nav ul a').each(function(i){ 
            var element = this;
            setTimeout(function(){
                $(element).fadeIn(300);
            },100*i);
        });

        setTimeout(() => {
            //連打防止
            $('nav ul a').show();
        }, 1000);

        //#nav_openを無効化
        nav_open.hide();
    });

    //#nav_sns_blockを表示
    setTimeout(function(){
        nav_sns_block.fadeIn(500);
    },1500);
});

nav_close.click(()=>{
    //#nav_closeがクリックされたときの処理

    
    //連打防止
    $('#nav_open,#nav_close').css('pointer-events', 'none');
    setTimeout(function () {
        $('#nav_open,#nav_close').css('pointer-events', '');
    }, 1200);

    //#nav_sns_blockを非表示
    nav_sns_block.fadeOut(300, ()=>{

        //メニューのliを順番に表示
        $($('nav ul a').get().reverse()).each(function(i){ 
            var element = this
            setTimeout(function(){
                $(element).fadeOut(100);
            },50*i);
        });

        //nav,#nav_closeを非表示(0.5s)
        var scrollPosition = $(window).scrollTop();
        $('nav,#nav_close').fadeOut(500);
        scroll_logo();

    });
    
    //800ms待ったあと
    setTimeout(() => {
        //#nav_openを表示(0.5s)
        nav_open.fadeIn(500);

        //main,footer,#nav_openを表示(0.5s)
        $('footer,#nav_open').fadeIn(500);

        //消されなかった残りを隠す(連打防止)
        $('nav ul a').hide();

        //mainを表示
        $('main').css('opacity','1');

        //スクロール有効化
        $('body').css('overflow', 'auto');
    }, 800);
});