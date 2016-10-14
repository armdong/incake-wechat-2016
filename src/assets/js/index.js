/**
 * Desc: homepage javascript file
 * Author: armdong
 * Date: 2016/09/12
 */

;(function($, window, document) {

    $(function() {

        /**
         * ========================
         * =      声明变量
         * ========================
         */
        var swiperBanner = null,
            swiperRecommend = null,
            swiperNewOnSale = null,
            swiperTaste = null,
            swiperScene = null;

        /**
         * ========================
         * =      函数调用
         * ========================
         */
        
        // 城市切换
        fnInitCity();

        // 首页Banner模块
        fnInitBanner();

        // 精品推荐模块
        fnInitRecommend();

        // 首页分类导航
        fnInitNavCategories();

        // 首页公告模块
        fnInitNotice();

        // 收藏/取消收藏
        fnFavor();

        // 新品上市
        fnInitNewOnSale();

        // 口味
        fnInitTaste();

        // 场景
        fnInitScene();

        // 设备横竖屏发生改变监听事件
        $(window).on('resize', function() {
            fnInitBanner();
            fnInitRecommend();
            fnInitNewOnSale();
            fnInitTaste();
            fnInitScene();
        });

        /**
         * ========================
         * =      函数声明
         * ========================
         */

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
            if (swiperBanner !== null) {
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
                    }],
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
                    }],
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
                    }]
                ]
            };
            var _html = template('tplRecSlide', _data);
            $oContainer.find('.swiper-wrapper').html(_html);

            if (swiperRecommend !== null) {
                swiperRecommend.destroy(true, true);
            }
            swiperRecommend = null;
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

        // 新品上市模块
        function fnInitNewOnSale() {
            var $oNewOnSale = $('#newOnSale');
            $oNewOnSale.empty();

            // 渲染模板 TODO 通过ajax调用对应api获取data
            var _data = {
                single: false,
                list: [{
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
                    img: 'assets/imgs/index/new_img_02.jpg',
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
                    img: 'assets/imgs/index/new_img_02.jpg',
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

            if (!_data.single) { // 多个产品   

                if (swiperNewOnSale !== null) {
                    swiperNewOnSale.destroy(true, true);
                }
                swiperNewOnSale = null;
                swiperNewOnSale = new Swiper('#newOnSale .swiper-container', {
                    scrollbarHide: true,
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    grabCursor: true,
                    freeMode: true,
                    updateTranslate: true,
                    setWrapperSize: true,
                    observer: true,
                    observeParents: true
                });
                swiperNewOnSale.update(true);
            }
        }

        // 口味模块
        function fnInitTaste() {
            var $oTaste = $('#tasteSec');
            $oTaste.empty();

            // 渲染模板 TODO 通过ajax调用对应api获取data
            var _data = {
                list: [{
                    link: 'list.html#!category=taste&taste=cheese',
                    img: 'assets/imgs/index/new_img_02.jpg',
                    name: {
                        cn: '芝士口味',
                        en: 'Cheese'
                    }
                }, {
                    link: 'list.html#!category=taste&taste=chocolate',
                    img: 'assets/imgs/index/new_img_01.jpg',
                    name: {
                        cn: '巧克力口味',
                        en: 'Chocolate'
                    }
                }, {
                    link: 'list.html#!category=taste&taste=mousse',
                    img: 'assets/imgs/index/new_img_01.jpg',
                    name: {
                        cn: '慕斯口味',
                        en: 'Mousse'
                    }
                }, {
                    link: 'list.html#!category=taste&taste=napoleon',
                    img: 'assets/imgs/index/new_img_02.jpg',
                    name: {
                        cn: '拿破仑口味',
                        en: 'Napoleon'
                    }
                }, {
                    link: 'list.html#!category=taste&taste=fruit',
                    img: 'assets/imgs/index/new_img_02.jpg',
                    name: {
                        cn: '水果口味',
                        en: 'Fruit'
                    }
                }, {
                    link: 'list.html#!category=taste&taste=milk',
                    img: 'assets/imgs/index/new_img_02.jpg',
                    name: {
                        cn: '鲜奶口味',
                        en: 'Milk'
                    }
                }, {
                    link: 'list.html#!category=taste&taste=coffee',
                    img: 'assets/imgs/index/new_img_01.jpg',
                    name: {
                        cn: '咖啡口味',
                        en: 'Coffee'
                    }
                }, {
                    link: 'list.html#!category=taste&taste=sugarfree',
                    img: 'assets/imgs/index/new_img_01.jpg',
                    name: {
                        cn: '无糖口味',
                        en: 'Sugar-free'
                    }
                }]
            };
            var _html = template('tplTaste', _data);
            $oTaste.html(_html);

            if (swiperTaste !== null) {
                swiperTaste.destroy(true, true);
            }
            swiperTaste = null;
            swiperTaste = new Swiper('#tasteSec .swiper-container', {
                scrollbarHide: true,
                slidesPerView: 'auto',
                spaceBetween: 30,
                grabCursor: true,
                freeMode: true,
                updateTranslate: true,
                setWrapperSize: true,
                observer: true,
                observeParents: true
            });
            swiperTaste.update(true);
        }
        
        // 场景模块
        function fnInitScene() {
            var $oScene = $('#sceneSec');
            $oScene.empty();

            // 渲染模板 TODO 通过ajax调用对应api获取data
            var _data = {
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/index/new_img_02.jpg',
                    name: '生日Party'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/index/new_img_02.jpg',
                    name: '生日Party'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/index/new_img_02.jpg',
                    name: '生日Party'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/index/new_img_02.jpg',
                    name: '生日Party'
                }]
            };
            var _html = template('tplScene', _data);
            $oScene.html(_html);

            if (swiperScene !== null) {
                swiperScene.destroy(true, true);
            }
            swiperScene = null;
            swiperScene = new Swiper('#sceneSec .swiper-container', {
                scrollbarHide: true,
                slidesPerView: 'auto',
                spaceBetween: 30,
                grabCursor: true,
                freeMode: true,
                updateTranslate: true,
                setWrapperSize: true,
                observer: true,
                observeParents: true
            });
            swiperScene.update(true);
        }

    });
    
    /**
     * 城市定位切换
     * @return {[type]} [description]
     */
    function fnInitCity(){
        $('#selCity').on('change', function(){
            var val = $(this).val(),
                text = $('#selCity option').not(function(){
                    return !this.selected;
                }).text();
            $('#showCity').text(text).attr('city_id', val);
        });
    }

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
                link: 'list.html#!category=all',
                title: {
                    cn: '全部商品',
                    en: 'All cakes'
                }
            }, {
                category: 'tea',
                link: 'list.html#!category=flower',
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
                link: 'list.html#!category=gift',
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
