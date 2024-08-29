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
    updateOnMove: true,
    
    classes: {
        arrow : 'splide__arrow splide_arrow',
		prev  : 'splide__arrow--prev arrow--prev',
		next  : 'splide__arrow--next arrow--next',
        pagination: 'splide__pagination paginations',
        page  : 'splide__pagination__page pagination',
    },

    breakpoints: {
		1023: {
            perPage: 1,
            padding: "30%",
            gap: 35,
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
    updateOnMove: true,

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
		},
    }
}).mount();

new Splide( '.headers', {
    type   : 'loop',
    perPage: 3,
    perMove: 1,
    gap: "5%",
    padding: "18%",
    focus  : 'center',

    fixedWidth: "117%",

    flickPower: 300,
    autoplay: true,
    interval: 5000,

    arrows: true,
    updateOnMove: true,

    classes: {
        arrow : 'splide__arrow splide_arrow',
		prev  : 'splide__arrow--prev arrow--prev',
		next  : 'splide__arrow--next arrow--next',
        pagination: 'splide__pagination paginations',
        page  : 'splide__pagination__page pagination',
    },

    breakpoints: {
		1023: {
            perPage: 1,
            padding: "30%",
            gap: "10%",
            fixedWidth: "200%",
            arrows: false,
		},
    }
}).mount();