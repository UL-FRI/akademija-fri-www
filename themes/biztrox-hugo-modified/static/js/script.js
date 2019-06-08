// Returns the GET parameter if one exists otherwise null
// https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
        return null;
    }
    return decodeURI(results[1]) || null;
}

function anchorize_sanatize(word) {
    const regex = /[\wščžćđ]/gmi;

    let res = '';
    for (let i = 0; i < word.length; i++) {
        if (word[i].match(regex) != null) {
            res += word[i];
        } else if (i > 0 && i !== word.length - 1 && res[res.length-1] !== '-') {
            res += '-';
        }
    }

    if (res[res.length - 1] === '-') {
        res = res.slice(0, res.length - 1);
    }

    return res;
}

// Does what the hugo template anchorize function does.
function anchorize(input) {
    return anchorize_sanatize(input.toLowerCase())
}

(function ($) {
    'use strict';

    //Hero Slider
    $('.homepage-slider').slick({
        autoplay: true,
        infinite: true,
        arrows: true,
        prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-arrow-left\'></i></button>',
        nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-arrow-right\'></i></button>',
        responsive: [{
            breakpoint: 576,
            settings: {
                arrows: false
            }
        }]
    }).slickAnimation();

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

    // Active changer
    $('.control').on('click', function () {
        $('.control').removeClass('active');
        $(this).addClass('active');
    });

    // mixitup filter. Save the user's filter into a cookie so that when
    // they visit the same page again the same filter is already applied.
    var containerEl = document.querySelector('[data-ref~="mixitup-container"]');
    var mixer;
    if (containerEl) {
        mixer = mixitup(containerEl, {
            selectors: {
                target: '[data-ref~="mixitup-target"]'
            },
            callbacks : {
                onMixClick: function(state, originalEvent) {
                    let filterText = originalEvent.target.innerText;

                    console.log("Enabling list filter:", filterText);

                    var param = "?izpfilter=" + filterText;
                    window.history.replaceState(null, null, window.location.pathname + param);
                }
            }
        });

        let filterTextIzobrazevanja = urlParam('izpfilter');

        if (filterTextIzobrazevanja && filterTextIzobrazevanja != "Vsi") {
            console.log("Enabling list filter:", filterTextIzobrazevanja);
            $(`li small:contains(${filterTextIzobrazevanja})`).parent().trigger("click");
        } else {
            console.log("No list filter");
        }


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


    function newsletter_set_button(s) {
        $("#mc-embedded-subscribe").prop("disabled", !s);
    }

    // Disable newsletter send button until the user fills out something
    // in the email field and agrees to the terms of service.
    newsletter_set_button(false);

    function newsletter_check(checkbox_selector, email_selector) {
        if ($(checkbox_selector).length) {
            if (!$(checkbox_selector)[0].checked) {
                return false;
            }
        }

        return $(email_selector).val().length > 0;
    }

    function newsletter_form_check() {
        newsletter_set_button(newsletter_check('#gdpr_19317', '#mce-EMAIL'));
    }

    $('#gdpr_19317').change(newsletter_form_check);
    $('#mce-EMAIL').on('input', newsletter_form_check);

})(jQuery);