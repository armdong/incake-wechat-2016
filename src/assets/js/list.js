/**
 * Desc: list javascript file
 * Author: armdong
 * Date: 2016/10/12
 */

;(function($, window, document) {

    // 状态管理
    var stateMap = {
        anchor_map: {}
    };

    $(function() {

        // 口味模块各种口味offset().top
        window.tasteTops = {};

        // 发现切换
        fnChangeCategories();

        // 绑定全部模块
        fnBindAll();

        // 绑定口味模块
        fnBindTaste();

        // 绑定场景模块
        fnBindScene();

        // 绑定创意/礼品模块
        fnBindGift();

        // 绑定下午茶/鲜花模块
        fnBindFlower();

        // 口味模块scroll事件
        var lazyScroll = _.debounce(fnLocateTaste, 300);
        $(window).on('scroll', lazyScroll);

        // 改变窗口尺寸重新计算tasteTops对象
        var lazyResize = _.debounce(fnCalcTasteTops, 300);
        $(window).on('resize', lazyResize);

        $(window).bind('hashchange', onHashchange).trigger('hashchange');

        // 立即购买或添加到购物篮
        fnAddToCart();
    });

    /**
     * [fnAddToCart 购买商品]
     * @return {[type]} [description]
     */
    function fnAddToCart() {

        // 立即购买或添加至购物篮弹层
        var $oAddToCart = $('#addToCart'),
            $oCartHeader = $oAddToCart.find('.header'),
            $oCartContainer = $oAddToCart.find('.container'),
            $oCartFooter = $oAddToCart.find('.footer'),
            tl = new TimelineLite(),
            $oBtnMinus = $oCartContainer.find('.btn-minus'),
            $oBtnAdd = $oCartContainer.find('.btn-add'),
            $oCountDom = $oCartContainer.find('.count'),
            iCurrCount = 1;

        // 购买‘+’按钮点击事件
        $('#listContainer').on('click', '.add-icon', function() {   
            tl.clear();
            tl.to($oAddToCart, .5, {
                y: '0%',
                onStart: function() {
                    Mask.show();
                    $('#mask').css({
                        'background-color': 'rgba(0, 0, 0, .8)'
                    });
                    $oAddToCart.show();
                    $oAddToCart.css({
                        'opacity': 1
                    });
                }
            });
        });

        // 规格切换
        $oCartContainer.find('.spec-list').on('click', 'li', function(){

            // TODO 切换规格后同步 .note 节点
            $(this).addClass('active').siblings().removeClass('active');
        });

        // 数量减少
        $oBtnMinus.on('click', function(){
            iCurrCount = parseInt($oCountDom.val(), 10);
            iCurrCount --;

            if(iCurrCount <= 1) {
                iCurrCount = 1;
                $(this).addClass('disabled');
            }

            $oCountDom.val(iCurrCount);
        });

        // 数量增加
        $oBtnAdd.on('click', function(){
            iCurrCount = parseInt($oCountDom.val(), 10);
            iCurrCount ++;

            if(iCurrCount > 1 && $oBtnMinus.hasClass('disabled')) {
                $oBtnMinus.removeClass('disabled');
            }

            // 限制单个商品每次最多能买99个
            if(iCurrCount > 99) {
                iCurrCount = 99;
            }
            $oCountDom.val(iCurrCount);
        });

        // 加入购物篮
        $oCartFooter.on('click', '.join-cart', function(){

            // TODO 处理加入购物车逻辑

            // 收缩弹层
            tl.clear();
            tl.to($oAddToCart, .2, {
                y: '110%',
                onComplete: function() {
                    Mask.hide();
                    $oAddToCart.hide();
                    var dialog = $(document).dialog({
                        type: 'toast',
                        infoIcon: 'assets/plugins/dialog2/images/icon/success.png',
                        infoText: '已加入购物篮',
                        autoClose: '3000'
                    });
                }
            });            
        });

        // 关闭弹层
        $oAddToCart.find('.cart-close').on('click', function() {
            tl.clear();
            tl.to($oAddToCart, .5, {                
                'opacity': 0,
                onComplete: function() {
                    Mask.hide();
                    $oAddToCart.hide();
                    tl.to($oAddToCart, 0, {
                        y: '110%'
                    });
                }
            });
            tl.to('#mask', .5, {
                'background-color': 'rgba(0, 0, 0, 0)'
            }, 0);
        });
    }

    /**
     * 绑定下午茶/鲜花数据模板
     * @return {[type]} [description]
     */
    function fnBindFlower() {
        var $oSecFlower = $('#secFlower'),
            $oFlowerList = $oSecFlower.find('.flower-list');

        var _data = {
            flowers: [{
                type: 'sweets',
                title: '甜品',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    soldout: true
                }]
            }, {
                type: 'drinks',
                title: '饮品',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'flowers',
                title: '鲜花',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'parts',
                title: '配件',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }]
        };
        var _html = template('tplFlower', _data);
        $oFlowerList.html(_html);
    }

    /**
     * 绑定创意/礼品数据模板
     * @return {[type]} [description]
     */
    function fnBindGift() {
        var $oSecGift = $('#secGift'),
            $oGiftList = $oSecGift.find('.gift-list');

        var _data = {
            giftes:[{
                type: 'gaw',
                title: 'GAW经典',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    soldout: true
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'diy',
                title: '选拼系列',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'star',
                title: '星座系列',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }]
        };
        var _html = template('tplGift', _data);
        $oGiftList.html(_html);
    }

    /**
     * 场景模块数据绑定
     * @return {[type]} [description]
     */
    function fnBindScene() {
        var $oSecScene = $('#secScene');

        var _data = {
            list: [{
                link: 'javascript:;',
                img: 'assets/imgs/list/scene_img_02.jpg',
                name: {
                    en: 'BIRTHDAY PARTY',
                    cn: '生日聚会'
                }
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/scene_img_01.jpg',
                name: {
                    en: 'WEDDING CEREMONY',
                    cn: '婚庆典礼'
                }
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/scene_img_02.jpg',
                name: {
                    en: 'BIRTHDAY',
                    cn: '祝寿'
                }
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/scene_img_03.jpg',
                name: {
                    en: 'HUNDRED DAYS',
                    cn: '百天'
                }
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/scene_img_01.jpg',
                name: {
                    en: 'MEMORIAL DAY',
                    cn: '纪念日'
                }
            }]
        };
        var _html = template('tplScene', _data);
        $oSecScene.html(_html);
    }

    /**
     * 滑动时定位口味类型
     * @return {[type]} [description]
     */
    function fnLocateTaste() {
        var scrollTop = $('body').scrollTop(),
            currLocate = 'cheese';

        if (scrollTop <= tasteTops.cheese - tasteTops.disT) {
            currLocate = 'cheese';
        } else if (scrollTop > tasteTops.chocolate - tasteTops.disT && scrollTop <= tasteTops.mousse - tasteTops.disT) {
            currLocate = 'chocolate';
        } else if (scrollTop > tasteTops.mousse - tasteTops.disT && scrollTop <= tasteTops.napoleon - tasteTops.disT) {
            currLocate = 'mousse';
        } else if (scrollTop > tasteTops.napoleon - tasteTops.disT && scrollTop <= tasteTops.fruit - tasteTops.disT) {
            currLocate = 'napoleon';
        } else if (scrollTop > tasteTops.fruit - tasteTops.disT && scrollTop <= tasteTops.milk - tasteTops.disT) {
            currLocate = 'fruit';
        } else if (scrollTop > tasteTops.milk - tasteTops.disT && scrollTop <= tasteTops.coffee - tasteTops.disT) {
            currLocate = 'milk';
        } else if (scrollTop > tasteTops.coffee - tasteTops.disT && scrollTop <= tasteTops.sugarfree - tasteTops.disT) {
            currLocate = 'coffee';
        } else if (scrollTop > tasteTops.sugarfree - tasteTops.disT) {
            currLocate = 'sugarfree';
        }
        $('#secTaste').find('.nav-list').find('.nav-item')
            .filter('div[taste=' + currLocate + ']')
            .addClass('active')
            .siblings()
            .removeClass('active');
    }

    /**
     * 口味切换
     * @return {[type]} [description]
     */
    function fnChangeTaste() {
        var $oSecTaste = $('#secTaste'),
            tl = new TimelineLite();

        $oSecTaste.on('click', '.nav-item', function() {
            $(this).addClass('active').siblings().removeClass('active');

            var currTaste = $(this).attr('taste');

            tl.clear();
            tl.to($('html,body'), 0.5, {
                'scrollTop': tasteTops[currTaste] - tasteTops.disT + 5
            });
        });
    }
    function changeTaste(taste) {
        var $oTaste = $('#secTaste').find('.nav-item').filter('[taste=' + taste + ']'),
            currTaste = $oTaste.attr('taste'),
            tl = new TimelineLite();

        $oTaste.addClass('active').siblings().removeClass('active');
        tl.clear();
        tl.to($('html,body'), 0, {
            'scrollTop': tasteTops[currTaste] - tasteTops.disT + 5
        });
        changeAnchorPart({
            taste: currTaste
        });
    }

    /**
     * 绑定口味
     * @return {[type]} [description]
     */
    function fnBindTaste() {
        var $oSecTaste = $('#secTaste'),
            $oTasteList = $oSecTaste.find('.taste-list');

        var _data = {
            tastes:[{
                type: 'cheese',
                title: '芝士口味',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'chocolate',
                title: '巧克力口味',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    soldout: true
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'mousse',
                title: '慕斯口味',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'napoleon',
                title: '拿破仑口味',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'fruit',
                title: '水果口味',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'milk',
                title: '鲜奶口味',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'coffee',
                title: '咖啡口味',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }, {
                type: 'sugarfree',
                title: '无糖口味',
                list: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5'
                }]
            }]
        };
        var _html = template('tplTaste', _data);
        $oTasteList.html(_html);

        // 口味切换
        fnChangeTaste();
    }

    /**
     * 绑定所有
     * @return {[type]} [description]
     */
    function fnBindAll() {
        var $oContainer = $('#secAll');

        // 渲染 全部 模板
        var _data = {
            list: [{
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                soldout: true // 如果售罄，则需返回该字段
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                soldout: true
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }]
        };
        var _html = template('tplAll', _data);
        $oContainer.html(_html);
    }

    /**
     * 发现类别切换
     * @return {[type]} [description]
     */
    function fnChangeCategories() {
        var $oListHeader = $('#listHeader'),
            $oListContainer = $('#listContainer');

        $oListHeader.on('click', '.c-item', function() {
            var category = $(this).attr('category');

            $(this).addClass('active').siblings().removeClass('active');

            $oListContainer.find('.sec')
                .filter('.sec[category=' + category + ']')
                .addClass('active')
                .siblings()
                .removeClass('active');

            // 如果是口味模块，计算每种口味的top值
            if (category === 'taste') {
                fnCalcTasteTops();
            } else {
                // 每次切换，scrollTop设为0
                $(window).scrollTop(0);
                delete stateMap.anchor_map.taste;
            }

            // 设置当前的发现种类，利用hashchange来管理历史状态
            changeAnchorPart({
                category: category
            });

        });
    }
    function changeCategories(category) {
        $('#listHeader').find('.c-item').filter('[category=' + category + ']').trigger('click');
    }

    /**
     * 计算口味模块每个口味的offset().top值
     * @return {[type]} [description]
     */
    function fnCalcTasteTops() {
        var $oSecTaste = $('#secTaste'),
            $aTasteItem = $oSecTaste.find('.taste-item');

        if ($oSecTaste.hasClass('active')) {
            $aTasteItem.each(function(i, ele) {
                var currTaste = $(this).attr('taste'),
                    currOffsetTop = Math.round($(this).offset().top);
                tasteTops[currTaste] = currOffsetTop;
                if (i === 0) {
                    tasteTops.disT = currOffsetTop;
                }
            });
        }
    }

    // Returns copy of stored anchor map
    function copyAnchorMap() {
        return $.extend(true, {}, stateMap.anchor_map || {});
    }

    // Changes part of the URI anchor component
    function changeAnchorPart(arg_map) {
        var anchor_map_revise = copyAnchorMap(),
            bool_return = true,
            key_name, key_name_dep;

        // Begin merge changes into anchor map
        KEYVAL:
            for (key_name in arg_map) {
                if (arg_map.hasOwnProperty(key_name)) {

                    // skip dependent keys during iteration
                    if (key_name.indexOf('_') === 0) {
                        continue KEYVAL;
                    }

                    // update indepedent key value
                    anchor_map_revise[key_name] = arg_map[key_name];

                    // update matching dependent key
                    key_name_dep = '_' + key_name;
                    if (arg_map[key_name_dep]) {
                        anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                    } else {
                        delete anchor_map_revise[key_name_dep];
                        delete anchor_map_revise['_s' + key_name_dep];
                    }
                }
            }
            // End merge changes into anchor map

        // Begin attempt to update URI; revert if not successful
        try {
            $.uriAnchor.setAnchor(anchor_map_revise);
        } catch (error) {
            // replace URI with existing state
            $.uriAnchor.setAnchor(stateMap.anchor_map, null, true);
            bool_return = false;
        }
        // End attempt to update URI

        return bool_return;
    }

    // Handles the hashchange event
    function onHashchange(event) {
        var
            anchor_map_previous = copyAnchorMap(),
            anchor_map_proposed,
            _s_category_previous, _s_category_proposed,
            s_category_proposed,
            _s_taste_previous, _s_taste_proposed,
            s_taste_proposed;

        // attempt to parse anchor
        try {
            anchor_map_proposed = $.uriAnchor.makeAnchorMap();
        } catch (error) {
            $.uriAnchor.setAnchor(anchor_map_previous, null, true);
            return false;
        }
        stateMap.anchor_map = anchor_map_proposed;

        // convenience vars
        _s_category_previous = anchor_map_previous._s_category;
        _s_category_proposed = anchor_map_proposed._s_category;
        _s_taste_previous = anchor_map_previous._s_taste;
        _s_taste_proposed = anchor_map_proposed._s_taste;

        // Begin adjust category component if changed
        if (!anchor_map_previous || _s_category_previous !== _s_category_proposed || _s_taste_previous !== _s_taste_proposed) {
            s_category_proposed = anchor_map_proposed.category;
            s_taste_proposed = anchor_map_proposed.taste;
            switch (s_category_proposed) {
                case 'all':
                    changeCategories('all');
                    break;
                case 'taste':
                    changeCategories('taste');
                    if(!!s_taste_proposed) {changeTaste(s_taste_proposed);}
                    break;
                case 'scene':
                    changeCategories('scene');
                    break;
                case 'gift':
                    changeCategories('gift');
                    break;
                case 'flower':
                    changeCategories('flower');
                    break;
                default:
                    changeCategories('all');
                    delete anchor_map_proposed.category;
                    delete anchor_map_proposed.taste;
                    $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
            }
        }
        // End adjust category component if changed
        return false;
    }

})(Zepto, window, document);
