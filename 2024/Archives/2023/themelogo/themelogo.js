const loadingBlock = $('#js-loading');
const loadingGraph = $('#js-loading-graph');

const loadingComplete = $('#js-loading-complete');
const logoMotion = $('#logo-motion');

const main = $('main');

const breakdown = $('#js-breakdown');

const breakdownVideo = [
    $('#js-breakdown-01'),
    $('#js-breakdown-02'),
    $('#js-breakdown-03'),
    $('#js-breakdown-04'),
];
const breakdownDescription = [
    $('#js-breakdown-description-01'),
    $('#js-breakdown-description-02'),
    $('#js-breakdown-description-03'),
    $('#js-breakdown-description-04'),
]
const breakdownProgress = [
    $('#js-breakdown-progress-01'),
    $('#js-breakdown-progress-02'),
    $('#js-breakdown-progress-03'),
    $('#js-breakdown-progress-04'),
]
var frag = 0;

// true  : ローディングアニメーションあり
// false : ローディングアニメーションなし(開発用)
const loadingAvailable = true;


function LoadingGraphChange(value) {
    // value : 1 - 100 ローディングの進捗
    loadingGraph.css("background-image", `conic-gradient(#52CC89 0% ${value}%, #737373 ${value}% 100%)`);
};

function LoadComplete() {
    if(loadingAvailable){
        var graphValue = 0;
        const graphInterval = setInterval(() => {
            LoadingGraphChange( graphValue )
            graphValue++;

            if( graphValue >= 100 ){
                loadingBlock.fadeOut(1000);
            
                setTimeout(() => { 
                    const logoMotionElement = document.getElementById('logo-motion');
                    logoMotionElement.play();
            
                    setTimeout(() => {
                        logoMotion.fadeOut(500);
                        loadingComplete.fadeOut(1000);
                    }, 1500);
                }, 1000);
            }
        }, 10);
        setTimeout(() => {
            clearInterval( graphInterval );
        }, 10 * 200);
    } else {
        loadingBlock.hide();
        logoMotion.hide();
        loadingComplete.hide();
    }
};

$(document).ready(function(){
    $(window).on("load",LoadComplete);
    setTimeout(LoadComplete, 5000);
})



$(document).ready(function() {
    $('#js-movie-open-button').on('click',function(){
        //動画のボタンが押されたらモーダルが表示される
        $('#js-movie-modal').fadeIn();

        //スクロール禁止に変更
	    $('body').css('overflow', 'hidden');
    })
    $('#js-movie-close-background-button').on('click',function(){
        $('#js-movie-modal').fadeOut();
        
        //スクロール有効化
        $('body').css('overflow', 'auto');
    })
    $('#js-movie-close-button').on('click',function(){
        $('#js-movie-modal').fadeOut();
        
        //スクロール有効化
        $('body').css('overflow', 'auto');
    })

    // スクロールイベントを検知
    $(window).scroll(function() {

        // ターゲット要素が画面内に表示されたらscrollEventを実行]
        const docViewTop = $(window).scrollTop();
        const docViewBottom = docViewTop + $(window).height();
        const elemTop = breakdown.offset().top;
        const elemHeight = breakdown.height();
        const elemBottom = elemTop + elemHeight;
    
        if((docViewTop >= elemTop) && (docViewBottom >= elemTop)){
            const percent = (docViewTop - elemTop) / elemHeight * 100;

            for(var i = 1; i <= 4; i++){
                if( percent >= 0 && percent < 20 * i ){
                    breakdownProgress[i - 1].css('width', `${percent * 5 - 100 * (i - 0.99)}%`);

                    if( i - frag > 0){

                        var now = i - 1;
                        var prev = i - 2;

                        //次の動画の位置に移ったときに1度だけ実行
                        if(breakdownVideo[prev]) fadeOutVisibility(breakdownVideo[prev], 300);
                        fadeInVisibility(breakdownVideo[now], 300);

                        if(breakdownDescription[prev]) fadeOutVisibility(breakdownDescription[prev], 300);
                        fadeInVisibility(breakdownDescription[now], 300);
   
                        var breakdownImgNow = breakdownVideo[now].children();
                        breakdownImgNow.removeClass("played")
                        breakdownImgNow.removeClass("reverse")
                        breakdownImgNow.addClass("play")
                        setTimeout(() => {
                            breakdownImgNow.removeClass("play")
                            breakdownImgNow.addClass("played")
                        }, 700);
                        
                    } else if( i - frag < 0) {
                        //前の動画の位置に移ったときに1度だけ実行
                        var now = i - 1;
                        var prev = i;
    
                        if(breakdownVideo[now]) fadeInVisibility( breakdownVideo[now], 300);
                        fadeOutVisibility( breakdownVideo[prev], 300);

                        if(breakdownDescription[now]) fadeInVisibility(breakdownDescription[now], 300);
                        fadeOutVisibility(breakdownDescription[prev], 300);
                    }
                    frag = i;
                    break;
                }
            }
        }
    });
});

function fadeOutVisibility(elem, time) {
    elem.css("opacity","1");
    elem.animate(
        {
            opacity: 0,
        },
        time
    );
    setTimeout(() => {
        elem.css("visibility","hidden");
    }, time);
}

function fadeInVisibility(elem, time) {
    elem.css("visibility","visible");
    elem.css("opacity","0");
    elem.animate(
        {
            opacity: 1,
        },
        time
    );
}