/**
 * Desc: list javascript file
 * Author: armdong
 * Date: 2016/10/12
 */

/**
 * 对规格进行格式化
 * @param  spec    要格式化的规格
 * @param  format  进行格式化的规格字符串
 * @return [description]
 */
template.helper('specFormat', function(spec) {
    var str = '';
    if(!!spec && $.isArray(spec)){
        for(var i = 0, len = spec.length; i < len; i++) {
            str += spec[i].price + ',' + spec[i].pound + ',' + spec[i].note;
            if( i !== len - 1) {
                str += '|';
            }
        }
    }
    return str;
});

;(function($, window, document) {

    // 状态管理
    var stateMap = {
        anchor_map: {}
    };

    $(function() {

        // 解决Zepto点透bug
        FastClick.attach(document.body);

        // 口味模块各种口味offset().top
        window.tasteTops = {};

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

        // 发现切换
        fnChangeCategories();

        // 口味模块scroll事件
        var lazyScroll = _.debounce(fnLocateTaste, 300);
        $(window).on('scroll', lazyScroll);

        // 改变窗口尺寸重新计算tasteTops对象
        var lazyResize = _.debounce(fnCalcTasteTops, 300);
        $(window).on('resize', lazyResize);

        $(window).bind('hashchange', onHashchange).trigger('hashchange');

        // 立即购买或添加到购物篮
        fnAddToCart();        

        // 全部模块scroll事件
        var loadMore = _.debounce(fnLoadMore, 300);
        $(window).on('scroll', loadMore);
    });

    /**
     * 全部模块加载更多
     * @return {[type]} [description]
     */
    function fnLoadMore() {

        // 拿到当前处于选中状态的选项
        var $oCurrCategory = $('#listHeader').find('.active'),
            $oMenu = $('#menuNav'),
            category = $oCurrCategory.attr('category'),
            scrollTop = $('body').scrollTop(),
            screenH = $(window).height(),
            menuH = $oMenu.height();

        if(category === 'all') {      
            var $oSecAll = $('#secAll'),
                $oLoadMore = $oSecAll.find('.load-more'),
                iLoadMoreT = $oLoadMore.offset().top,
                disT = scrollTop + screenH - iLoadMoreT - menuH;

            if(disT >= 0) {

                // 发送请求加载更多
                $.ajax({
                    url: './assets/js/loadMore.json',
                    type: 'GET',
                    data: {},
                    dataType: 'json',
                    beforeSend: function(xhr, settings) {
                        $oLoadMore.html('正在加载...');
                    },
                    success: function(data, status, xhr) {
                        var loadMoreText = '';
                        if(data.isComplete) {
                            loadMoreText = '已全部加载完成！';
                        } else {
                            var _html = template('tplLoadMore', data);
                            $oSecAll.find('.list').append(_html);
                            loadMoreText = '加载成功...';
                        }
                        $oLoadMore.html(loadMoreText);
                    },
                    error: function(xhr, errorType, error) {
                        var dialog = $(document).dialog({
                            type: 'toast',
                            infoIcon: 'assets/plugins/dialog2/images/icon/fail.png',
                            infoText: '网络异常',
                            autoClose: '1500'
                        });
                        $oLoadMore.html('点击加载更多...');
                    }
                });
            }
        }
    }

    /**
     * [fnAddToCart 购买商品]
     * @return {[type]} [description]
     */
    function fnAddToCart() {

        // 立即购买或添加至购物篮弹层
        var $oAddToCart = $('#addToCart'),
            tl = new TimelineLite(),
            iCurrCount = 1;

        // 用来存储当前商品规格的数组
        var specArr = [];

        // 购买‘+’按钮点击事件
        $('#listContainer').on('tap', '.add-icon', function() {   

            // 需要字段：缩略图、中文名、英文名、食用备注、价格、磅数、规格
            var $oCurr = $(this).closest('.item'),
                specStr = $oCurr.attr('spec'),
                specList = specStr.split('|');

            // 清空数组
            specArr = [];
            if(_.isArray(specList)) {
                for(var i = 0, len = specList.length; i < len; i++) {
                    var spec = specList[i].split(',');
                    var tmp = {
                        price: spec[0],
                        pound: spec[1],
                        note: spec[2]
                    };
                    specArr.push(tmp);
                }
            }

            var _data = {
                img: $oCurr.find('.img').find('img').attr('src'),
                name: {
                    cn: $oCurr.find('.text').find('.cn').html(),
                    en: $oCurr.find('.text').find('.en').html()
                },
                price: specArr[0].price,
                pound: specArr[0].pound,
                note: specArr[0].note,
                spec: specArr
            };

            // 给弹框绑定数据
            var _html = template('tplAddToCart', _data);
            $oAddToCart.html(_html);

            tl.clear();
            tl.to($oAddToCart, 0.5, {
                y: '0%',
                onStart: function() {
                    Mask.show();
                    $('#mask').css({
                        'background-color': 'rgba(0, 0, 0, 0.75)'
                    });
                    $oAddToCart.show();
                    $oAddToCart.css({
                        'opacity': 1
                    });
                }
            });
        });

        // 规格切换
        $oAddToCart.on('tap', '.spec-list li', function(){
            $oAddToCart.find('.note').html(specArr[$(this).index()].note);
            $oAddToCart.find('.price').html(specArr[$(this).index()].price);
            $oAddToCart.find('.pound').html('/' + specArr[$(this).index()].pound + '磅');
            $(this).addClass('active').siblings().removeClass('active');
        });

        // 数量减少
        $oAddToCart.on('tap', '.btn-minus', function(){
            var $oCountDom = $oAddToCart.find('.count');

            iCurrCount = parseInt($oCountDom.val(), 10);
            iCurrCount --;

            if(iCurrCount <= 1) {
                iCurrCount = 1;
                $(this).addClass('disabled');
            }

            $oCountDom.val(iCurrCount);
        });

        // 数量增加
        $oAddToCart.on('tap', '.btn-add', function(){
            var $oCountDom = $oAddToCart.find('.count'),
                $oBtnMinus = $oAddToCart.find('.btn-minus');

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
        $oAddToCart.on('tap', '.join-cart', function(){

            // TODO 处理加入购物车逻辑

            // 收缩弹层
            tl.clear();
            tl.to($oAddToCart, 0.2, {
                y: '110%',
                onComplete: function() {
                    Mask.hide();
                    $oAddToCart.hide();
                    var dialog = $(document).dialog({
                        type: 'toast',
                        infoIcon: 'assets/plugins/dialog2/images/icon/success.png',
                        infoText: '已加入购物篮',
                        autoClose: '1500'
                    });
                }
            });            
        });

        // 关闭弹层
        $oAddToCart.on('tap', '.cart-close', function() {
            tl.clear();
            tl.to($oAddToCart, 0.5, {                
                'opacity': 0,
                onComplete: function() {
                    Mask.hide();
                    $oAddToCart.hide();
                    tl.to($oAddToCart, 0, {
                        y: '110%'
                    });
                }
            });
            tl.to('#mask', 0.5, {
                'background-color': 'rgba(0, 0, 0, 0)'
            }, 0);
        });
    }

    /**
     * 绑定下午茶/鲜花数据模板
     * @return {[type]} [description]
     */
    function fnBindFlower() {
        var $oSecFlower = $('#secFlower');

        var _data = {
            hasData: true,
            flowers: [{
                type: 'sweets',
                title: '甜品',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ],
                    soldout: true
                }]
            }, {
                type: 'drinks',
                title: '饮品',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'flowers',
                title: '鲜花',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'parts',
                title: '配件',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }]
        };
        var _html = template('tplFlower', _data);
        $oSecFlower.html(_html);
    }

    /**
     * 绑定创意/礼品数据模板
     * @return {[type]} [description]
     */
    function fnBindGift() {
        var $oSecGift = $('#secGift');

        var _data = {
            hasData: true,
            giftes:[{
                type: 'gaw',
                title: 'GAW经典',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ],
                    soldout: true
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'diy',
                title: '选拼系列',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'star',
                title: '星座系列',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }]
        };
        var _html = template('tplGift', _data);
        $oSecGift.html(_html);
    }

    /**
     * 场景模块数据绑定
     * @return {[type]} [description]
     */
    function fnBindScene() {
        var $oSecScene = $('#secScene');

        var _data = {
            hasData: false,
            list: [{
                link: 'detail.html',
                img: 'assets/imgs/list/scene_img_02.jpg',
                name: {
                    en: 'BIRTHDAY PARTY',
                    cn: '生日聚会'
                }
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/scene_img_01.jpg',
                name: {
                    en: 'WEDDING CEREMONY',
                    cn: '婚庆典礼'
                }
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/scene_img_02.jpg',
                name: {
                    en: 'BIRTHDAY',
                    cn: '祝寿'
                }
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/scene_img_03.jpg',
                name: {
                    en: 'HUNDRED DAYS',
                    cn: '百天'
                }
            }, {
                link: 'detail.html',
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
            .filter('div[taste="' + currLocate + '"]')
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

        $oSecTaste.on('tap', '.nav-item', function() {
            $(this).addClass('active').siblings().removeClass('active');

            var currTaste = $(this).attr('taste');

            tl.clear();
            tl.to($('html,body'), 0.5, {
                'scrollTop': tasteTops[currTaste] - tasteTops.disT + 5
            });
        });
    }
    function changeTaste(taste) {
        var $oTaste = $('#secTaste').find('.nav-item').filter('[taste="' + taste + '"]'),
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
        var $oSecTaste = $('#secTaste');

        var _data = {
            hasData: true,
            tastes:[{
                type: 'cheese',
                title: '芝士',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'chocolate',
                title: '巧克力',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ],
                    soldout: true
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'mousse',
                title: '慕斯',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'napoleon',
                title: '拿破仑',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'fruit',
                title: '水果',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'milk',
                title: '鲜奶',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'coffee',
                title: '咖啡',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }, {
                type: 'sugarfree',
                title: '无糖',
                list: [{
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }, {
                    link: 'detail.html',
                    img: 'assets/imgs/list/cake.jpg',
                    name: {
                        cn: '芒果拿破仑',
                        en: 'Fresh Mango Napoleon'
                    },
                    price: '189',
                    pound: '1.5',
                    spec: [{
                            price: '189',
                            pound: '1.5',
                            note: '4-5人食用'
                        }, {
                            price: '279',
                            pound: '2.5',
                            note: '7-8人食用'
                        }, {
                            price: '429',
                            pound: '3.5',
                            note: '11-12人食用'
                        }, {
                            price: '709',
                            pound: '5.5',
                            note: '15-20人食用'
                        }
                    ]
                }]
            }]
        };
        var _html = template('tplTaste', _data);
        $oSecTaste.html(_html);

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
            hasData: true, // 当前模块是否有数据，true：有数据 false：无数据
            list: [{
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                spec: [{
                        price: '189',
                        pound: '1.5',
                        note: '4-5人食用'
                    }, {
                        price: '279',
                        pound: '2.5',
                        note: '7-8人食用'
                    }, {
                        price: '429',
                        pound: '3.5',
                        note: '11-12人食用'
                    }, {
                        price: '709',
                        pound: '5.5',
                        note: '15-20人食用'
                    }
                ],
                soldout: true // 如果售罄，则需返回该字段
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '超级蜂巢',
                    en: 'Super Hive Cake'
                },
                price: '229',
                pound: '1.8',
                spec: [{
                        price: '229',
                        pound: '1.8',
                        note: '4-5人食用'
                    }
                ]
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                spec: [{
                        price: '189',
                        pound: '1.5',
                        note: '4-5人食用'
                    }, {
                        price: '279',
                        pound: '2.5',
                        note: '7-8人食用'
                    }, {
                        price: '429',
                        pound: '3.5',
                        note: '11-12人食用'
                    }, {
                        price: '709',
                        pound: '5.5',
                        note: '15-20人食用'
                    }
                ]
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                spec: [{
                        price: '189',
                        pound: '1.5',
                        note: '4-5人食用'
                    }, {
                        price: '279',
                        pound: '2.5',
                        note: '7-8人食用'
                    }, {
                        price: '429',
                        pound: '3.5',
                        note: '11-12人食用'
                    }, {
                        price: '709',
                        pound: '5.5',
                        note: '15-20人食用'
                    }
                ],
                soldout: true
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                spec: [{
                        price: '189',
                        pound: '1.5',
                        note: '4-5人食用'
                    }, {
                        price: '279',
                        pound: '2.5',
                        note: '7-8人食用'
                    }, {
                        price: '429',
                        pound: '3.5',
                        note: '11-12人食用'
                    }, {
                        price: '709',
                        pound: '5.5',
                        note: '15-20人食用'
                    }
                ]
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                spec: [{
                        price: '189',
                        pound: '1.5',
                        note: '4-5人食用'
                    }, {
                        price: '279',
                        pound: '2.5',
                        note: '7-8人食用'
                    }, {
                        price: '429',
                        pound: '3.5',
                        note: '11-12人食用'
                    }, {
                        price: '709',
                        pound: '5.5',
                        note: '15-20人食用'
                    }
                ]
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                spec: [{
                        price: '189',
                        pound: '1.5',
                        note: '4-5人食用'
                    }, {
                        price: '279',
                        pound: '2.5',
                        note: '7-8人食用'
                    }, {
                        price: '429',
                        pound: '3.5',
                        note: '11-12人食用'
                    }, {
                        price: '709',
                        pound: '5.5',
                        note: '15-20人食用'
                    }
                ]
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                spec: [{
                        price: '189',
                        pound: '1.5',
                        note: '4-5人食用'
                    }, {
                        price: '279',
                        pound: '2.5',
                        note: '7-8人食用'
                    }, {
                        price: '429',
                        pound: '3.5',
                        note: '11-12人食用'
                    }, {
                        price: '709',
                        pound: '5.5',
                        note: '15-20人食用'
                    }
                ],
                soldout: true // 如果售罄，则需返回该字段
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '超级蜂巢',
                    en: 'Super Hive Cake'
                },
                price: '229',
                pound: '1.8',
                spec: [{
                        price: '229',
                        pound: '1.8',
                        note: '4-5人食用'
                    }
                ]
            }, {
                link: 'detail.html',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5',
                spec: [{
                        price: '189',
                        pound: '1.5',
                        note: '4-5人食用'
                    }, {
                        price: '279',
                        pound: '2.5',
                        note: '7-8人食用'
                    }, {
                        price: '429',
                        pound: '3.5',
                        note: '11-12人食用'
                    }, {
                        price: '709',
                        pound: '5.5',
                        note: '15-20人食用'
                    }
                ]
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

        $oListHeader.on('tap', '.c-item', function() {
            var category = $(this).attr('category');

            $(this).addClass('active').siblings().removeClass('active');

            $oListContainer.find('.sec')
                .filter('.sec[category="' + category + '"]')
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
        $('#listHeader').find('.c-item').filter('[category="' + category + '"]').trigger('tap');
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
    //遮罩层页面input框禁止获取焦点
    $(".counter").on("focus",".count",function(){
    	this.blur();
    });

})(Zepto, window, document);
