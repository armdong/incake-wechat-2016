/**
 * Desc: list javascript file
 * Author: armdong
 * Date: 2016/10/12
 */

;(function($, window, document) {

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
    });

    /**
     * 绑定下午茶/鲜花数据模板
     * @return {[type]} [description]
     */
    function fnBindFlower() {
        var $oSecFlower = $('#secFlower'),
            $oFlowerList = $oSecFlower.find('.flower-list'),
            $aFlowerItem = $oFlowerList.find('.flower-item');

        var _data = {
            sweets: {
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
            },
            drinks: {
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
            },
            flowers: {
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
            },
            parts: {
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
            }
        };

        // 遍历
        $.each($aFlowerItem, function(i, item) {
            var $oCurrFlower = $(item),
                flowerType = $oCurrFlower.attr('flower');

            if (!!_data[flowerType]) {
                var _html = template('tplList', _data[flowerType]);
                $oCurrFlower.append(_html);
            }
        });
    }

    /**
     * 绑定创意/礼品数据模板
     * @return {[type]} [description]
     */
    function fnBindGift() {
        var $oSecGift = $('#secGift'),
            $oGiftList = $oSecGift.find('.gift-list'),
            $aGiftItem = $oGiftList.find('.gift-item');

        var _data = {
            gaw: {
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
            },
            diy: {
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
            },
            star: {
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
            }
        };

        // 遍历
        $.each($aGiftItem, function(i, item) {
            var $oCurrGift = $(item),
                giftType = $oCurrGift.attr('gift');

            if (!!_data[giftType]) {
                var _html = template('tplList', _data[giftType]);
                $oCurrGift.append(_html);
            }
        });
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
            $oTasteList = $oSecTaste.find('.taste-list'),
            $aTasteItem = $oTasteList.find('.taste-item');

        var _data = {
            cheese: {
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
            },
            chocolate: {
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
            },
            napoleon: {
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
            },
            mousse: {
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
            },
            milk: {
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
            },
            coffee: {
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
            },
            fruit: {
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
            },
            sugarfree: {
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
            }
        };

        // 遍历所有的口味
        $.each($aTasteItem, function(i, item) {
            var $oCurrTaste = $(item),
                tasteType = $oCurrTaste.attr('taste');

            if (!!_data[tasteType]) {
                var _html = template('tplList', _data[tasteType]);
                $oCurrTaste.append(_html);
            }
        });

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
        var _html = template('tplList', _data);
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
