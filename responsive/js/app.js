$(function() {

    // meanmenu

    $("#main-menu").meanmenu();

    // bx slider
    $('.bxslider').bxSlider({
      mode: 'fade'
    });

    // show back to top button

    $(window).on('scroll', function() {

        if ($(document).scrollTop() > 200) {
            $('.back-to-top-button').fadeIn();
        } else {
            $('.back-to-top-button').fadeOut();
        }
    });

    $('.back-to-top-button').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

});
