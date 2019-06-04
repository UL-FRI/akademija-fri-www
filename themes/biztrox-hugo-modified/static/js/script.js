(function ($) {
    'use strict';

    // Preloader js
    $(window).on('load', function () {
        $('.preloader').fadeOut(700);
    });

    //Hero Slider
    $('.homepage-slider').slick({
        autoplay: true,
        infinite: true,
        arrows: true,
        prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-arrow-left\'></i></button>',
        nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-arrow-right\'></i></button>',
        // dots: true,
        // customPaging: function (slider, i) {
        //     var icon = $(slider.$slides[i]).data('icon');
        //     var text = $(slider.$slides[i]).data('text');
        //     return '<a><i class="' + icon + '"></i><span>' + text + '</span></a>';
        // },
        responsive: [{
            breakpoint: 576,
            settings: {
                arrows: false
            }
        }]
    });
    $('.homepage-slider').slickAnimation();

    // animation scroll js
    var html_body = $('html, body');
    $('nav a, .page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                html_body.animate({
                    scrollTop: target.offset().top - 90
                }, 1500, 'easeInOutExpo');
                return false;
            }
        }
    });

    // easeInOutExpo Declaration
    jQuery.extend(jQuery.easing, {
        easeInOutExpo: function (x, t, b, c, d) {
            if (t === 0) {
                return b;
            }
            if (t === d) {
                return b + c;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            }
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    });

    // back to top button
    $('.back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
    });

    //Active changer
    $('.control').on('click', function () {
        $('.control').removeClass('active');
        $(this).addClass('active');
    });

    // mixitup filter
    var containerEl = document.querySelector('[data-ref~="mixitup-container"]');
    var mixer;
    if (containerEl) {
        mixer = mixitup(containerEl, {
            selectors: {
                target: '[data-ref~="mixitup-target"]'
            }
        });
    }

    // clients logo slider
    $('.client-logo-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        arrows: false,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Disable newsletter send button until the user fills out something
    // in the email field and agrees to the terms of service.
    newsletter_set_button(true);
    $("#gdpr_19317").change(function() {
        if (this.checked &&
            $('#mce-EMAIL').val().length > 0) {
            // Enabled prijava
            newsletter_set_button(false);
        }  else {
            newsletter_set_button(true);
        }
    });

})(jQuery);

function newsletter_set_button(disabled) {
    // Disabled is a boolean value whether the button is disabled or not.
    $("#mc-embedded-subscribe").prop("disabled", disabled);
}
