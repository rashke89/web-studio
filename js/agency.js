/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ((mode || !$.support.boxModel)) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
                document.documentElement.clientHeight : // Standards
                document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function() {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];

        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function() {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function() {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [false]);
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [true]);
                    }
                }
            });
        }
    });

    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function() {
        $(window).scroll();
    });
})(jQuery);

/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('#services h2.section-heading').bind('inview', function(event, visible) {
    console.log('Im here');
    console.log(event, visible);
    if (visible == true) {
        $('#services').addClass('animated bounceInLeft');
    } else {
        $('#services').removeClass('animated bounceInLeft');
    }
});

$('.portfolio-item').bind('inview', function(event, visible) {
    console.log('Ovdse sam');
    if (visible == true) {
        $.each($('.portfolio-item'), function(index, value) {
            $(value).delay(350).addClass('animated zoomIn');
        });
    } else {
        $('.portfolio-item').removeClass('animated zoomIn');
    }
});

$('#about .container').one('inview', function(event, visible) {
    console.log('here');
    if (visible == true) {
        $('.timeline li').addClass('animated rollIn');
    } else {
        $('.timeline li').removeClass('animated rollIn');
    }
});


