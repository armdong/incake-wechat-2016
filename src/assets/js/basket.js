;(function($, window, document) {

	$(function() {

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		// 购物篮公告模块
        fnInitNotice();
		
		// 绑定购物篮商品列表
		fnBindBasketList();

		// 绑定配件列表
		fnBindPartsList();
	});

	/**
	 * 绑定配件列表
	 * @return {[type]} [description]
	 */
	function fnBindPartsList() {
		var $oPartsList = $('#partsList');
		var _data = {
			list: [{
				img: 'assets/imgs/basket/parts_img_candle.jpg',
				name: '字母蜡烛',
				price: 189
			}, {
				img: 'assets/imgs/basket/parts_img_plate.jpg',
				name: '盘叉(5份)',
				price: 189
			}, {
				img: 'assets/imgs/basket/parts_img_candle.jpg',
				name: '字母蜡烛',
				price: 189
			}, {
				img: 'assets/imgs/basket/parts_img_plate.jpg',
				name: '盘叉(5份)',
				price: 189
			}]
		};
		var _html = template('tplPartsList', _data);
        $oPartsList.html(_html);
	}

	/**
	 * 绑定购物篮商品列表
	 * @return {[type]} [description]
	 */
	function fnBindBasketList() {
		var $oBasketList = $('#basketList');
		var _data = {
			list:[{
				combination: false,		// 是否是组合商品
				unshelve: false,		// 商品是否已下架
				soldout: false,			// 商品是否已售罄
				img: 'assets/imgs/basket/cake_img.png',
				name: '芒果拿破仑',
				desc: '芒果拿破仑1.5磅+芒果拿破仑+芒果拿破仑',
				price: 169,
				originalPrice: 189,
				hasTag: true,			// 是否有标签
				tags:['附送5套餐具', '加30元可升级2.5磅', '不可单独购买', '仅支持在线支付']
			}, {
				combination: false,		// 是否是组合商品
				unshelve: false,		// 商品是否已下架
				soldout: false,			// 商品是否已售罄
				img: 'assets/imgs/basket/cake_img.png',
				name: '芒果拿破仑',
				desc: '芒果拿破仑1.5磅+芒果拿破仑+芒果拿破仑',
				price: 169,
				originalPrice: 189,
				hasTag: false,			// 是否有标签
				tags:[]
			}, {
				combination: false,		// 是否是组合商品
				unshelve: true,		// 商品是否已下架
				soldout: false,			// 商品是否已售罄
				img: 'assets/imgs/basket/cake_img.png',
				name: '芒果拿破仑',
				desc: '芒果拿破仑1.5磅+芒果拿破仑+芒果拿破仑',
				price: 169,
				originalPrice: 189,
				hasTag: true,			// 是否有标签
				tags:['附送5套餐具']
			}, {
				combination: true,		// 是否是组合商品
				unshelve: false,		// 商品是否已下架
				soldout: false,			// 商品是否已售罄
				list: [{
					img: 'assets/imgs/basket/cake_img.png',
					name: '芒果拿破仑',
					desc: '芒果拿破仑1.5磅+芒果拿破仑+芒果拿破仑',
					price: 169,
					num: 1,
					hasTag: false,		// 是否有标签
					tags:[]
				}, {
					img: 'assets/imgs/basket/cake_img.png',
					name: '芒果拿破仑',
					desc: '芒果拿破仑1.5磅+芒果拿破仑+芒果拿破仑',
					price: 169,
					num: 1,
					hasTag: true,		// 是否有标签
					tags:['首单5折']
				}],
				price: 169,
				originalPrice: 189
			}, {
				combination: false,		// 是否是组合商品
				unshelve: false,		// 商品是否已下架
				soldout: false,			// 商品是否已售罄
				img: 'assets/imgs/basket/cake_img.png',
				name: '芒果拿破仑',
				desc: '芒果拿破仑1.5磅+芒果拿破仑+芒果拿破仑',
				price: 169,
				originalPrice: 189,
				hasTag: true,			// 是否有标签
				tags:['附送5套餐具', '下单即送券']
			}, {
				combination: false,		// 是否是组合商品
				unshelve: false,		// 商品是否已下架
				soldout: true,			// 商品是否已售罄
				img: 'assets/imgs/basket/cake_img.png',
				name: '芒果拿破仑',
				desc: '芒果拿破仑1.5磅+芒果拿破仑+芒果拿破仑',
				price: 169,
				originalPrice: 189,
				hasTag: true,			// 是否有标签
				tags:['附送5套餐具']
			}]
		};
		var _html = template('tplBasketList', _data);
        $oBasketList.html(_html);
	}

	/**
     * [fnInitNotice 购物篮公告模块]
     * @return {[type]} [description]
     */
    function fnInitNotice() {
        var $oNotice = $('#basketNotice'),
            $oNoticeMsg = $oNotice.find('.notice-msg'),
            $oNoticeClose = $oNotice.find('.notice-close'),
            tl = new TimelineLite();

        // 关闭公告
        $oNoticeClose.on('tap', function() {
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
        var marqueeText = '订单满199元，可获得25元优惠券一张';
        $oNoticeMsg.text(marqueeText);

    	$oNoticeMsg.liMarquee();
    }

})(Zepto, window, document);