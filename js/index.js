$(document).ready(function () {
    $('body').scrollspy({
        target: '#navbar'
    })

    var images = "",
        count = 18;
    for (var i = 1; i <= count; i++)
        images += '<img src="photos/' + i + '.jpg" />';

    $(".grid").append(images);

    var d = 0; //delay
    var ry, tz, s; //transform params

    //animation time
    //fading out the thumbnails with style
    $(".grid img").each(function () {
            d = Math.random() * 1000; //1ms to 1000ms delay
            $(this).delay(d).animate({
                opacity: 0
            }, {
                //while the thumbnails are fading out, we will use the step function to apply some transforms. variable n will give the current opacity in the animation.
                step: function (n) {
                    s = 1 - n; //scale - will animate from 0 to 1
                    $(this).css("transform", "scale(" + s + ")");
                },
                duration: 1000,
            })
        }).promise().done(function () {
            //after *promising* and *doing* the fadeout animation we will bring the images back
            storm();
        })
        //bringing back the images with style
    function storm() {
        $(".grid img").each(function () {
            d = Math.random() * 1000;
            $(this).delay(d).animate({
                opacity: 1
            }, {
                step: function (n) {
                    //rotating the images on the Y axis from 360deg to 0deg
                    ry = (1 - n) * 360;
                    //translating the images from 1000px to 0px
                    tz = (1 - n) * 1000;
                    //applying the transformation
                    $(this).css("transform", "rotateY(" + ry + "deg) translateZ(" + tz + "px)");
                },
                duration: 3000,
                //some easing fun. Comes from the jquery easing plugin.
                easing: 'easeOutQuint',
            })
        })
    }

    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $(".next").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')'
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

    $(".previous").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'left': left
                });
                previous_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

    $(".submit").click(function () {
        return false;
    })
});
