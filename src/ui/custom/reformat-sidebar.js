import * as Sidebar from '@coreui/coreui/dist/js/coreui'

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('perfect-scrollbar')) :
        typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'perfect-scrollbar'], factory) :
            (global = global || self, factory(global.coreui = {}, global.jQuery, global.PerfectScrollbar));
}(this, (function (exports, $, PerfectScrollbar) { 'use strict';

    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
    PerfectScrollbar = PerfectScrollbar && PerfectScrollbar.hasOwnProperty('default') ? PerfectScrollbar['default'] : PerfectScrollbar;


    $ (function () {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
        var ClassName = {
            ACTIVE: 'active',
            BRAND_MINIMIZED: 'brand-minimized',
            NAV_DROPDOWN_TOGGLE: 'nav-dropdown-toggle',
            NAV_LINK_QUERIED: 'nav-link-queried',
            OPEN: 'open',
            SIDEBAR_FIXED: 'sidebar-fixed',
            SIDEBAR_MINIMIZED: 'sidebar-minimized',
            SIDEBAR_OFF_CANVAS: 'sidebar-off-canvas',
            SIDEBAR_SHOW: 'sidebar-show',
        };
        var Event = {
            CLICK: 'click',
            DESTROY: 'destroy',
            INIT: 'init',
            TOGGLE: 'toggle',
            UPDATE: 'update'
        };
        var Selector = {
            BODY: 'body',
            BRAND_MINIMIZER: '.brand-minimizer',
            NAV_DROPDOWN_TOGGLE: '.nav-dropdown-toggle',
            NAV_DROPDOWN_ITEMS: '.nav-dropdown-items',
            NAV_ITEM: '.nav-item',
            NAV_LINK: '.nav-link',
            NAV_LINK_QUERIED: '.nav-link-queried',
            NAVIGATION_CONTAINER: '.sidebar-nav',
            NAVIGATION: '.sidebar-nav > .nav',
            SIDEBAR: '.sidebar',
            SIDEBAR_MINIMIZER: '.sidebar-minimizer',
            SIDEBAR_TOGGLER: '.sidebar-toggler',
            SIDEBAR_SCROLL: '.sidebar-scroll'
        };
     /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

        $.fn.perfectScrollbar = function perfectScrollbar(event) {
            var _this = this;

            if (typeof PerfectScrollbar !== 'undefined') {
                var classList = document.body.classList;

                if (event === Event.INIT && !classList.contains(ClassName.SIDEBAR_MINIMIZED)) {
                    this.ps = this.makeScrollbar();
                }

                if (event === Event.DESTROY) {
                    this.destroyScrollbar();
                }

                if (event === Event.TOGGLE) {
                    if (classList.contains(ClassName.SIDEBAR_MINIMIZED)) {
                        this.destroyScrollbar();
                    } else {
                        this.destroyScrollbar();
                        this.ps = this.makeScrollbar();
                    }
                }

                if (event === Event.UPDATE && !classList.contains(ClassName.SIDEBAR_MINIMIZED)) {
                    // ToDo: Add smooth transition
                    setTimeout(function () {
                        _this.destroyScrollbar();

                        _this.ps = _this.makeScrollbar();
                    }, Default.transition);
                }
            }
        };

        $.fn.makeScrollbar = function makeScrollbar() {
            var container = Selector.SIDEBAR_SCROLL;

            if (document.querySelector(container) === null) {
                container = Selector.NAVIGATION_CONTAINER;

                if (document.querySelector(container) === null) {
                    return null;
                }
            }

            var ps = new PerfectScrollbar(document.querySelector(container), {
                suppressScrollX: true
            }); // ToDo: find real fix for ps rtl

            ps.isRtl = false;
            return ps;
        };

        $.fn.destroyScrollbar = function destroyScrollbar() {
            if (this.ps) {
                this.ps.destroy();
                this.ps = null;
            }
        };

        // jquery toggle just the attribute value
        $.fn.toggleAttrVal = function(attr, val1, val2) {
            var test = $(this).attr(attr);
            if ( test === val1) {
                $(this).attr(attr, val2);
                return this;
            }
            if ( test === val2) {
                $(this).attr(attr, val1);
                return this;
            }
            // default to val1 if neither
            $(this).attr(attr, val1);
            return this;
        };

        $(Selector.SIDEBAR_MINIMIZER).on(Event.CLICK, function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(Selector.BODY).toggleClass(ClassName.SIDEBAR_MINIMIZED);

            $(this).toggleAttrVal('data-toggle', "true", "false");
            if ($(Selector.SIDEBAR_MINIMIZER).attr('data-toggle') === 'true') {
                $(Selector.BODY).removeClass(ClassName.SIDEBAR_MINIMIZED);
            }

            // console.log('yes');
            // $('.sidebar-nav').perfectScrollbar(Event.UPDATE);

        });


        /** NEWS START NEW FEAT SIDEBAR ######################################################### **/
        $(Selector.SIDEBAR).hover(
            function () {
                if ($(Selector.BODY).hasClass(ClassName.SIDEBAR_MINIMIZED)) {
                    $(Selector.BODY).removeClass(ClassName.SIDEBAR_MINIMIZED);
                }
            },
            function () {
                if ($(Selector.SIDEBAR_MINIMIZER).attr('data-toggle') === 'true') {
                    // console.log('BÜYÜK')
                }else {
                    // console.log('KÜÇÜK')
                    $(Selector.BODY).addClass(ClassName.SIDEBAR_MINIMIZED);
                }
            }
        );

        $(document).keydown(function(event) {
            if ((event.metaKey || event.ctrlKey) && event.which === 77)
            {
                // console.log(ClassName.ACTIVE);

                //medium Screen
                if (window.innerWidth < 992){
                    var mdScreen = true;
                } else {
                    var mdScreen = false;
                }

                if (!mdScreen) {
                    if ($(Selector.BODY).hasClass(ClassName.SIDEBAR_MINIMIZED)) {
                        console.log('Menu On [Ctrl or CMD + M]');
                    } else {
                        console.log('Menu Off [Ctrl or CMD + M]');
                    }

                    $(Selector.SIDEBAR_MINIMIZER).toggleAttrVal('data-toggle', "true", "false");
                    $(Selector.BODY).toggleClass(ClassName.SIDEBAR_MINIMIZED);
                }

                if (mdScreen) {
                    if ($(Selector.BODY).hasClass(ClassName.SIDEBAR_SHOW)) {
                        console.log('Mobil -- Menu Off [Ctrl or CMD + M]');
                    } else {
                        console.log('Mobil -- Menu On [Ctrl or CMD + M]');
                    }

                    $(Selector.BODY).toggleClass(ClassName.SIDEBAR_SHOW);
                }

                // alert('Ctrl + M pressed!');
            }
        });


        function isMobile() {
            try{ document.createEvent("TouchEvent"); return true; }
            catch(e){ return false; }
        }

        if ( isMobile() == true ) {
            // $(document).ready(function() {
            //     console.log('Mobile (touchable)');
            // });

            //small Screen
            if (window.innerWidth < 576){
                var smScreen = true;
            } else {
                var smScreen = false;
            }

            $(document).swipe({
                swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                    if (fingerCount != 0) {
                        if (smScreen) {
                            if (direction === 'right') {
                                // console.log('RIGHT:isMobile')
                                Sidebar.Sidebar.prototype._removeClickOut()
                                $(Selector.BODY).addClass(ClassName.SIDEBAR_SHOW);

                            }
                        }

                        if (smScreen) {
                            if (direction === 'left') {
                                if (document.body.classList.contains('sidebar-show')) {
                                    // console.log('LEFT:isMobile')
                                    Sidebar.Sidebar.prototype._removeClickOut();
                                    document.body.classList.remove('sidebar-show');

                                }
                            }
                        }
                    }
                },
                swipeStatus: function (event, phase) {
                    if (smScreen) {
                        if (phase == "cancel") {
                            if (document.body.classList.contains('sidebar-show')) {
                                // console.log('CANCEL:isMobile')
                                Sidebar.Sidebar.prototype._removeClickOut();
                                document.body.classList.remove('sidebar-show');

                            }
                        }
                    }
                },
                fingers: 1,
                triggerOnTouchEnd: false,
                threshold: 25,
                excludedElements: 'label, button, input, select, textarea, .noSwipe, .card, span, i, a',
            });
        } else {
            // $(document).ready(function() {
            //     console.log('Desktop (flat)');
            // });
        }

        /** NEW FEAT SIDEBAR END ######################################################### **/

    });

})));




