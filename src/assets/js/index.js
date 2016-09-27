/**
 * Desc: homepage javascript file
 * Author: armdong
 * Date: 2016/09/12
 */

;(function($, window, document) {

    $(function() {

        var swiperBanner = null,
            swiperRecommend = null,
            swiperNewOnSale = null;

        // 首页Banner模块
        fnInitBanner();

        // 精品推荐模块
        fnInitRecommend();

        $(window).on('resize', function() {
            fnInitBanner();            
            fnInitRecommend();
            fnInitNewOnSale();
        });

        // 首页Banner
        function fnInitBanner() {
            var $oContainer = $('#idxSlide'),
                containerWidth = $oContainer.width();

            // 渲染swiper模板
            var _data = {
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/slides/01.jpg'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/slides/02.jpg'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/slides/03.jpg'
                }]
            };
            var _html = template('tplIdxSlide', _data);
            $oContainer.find('.swiper-wrapper').html(_html);

            $oContainer.find('img').css({
                width: containerWidth,
                height: containerWidth / 2
            });
            if (swiperBanner != null) {
                swiperBanner.destroy(true, true);
            }
            swiperBanner = null;
            swiperBanner = new Swiper('#idxSlide', {
                pagination: '.swiper-pagination',
                width: containerWidth,
                height: containerWidth / 2,
                loop: true,
                centeredSlides: true,
                autoplay: 5000,
                speed: 500,
                autoplayDisableOnInteraction: false,
                preloadImages: false,
                lazyLoading: true
            });
        }

        // 精品推荐
        function fnInitRecommend() {

            var $oContainer = $('#idxSection');

            // 渲染 精品推荐 模板
            var _data = {
                list: [
                    [{
                        link: 'javascript:;',
                        img: 'assets/imgs/index/recommend_img_01.jpg',
                        name: {
                            cn: '芒果拿破仑',
                            en: 'Fresh Mango Napoleon'
                        },
                        desc: '芒果酸甜多汁和酥皮酥脆清香，是芒果拿破仑让人沉沦的独特口感。',
                        price: '189',
                        pound: '1.5',
                        discount: {
                            num1: '8',
                            num2: '.5'
                        }
                    }, {
                        link: 'javascript:;',
                        img: 'assets/imgs/index/recommend_img_02.jpg',
                        name: {
                            cn: '芒果拿破仑',
                            en: 'Fresh Mango Napoleon'
                        },
                        desc: '芒果酸甜多汁和酥皮酥脆清香，是芒果拿破仑让人沉沦的独特口感。',
                        price: '189',
                        pound: '1.5',
                        discount: {
                            num1: '8',
                            num2: '.5'
                        }
                    }], [{
                        link: 'javascript:;',
                        img: 'assets/imgs/index/recommend_img_01.jpg',
                        name: {
                            cn: '芒果拿破仑',
                            en: 'Fresh Mango Napoleon'
                        },
                        desc: '芒果酸甜多汁和酥皮酥脆清香，是芒果拿破仑让人沉沦的独特口感。',
                        price: '189',
                        pound: '1.5',
                        discount: {
                            num1: '8',
                            num2: '.5'
                        }
                    }, {
                        link: 'javascript:;',
                        img: 'assets/imgs/index/recommend_img_02.jpg',
                        name: {
                            cn: '芒果拿破仑',
                            en: 'Fresh Mango Napoleon'
                        },
                        desc: '芒果酸甜多汁和酥皮酥脆清香，是芒果拿破仑让人沉沦的独特口感。',
                        price: '189',
                        pound: '1.5',
                        discount: {
                            num1: '8',
                            num2: '.5'
                        }
                    }], [{
                        link: 'javascript:;',
                        img: 'assets/imgs/index/recommend_img_01.jpg',
                        name: {
                            cn: '芒果拿破仑',
                            en: 'Fresh Mango Napoleon'
                        },
                        desc: '芒果酸甜多汁和酥皮酥脆清香，是芒果拿破仑让人沉沦的独特口感。',
                        price: '189',
                        pound: '1.5',
                        discount: {
                            num1: '8',
                            num2: '.5'
                        }
                    }, {
                        link: 'javascript:;',
                        img: 'assets/imgs/index/recommend_img_02.jpg',
                        name: {
                            cn: '芒果拿破仑',
                            en: 'Fresh Mango Napoleon'
                        },
                        desc: '芒果酸甜多汁和酥皮酥脆清香，是芒果拿破仑让人沉沦的独特口感。',
                        price: '189',
                        pound: '1.5',
                        discount: {
                            num1: '8',
                            num2: '.5'
                        }
                    }]
                ]
            };
            var _html = template('tplRecSlide', _data);
            $oContainer.find('.swiper-wrapper').html(_html);

            if (swiperRecommend != null) {
                swiperRecommend.destroy(true, true);
            }

            swiperRecommend = new Swiper('#recSlide', {
                pagination: '.swiper-pagination',
                loop: false,
                centeredSlides: true,
                speed: 500,
                preloadImages: true,
                lazyLoading: true,
                updateTranslate: true
            });
            swiperRecommend.update(true);
        }

        // 首页分类导航
        fnInitNavCategories();

        // 首页公告模块
        fnInitNotice();

        // 收藏/取消收藏
        fnFavor();

        // 新品上市
        fnInitNewOnSale();

        // 新品上市模块
        function fnInitNewOnSale() {
            var $oNewOnSale = $('#newOnSale');

            // 渲染模板
            var _data = {
                single: false,
                list: [{
                    link: 'http://www.baidu.com',
                    img: 'assets/imgs/index/new_img_01.jpg',
                    name: {
                        cn: '超级蜂巢',
                        en: 'Super hive cake'
                    },
                    desc: '芒果的酸甜“侵略”了蛋糕的每一寸，果浆比果酱更有热带水果的醇香。',
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/index/new_img_01.jpg',
                    name: {
                        cn: '超级蜂巢',
                        en: 'Super hive cake'
                    },
                    desc: '芒果的酸甜“侵略”了蛋糕的每一寸，果浆比果酱更有热带水果的醇香。',
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/index/new_img_01.jpg',
                    name: {
                        cn: '超级蜂巢',
                        en: 'Super hive cake'
                    },
                    desc: '芒果的酸甜“侵略”了蛋糕的每一寸，果浆比果酱更有热带水果的醇香。',
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/index/new_img_01.jpg',
                    name: {
                        cn: '超级蜂巢',
                        en: 'Super hive cake'
                    },
                    desc: '芒果的酸甜“侵略”了蛋糕的每一寸，果浆比果酱更有热带水果的醇香。',
                    price: '189',
                    pound: '1.5'
                }]
            };
            var _html = template('tplNewOnSale', _data);
            $oNewOnSale.html(_html);

            if(!_data.single) { // 多个产品               

                if (swiperNewOnSale != null) {
                    swiperNewOnSale.destroy(true, true);
                }
                swiperNewOnSale = null;
                swiperNewOnSale = new Swiper('#newOnSale', {
                    scrollbarHide: true,
                    setWrapperSize: true,
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    grabCursor: true,
                    loop: false,
                    speed: 500,
                    preloadImages: true,
                    lazyLoading: true,
                    updateTranslate: true,
                    onInit: function(swiper) {
                        //console.log(swiper);
                        console.log(swiper.width);
                        console.log(swiper.virtualSize);                        
                    }
                });
                swiperNewOnSale.update(true);
            }
        }

    });
    
    

    /**
     * [fnInitNavCategories 首页分类菜单模块]
     * @return {[type]} [description]
     */
    function fnInitNavCategories() {
        var $oNav = $('#idxNav');

        // 渲染菜单导航栏模板
        var _data = {
            list: [{
                category: 'all',
                link: 'javascript:;',
                title: {
                    cn: '全部商品',
                    en: 'All cakes'
                }
            }, {
                category: 'tea',
                link: 'javascript:;',
                title: {
                    cn: '下午茶',
                    en: 'Afternoon tea'
                }
            }, {
                category: 'diy',
                link: 'javascript:;',
                title: {
                    cn: '蛋糕定制',
                    en: 'DIY cake'
                }
            }, {
                category: 'gaw',
                link: 'javascript:;',
                title: {
                    cn: 'GAW蛋糕',
                    en: 'Genius at work'
                }
            }]
        };
        var _html = template('tplIdxNav', _data);
        $oNav.html(_html);
    }

    /**
     * [fnInitNotice 首页公告模块]
     * @return {[type]} [description]
     */
    function fnInitNotice() {
        var $oNotice = $('#idxNotice'),
            $oNoticeMsg = $oNotice.find('.notice-msg'),
            $oNoticeClose = $oNotice.find('.notice-close'),
            tl = new TimelineLite();

        // 关闭公告
        $oNoticeClose.on('click', function() {
            tl.clear();
            tl.to($oNotice, 0.5, {
                opacity: 0,
                ease: Linear.easeOut,
                useFrames: true,
                onComplete: function() {
                    $oNotice.remove();
                }
            });
        });

        // 公告轮播
        var marqueeText = '非真正内容非真正内容，非真正内容非真正内容非真正内容。非真正内容非真正内容，非真正内容非真正内容非真正内容。';
        $oNoticeMsg.marquee({
            text: marqueeText,
            timer: 200,
            direction: 'left'
        });
    }

    /**
     * [fnFavor 产品收藏模块]
     * @return {[type]} [description]
     */
    function fnFavor() {
        var $oContainer = $('#idxSection');

        $oContainer.on('click', '.favor', function() {
            $(this).toggleClass('followed');
        });            
    }

})(Zepto, window, document);