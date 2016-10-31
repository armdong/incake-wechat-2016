/**
 * Desc: list javascript file
 * Author: armdong
 * Date: 2016/10/31
 */

/**
 * 对规格进行格式化
 * @param  spec    要格式化的规格
 * @param  format  进行格式化的规格字符串
 * @return [description]
 */
template.helper('specFormat', function(spec) {
    var str = '';
    if(!!spec && _.isArray(spec)){
        for(var i = 0, len = spec.length; i < len; i++) {
            str += spec[i];
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

		// 购物篮公告模块
        fnInitNotice();
		
		// 绑定购物篮商品列表
		fnBindBasketList();

		// 绑定配件列表
		fnBindPartsList();

		// 购物篮商品列表初始化
		fnInitBasketList();

		// 结算状态栏初始化
		fnInitBasketBar();

		// 购买配件
		fnAddToCart();
	});

	/**
     * [fnAddToCart 购买配件]
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
        $('#partsList').on('tap', '.add-icon', function() {   

            // 需要字段：缩略图、中文名、英文名、食用备注、价格、磅数、规格
            var $oCurr = $(this).closest('.item'),
                specStr = $oCurr.attr('spec'),
                specList = specStr.split('|');

            // 清空数组
            specArr = [];
            if(_.isArray(specList)) {
                for(var i = 0, len = specList.length; i < len; i++) {
                    var spec = specList[i];
                    specArr.push(spec);
                }
            }

            var _data = {
                img: $oCurr.find('.img').find('img').attr('src'),
                name: $oCurr.find('.text').find('.name').html(),
                price: $oCurr.find('.text').find('.price').find('span').html(),
                spec: specStr === '' ? '' : specArr
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
	 * 结算状态栏初始化
	 * @return {[type]} [description]
	 */
	function fnInitBasketBar() {
		var $oBasketBar = $('#basketBar'),
			$oProductList = $('#basketList');

		// 全选切换
		$oBasketBar.children('.selector')
			.on('tap', '.select', function() {
				var isSelected = $(this).hasClass('selected'),
					$oUl = $oProductList.children('.list'),
					$aSelect = $oUl.find('.select').not('.unshelve').not('.soldout');

				if(!isSelected) {
					$(this).addClass('selected');
					$oProductList.children('.header').children('.select').addClass('selected');
					$aSelect.addClass('selected');
				} else {
					$(this).removeClass('selected');
					$oProductList.children('.header').children('.select').removeClass('selected');
					$aSelect.removeClass('selected');
				}
			});

		// 结算
		$oBasketBar.on('tap', '.btn-pay', function() {
			var $aUnshelve = $oProductList.find('.unshelve'),
				$aSoldout = $oProductList.find('.soldout');

			// 商品列表有已下架或已售罄商品
			if(($aUnshelve && $aUnshelve.length > 0) || ($aSoldout && $aSoldout.length > 0)) {
				var dialog = $(document).dialog({
					type: 'toast',
					infoIcon: 'assets/plugins/dialog2/images/icon/fail.png',
					infoText: '请先清空失效商品！',
					autoClose: '1500'
				});
			}

			// TODO 处理结算逻辑			
		});
	}

	/**
	 * 购物篮商品列表初始化
	 * @return {[type]} [description]
	 */
	function fnInitBasketList() {
		var $oProductList = $('#basketList'),
			$oBasketBar = $('#basketBar'),
			$oMaskDel = $('#maskDel'),
			$oDelItem;

		/**
		 * 普通商品单择切换
		 * 过滤已下架、已售罄商品
		 */
		$oProductList.children('.list')
			.children('.item')
			.not('.unshelve')
			.not('.soldout')
			.on('tap', '.select', function() {

				$(this).toggleClass('selected');

				var $oCombinationSelectAll,
					$oCombinationUl,
					$aCombinationLi,
					$aCombinationSelected,
					$oSelectAll = $oProductList.children('.header').children('.select-all'),
					$oUl = $oProductList.children('.list'),
					$aLi = $oUl.find('.item').not('.unshelve').not('.soldout').not('.combination'),
					$aSelected;

				// 是否是组合商品
				var $oCombination = $(this).closest('.combination');
				if($oCombination && $oCombination.length > 0) {
					$oCombinationSelectAll = $oCombination.children('.header').find('.select-all');
					$oCombinationUl = $oCombination.children('.list');
					$aCombinationLi = $oCombinationUl.children('.item');
					$aCombinationSelected = $oCombinationUl.find('.selected');

					// 如果选中的个数等于所有选项的个数，则设置全部选中
					if($aCombinationLi.length === $aCombinationSelected.length) {
						$oCombinationSelectAll.addClass('selected');
					} else {
						$oCombinationSelectAll.removeClass('selected');
					}
				}

				// 所有选中的商品
				$aSelected = $oUl.find('.item').not('.unshelve').not('.soldout').not('.combination').find('.selected');

				// 如果选中的个数等于所有选项的个数，则设置全部选中
				if($aLi.length === $aSelected.length) {
					$oSelectAll.addClass('selected');
					$oBasketBar.children('.selector').children('.select').addClass('selected');
				} else {
					$oSelectAll.removeClass('selected');
					$oBasketBar.children('.selector').children('.select').removeClass('selected');
				}
			});

		// 组合商品全选切换
		$oProductList.find('.combination')
			.children('.header')
			.on('tap', '.select-all', function() {
				var isSelected = $(this).hasClass('selected'),				
					$oCombination = $(this).closest('.combination'),
					$oUl = $oCombination.children('.list'),
					$aSelect = $oUl.find('.select');

				if(!isSelected) {
					$(this).addClass('selected');
					$aSelect.addClass('selected');
				} else {
					$(this).removeClass('selected');
					$aSelect.removeClass('selected');
				}
			});

		// 所有商品全选切换
		$oProductList.children('.header')
			.on('tap', '.select', function() {

				var isSelected = $(this).hasClass('selected'),
					$oUl = $(this).closest('.header').next('.list'),
					$aSelect = $oUl.find('.select').not('.unshelve').not('.soldout');

				if(!isSelected) {
					$(this).addClass('selected');
					$oBasketBar.children('.selector').children('.select').addClass('selected');
					$aSelect.addClass('selected');
				} else {
					$(this).removeClass('selected');
					$oBasketBar.children('.selector').children('.select').removeClass('selected');
					$aSelect.removeClass('selected');
				}					
			});
		
		// 增加商品数量
		$oProductList.on('tap', '.btn-add', function() {
			var $oCount = $(this).siblings('.count'),
				iCount = parseInt($oCount.val(), 10);

			iCount++;
			if(iCount > 99) {
				iCount = 99;
			}
			$oCount.val(iCount);

			// 组合商品
			var $oCombination = $(this).closest('.combination');
			if($oCombination && $oCombination.length > 0) {
				var $aNum = $oCombination.find('.item').find('.num');
				$aNum.html('x' + iCount);
			}
		});

		// 减少商品数量
		$oProductList.on('tap', '.btn-minus', function() {
			var $oCount = $(this).siblings('.count'),
				iCount = parseInt($oCount.val(), 10);

			iCount--;
			if(iCount < 1) {
				// 删除商品
				var $oItem = $(this).closest('.item');
				$oDelItem = $oItem;
				$oMaskDel.show();
			} else {
				$oCount.val(iCount);

				// 组合商品
				var $oCombination = $(this).closest('.combination');
				if($oCombination && $oCombination.length > 0) {
					var $aNum = $oCombination.find('.item').find('.num');
					$aNum.html('x' + iCount);
				}
			}		
		});

		// 确认删除商品
		$oMaskDel.on('tap', '.btn-del-ok', function() {
			if(!!$oDelItem) {
				$oDelItem.remove();
				$oMaskDel.hide();

				// TODO 处理删除逻辑
				// 删除成功提示
				var dialog = $(document).dialog({
					type: 'toast',
					infoIcon: 'assets/plugins/dialog2/images/icon/success.png',
					infoText: '删除成功！',
					autoClose: '1500'
				});
			}
		});

		// 取消删除商品
		$oMaskDel.on('tap', '.btn-del-cancel', function() {
			$oMaskDel.hide();
		});

		// 清除无效商品
		$oProductList.children('.footer')
			.on('tap', '.btn-clear', function() {
				// 移除dom节点
				$oProductList.children('.list')
					.children('.unshelve,.soldout')
					.remove();

				// TODO 处理清除无效商品逻辑
				// 清除成功提示
				var dialog = $(document).dialog({
					type: 'toast',
					infoIcon: 'assets/plugins/dialog2/images/icon/success.png',
					infoText: '无效商品清除成功！',
					autoClose: '1500'
				});
			});		
	}

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
				price: 2,
                spec: ['I', 'Love', 'U']
			}, {
				img: 'assets/imgs/basket/parts_img_plate.jpg',
				name: '盘叉(5份)',
				price: 10,
				spec: []
			}, {
				img: 'assets/imgs/basket/parts_img_candle.jpg',
				name: '数字蜡烛',
				price: 2,
                spec: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
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