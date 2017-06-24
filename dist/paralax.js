/*
 * Parallax Scrolling v1.0.0
 * https://webgadgets.net/plugins/parallax-scrolling
 *
 * Copyright 2017, WebGadgets
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2017-06-19
 */
(function ($) {
    $.fn.wgParallax = function (options) {
        
        // default settings:
        var defaults = {
            image: '',
            height: '',
            theme: '',
            disableParallax: false,
            verticalAlign: '',
            padding: '',
            responsive:{},
            onInit: function (e) {},
        };
        
        var settings = $.extend({}, defaults, options);
        
        var el = this;

        el.init = function () {
            
        };
        
        return this.each(function () {
            var elem = $(this);
            var this_e = this;

            settings.onInit.call(this_e,el);
            
            $(this_e).addClass('wgParallax');
            $(this_e).wrapInner('<div class="wgContent"></div>');
            $(this_e).children('.wgContent').wrapInner('<div class="wgText"></div>');
            
            
            checkResponsive();
            setSettings(this_e, true);
            $(window).on("resize", function (e) {
                checkResponsive();
                setSettings(this_e, false);
            });
            
        });
        
        
        function checkResponsive() {
            var responsive_obj = settings.responsive;
            if (Object.keys(responsive_obj).length !== 0) {

                var windowW = $(window).width();
                var breakpoint = null;
                $.each(responsive_obj, function (key, value) {
                    if (windowW > key) {
                        breakpoint = key;
                    }
                });

                if (breakpoint !== null) {
                    settings = $.extend({}, settings, options);
                    settings = $.extend({}, settings, options.responsive[breakpoint]);
                } else {
                    settings = $.extend({}, settings, options);
                }
            }
        }
        
        function setSettings(this_e, refresh) {
            var imageUrl;
            if (settings.image !== '') {
                imageUrl = settings.image;
            }
            if ($(this_e).data('image') != undefined) {
                imageUrl = $(this_e).data('image');
            }
            $(this_e).css({
                'background-image':'url("' + imageUrl + '")'
            });
            
            $(this_e).removeClass('disableParallax');
            if (settings.disableParallax) {
                $(this_e).addClass('disableParallax');
            }
            $(this_e).removeClass('dark light');
            if (settings.theme != '') {
                $(this_e).addClass(settings.theme);
            }

            if (settings.height !== '') {
                $(this_e).children('.wgContent').outerHeight(settings.height);
            }
            if (settings.padding !== '') {
                $(this_e).children('.wgContent').css({padding: settings.padding});
            }
            if (settings.verticalAlign !== '') {
                $(this_e).children('.wgContent').css({'vertical-align': settings.verticalAlign});
            }
        }
    };
}(jQuery));