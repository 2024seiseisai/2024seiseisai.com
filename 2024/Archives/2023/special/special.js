
new Splide( '.wallpapers', {
    type   : 'loop',
    perPage: 3,
    perMove: 1,
    gap: "8%",
    padding: "18%",
    focus  : 'center',

    flickPower: 300,

    autoplay: true,
    interval: 5000,

    arrows: true,

    classes: {
        arrow : 'splide__arrow splide_arrow',
		prev  : 'splide__arrow--prev arrow--prev',
		next  : 'splide__arrow--next arrow--next',
        pagination: 'splide__pagination paginations',
        page  : 'splide__pagination__page pagination',
    },

    breakpoints: {
		1025: {
            perPage: 1,
            padding: "30%",
            gap: 35,

            arrows: false,
		},
    }
}).mount();

new Splide( '.icons', {
    type   : 'loop',
    perPage: 3,
    perMove: 1,
    gap: "10%",
    padding: "18%",
    focus  : 'center',

    flickPower: 300,

    autoplay: true,
    interval: 5000,

    arrows: true,

    classes: {
        arrow : 'splide__arrow splide_arrow',
		prev  : 'splide__arrow--prev arrow--prev',
		next  : 'splide__arrow--next arrow--next',
        pagination: 'splide__pagination paginations',
        page  : 'splide__pagination__page pagination',
    },

    breakpoints: {
		1025: {
            perPage: 1,
            padding: "30%",
            gap: 35,

            arrows: false,
		},
    }
}).mount();

new Splide( '.headers', {

    type   : 'loop',
    perPage: 3,
    perMove: 1,
    gap: "65%",
    padding: "30%",
    focus  : 'center',

    flickPower: 300,

    autoplay: true,
    interval: 5000,

    arrows: true,

    classes: {
        arrow : 'splide__arrow splide_arrow',
		prev  : 'splide__arrow--prev arrow--prev',
		next  : 'splide__arrow--next arrow--next',
        pagination: 'splide__pagination paginations',
        page  : 'splide__pagination__page pagination',
    },

    breakpoints: {
		1025: {
            perPage: 1,
            padding: "30%",
            gap: "80%",

            arrows: false
		},
    }
}).mount();











/*$(function () {
    $('#js-slider-1').slick({
        
        dots: true, // インジケーター

        autoplay: true, // 自動再生
        autoplaySpeed: 5000, // 再生速度（ミリ秒設定） 1000ミリ秒=1秒
        cssEase: 'cubic-bezier(.13,0,0,1)',
        infinite: true, // 無限スライド

        centerMode: true,// 前後スライドを部分表示
        centerPadding: '25%',// 両端の見切れるスライド幅

        arrows: false, // 矢印
    });
});


$(function () {
    $('#js-slider-2').slick({
        
        dots: true, // インジケーター

        autoplay: true, // 自動再生
        autoplaySpeed: 5000, // 再生速度（ミリ秒設定） 1000ミリ秒=1秒
        cssEase: 'cubic-bezier(.13,0,0,1)',
        infinite: true, // 無限スライド

        centerMode: true,// 前後スライドを部分表示
        centerPadding: '25%',// 両端の見切れるスライド幅

        arrows: false, // 矢印
    });
});

$(function () {
    $('#js-slider-3').slick({
        
        dots: true, // インジケーター

        autoplay: true, // 自動再生
        autoplaySpeed: 5000, // 再生速度（ミリ秒設定） 1000ミリ秒=1秒
        cssEase: 'cubic-bezier(.13,0,0,1)',
        infinite: true, // 無限スライド

        centerMode: true,// 前後スライドを部分表示
        centerPadding: '20%',// 両端の見切れるスライド幅

        arrows: false, // 矢印
    });
});

*/