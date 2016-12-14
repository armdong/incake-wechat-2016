/**
 * Desc: my-favor javascript file
 * Author: armdong
 * Date: 2016/12/14
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

    $(function() {

        // 解决Zepto点透bug
        FastClick.attach(document.body);

        // 绑定我的喜欢列表
        fnBindFavor();

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
            tl = new TimelineLite(),
            iCurrCount = 1;

        // 用来存储当前商品规格的数组
        var specArr = [];

        // 购买‘+’按钮点击事件
        $('#favorList').on('tap', '.add-icon', function() {   

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
     * 绑定我的喜欢
     * @return {[type]} [description]
     */
    function fnBindFavor() {
        var $oContainer = $('#favorList');

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
            }]
        };
        var _html = template('tplFavorList', _data);
        $oContainer.html(_html);
    }

})(Zepto, window, document);
