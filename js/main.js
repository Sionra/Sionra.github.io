(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Typed Initiate
    if ($('.hero .hero-text h2').length == 1) {
        var typed_strings = $('.hero .hero-text .typed-text').text();
        var typed = new Typed('.hero .hero-text h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            }
        }
    });
    
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    $('.portfolio-item').hover(
        function () {
            let imgHeight = $(this).find('.portfolio-img').height();
            console.log(imgHeight);
            let imgHeightMargin = imgHeight - 25;
            let translationValue = "translateY(-" + imgHeightMargin + "px)";

            $(this).find('.portfolio-img img').css("filter", "brightness(0.4)");
            $(this).find('.portfolio-img').css("box-shadow", "none");
            $(this).find('.portfolio-content').height(imgHeightMargin);
            $(this).find('.portfolio-content').css('transform', translationValue);
            $(this).find('.portfolio-content').css("justify-content", "center");
            $(this).find('.portfolio-title').attr('style','color : white !important');
            $(this).find('.portfolio-content .portfolio-text-container').css('display', 'block');
        },

        function () {
            $(this).find('.portfolio-img img').css("filter", "");
            $(this).find('.portfolio-img').css("box-shadow", "");
            $(this).find('.portfolio-content').css('transform', "");     
            $(this).find('.portfolio-content').css("justify-content", "");       
            $(this).find('.portfolio-title').attr('style','color : "');
            $(this).find('.portfolio-content .portfolio-text-container').css('display', 'none');
        }
    )
    
})(jQuery);

