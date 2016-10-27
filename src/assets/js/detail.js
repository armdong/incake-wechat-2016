(function($, window, document){

	$(function(){

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		var swiperDetail = null;
		fnInitDetailSlide();

		// 设备横竖屏发生改变监听事件
        $(window).on('resize', function() {
            fnInitDetailSlide();
        });

        // 详情页Banner
        function fnInitDetailSlide() {
            var $oContainer = $('#detailSlide'),
                containerWidth = $oContainer.width();

            // 渲染swiper模板
            var _data = {
                list: [{
                    img: 'assets/imgs/detail/01.jpg'
                }, {
                    img: 'assets/imgs/detail/01.jpg'
                }, {
                    img: 'assets/imgs/detail/01.jpg'
                }]
            };
            var _html = template('tplDetailSlide', _data);
            $oContainer.find('.swiper-wrapper').html(_html);

            $oContainer.find('img').css({
                width: containerWidth
            });
            if (swiperDetail !== null) {
                swiperDetail.destroy(true, true);
            }
            swiperDetail = null;
            swiperDetail = new Swiper('#detailSlide', {
                pagination: '.swiper-pagination',
                width: containerWidth,
                loop: true,
                centeredSlides: true,
                autoplay: 5000,
                speed: 500,
                autoplayDisableOnInteraction: false,
                preloadImages: false,
                lazyLoading: true,
                observer: true,
                observeParents: true
            });
        }

        // 规格切换
        fnInitSpec();

        // 促销活动
        fnInitPromotion();

        // 组合套餐
        fnSwitchCombination();

        // 底栏
        fnInitFooterBar();
	});

	/**
	 * 底栏初始化代码
	 * @return {[type]} [description]
	 */
	function fnInitFooterBar() {
		var $oFooterBar = $('#footerBar'),
			tl = new TimelineLite();

		// 喜欢/收藏
		$oFooterBar.on('tap', '.btn-favor', function(){

			var $oThis = $(this),
				hasFollowed = $oThis.hasClass('followed'),
				dialog = null;

			if(!hasFollowed) { // 设置喜欢
				dialog = $(document).dialog({
			        type: 'toast',
			        infoIcon: 'assets/plugins/dialog2/images/icon/success.png',
			        infoText: '成功加入收藏夹',
			        autoClose: '1500',
			        onShow: function() {
						$oThis.addClass('followed');
			        }
			    });
			} else { // 取消喜欢
				dialog = $(document).dialog({
			        type: 'toast',
			        infoIcon: 'assets/plugins/dialog2/images/icon/fail.png',
			        infoText: '已从收藏夹移除',
			        autoClose: '1500',
			        onShow: function() {
						$oThis.removeClass('followed');
			        }
			    });
			}
		});

		// 加入购物篮
		$oFooterBar.on('tap', '.btn-join-basket', function(){

			var $oBasketNum = $oFooterBar.find('.num');

			tl.clear();

			var scrollT = $(window).scrollTop(),
            	startT = $(this).offset().top - scrollT - $oBasketNum.height() / 2,
                startL = $(this).offset().left + $(this).width() / 2,
                endT = $oBasketNum.offset().top - scrollT + $oBasketNum.height() / 2,
                endL = $oBasketNum.offset().left - $oBasketNum.width() / 2;

            // 加入购物车动画
            $('<div class="flyEle"></div>').fly({
                start: {
                    left: startL,
                    top: startT
                },
                end: {
                    left: endL,
                    top: endT
                },
                onEnd: function() {

                	// 购物车数字加1
        			var number = $oBasketNum.text();
        			$oBasketNum.html(parseInt(number, 10) + 1);

                    this.destory();

                    tl.to($oBasketNum, 0.1, {
                        scale: 2,
                        ease: Ease.easeIn,
                        onComplete: function() {
                            tl.to($oBasketNum, 0.1, {
                                scale: 1,
                                ease: Ease.easeIn
                            });
                        }
                    });
                }
            });
		});
	}

	/**
	 * 组合套餐选择
	 * @return {[type]} [description]
	 */
	function fnSwitchCombination() {
		var $oCombination = $('#combinationInfo');

		// 选择套餐
		$oCombination.find('.item-select').on('tap', '.btn-radio', function(){
			var $oItem = $(this).closest('.item-select');
			var isSelected = $oItem.hasClass('active');
			if(isSelected) {
				$oItem.removeClass('active');
			} else {
				$oItem.addClass('active');
			}
			$oItem.siblings('.item-select').removeClass('active');
		});
	}

	/**
	 * 促销活动初始化
	 * @return {[type]} [description]
	 */
	function fnInitPromotion() {
		var $oPromotion = $('#promotionInfo'),
			$oMask = $('#maskPromotion');

		// 查看详情
		$oPromotion.on('tap', '.view-detial', function(){

			// TODO 绑定弹框内容
			
			$oMask.show();
			$('body').on('touchmove.mask', function(e) {
	            e.preventDefault();
	        });
		});

		// 关闭弹层
		$oMask.on('tap', '.btn-close', function(){
			$oMask.hide();
			$('body').off('.mask');
		});
	}

	/**
	 * 规格切换
	 * @return {[type]} [description]
	 */
	function fnInitSpec() {
		var $oSpec = $('#specInfo'),
			$oPound = $oSpec.find('.pounds'),				
			tl = new TimelineLite();

		// 切换规格
		$oPound.on('tap', 'li', function(){
			$(this).addClass('active').siblings().removeClass('active');
		});

		// 查看更多规格
		$oSpec.on('tap', '.more-pound', function(){
			var isExpand = $oPound.hasClass('expand'),
				iPoundH = $oPound.find('li').height(),
				iPoundM = parseInt($oPound.find('li').css('margin-bottom'), 10);

			tl.clear();

			if(isExpand) { // 展开状态
				$oPound.removeClass('expand').css({
					'height': (iPoundH + iPoundM - 1) + 'px'
				});
				tl.to($oSpec.find('.more-pound'), 0.2, {
					rotation: 0
				});
			} else {	// 非展开状态
				$oPound.addClass('expand').css({
					'height': 'auto'
				});
				tl.to($oSpec.find('.more-pound'), 0.2, {
					rotation: 180
				});
			}			
		});
	}

})(Zepto, window, document);