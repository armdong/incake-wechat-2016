;(function($, window, document) {

	$(function() {

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		// 初始化卡券列表
		fnInitCoupon();

	});

	/**
	 * 绑定卡券
	 * @return {[type]} [description]
	 */
	function fnInitCoupon() {
		var $oCouponList = $('#couponList'),
			$oCouponWrapper = $oCouponList.parent('.coupon-wrapper'),
			$oPageCoupon = $oCouponWrapper.parent('.page-container'),
			$oNewCoupon = $('#newCoupon'),
			$oMastCouponInfo = $oPageCoupon.find('#couponInfo'),
			$oBtnClose = $oMastCouponInfo.find('.btn-close'),
			tl = new TimelineLite();
		
		// 绑定数据
		var _data = {
			hasCoupon: true, // 卡券列表是否有数据
			isMine: true, //是否从“我的卡券”进入
			list: [{
				discount: {
					sum: '9.8',
					sumText: '折',
					category: '折扣券'
				},
				info: {
					text: '可对常规款(1个)蛋糕打折，主题蛋糕以及活动套餐除外',
					expiryDate: '有效期至2017年12月12日'
				}
			}, {
				hasTips: true, //是否有提示信息
				discount: {
					sum: '50',
					sumText: '元',
					category: '现金券'
				},
				info: {
					text: '可对常规款(1个)蛋糕打折，主题蛋糕以及活动套餐除外',
					expiryDate: '有效期至2017年12月12日',
					tips: '非真正内容非真'
				}
			}, {
				isUsed: true, // 是否已使用
				discount: {
					sum: '9.8',
					sumText: '折',
					category: '折扣券'
				},
				info: {
					text: '可对常规款(1个)蛋糕打折，主题蛋糕以及活动套餐除外',
					expiryDate: '有效期至2017年12月12日'
				}
			}, {	
				isOverdue: true, // 是否已过期
				discount: {
					sum: '50',
					sumText: '元',
					category: '现金券'
				},
				info: {
					text: '可对常规款(1个)蛋糕打折，主题蛋糕以及活动套餐除外',
					expiryDate: '有效期至2017年12月12日'
				}
			}]
		};
		var _html = template('tplCouponList', _data);
        $oCouponList.html(_html);

		// 是否使用卡券
        $oCouponList.on('tap', '.btn-radio', function() {  

        	$(this).toggleClass('selected');

        });
        
        // 查看卡券详情
        $oCouponList.on('tap', '.btn-details', function() {  

        	Mask.show();
			$oMastCouponInfo.show();

        });
        
        // 关闭卡券详情
		$oBtnClose.on('tap', function() {
			Mask.hide();
			$oMastCouponInfo.hide();
		});
		
        // 添加卡券&绑定卡券
        $oCouponList.on('tap', '.btn-add', function() {  

        	tl.clear();
        	tl.to($oCouponWrapper, 0.5, {
        		x: '-50%',
        		onStart: handler4EmptyFormData
        	});
        });

        // 编辑收货地址 事件处理函数
//      $oCouponList.on('tap', '.btn-edit', function() {
//
//      	// 显示删除按钮
//      	$oNewCoupon.find('.btn-del').show().css('display', 'block');
//          $oTitle.text('编辑收货地址');
//
//      	var $oText = $(this).prev('.text');
//      	var opt = {
//      		name: $oText.find('.name').text(),
//      		mobile: $oText.find('.mobile').text(),
//      		city: $oText.find('.city').text(),
//      		area: $oText.find('.area').text(),
//      		street: $oText.find('.street').text(),
//      		detail: $oText.find('.detail').text()
//      	};
//
//      	// 绑定数据
//      	handler4BindFormData(opt);
//
//      	tl.clear();
//      	tl.to($oCouponWrapper, 0.5, {
//      		x: '-50%'
//      	});
//      });

        // 返回列表
//      $oNewCoupon.children('.header').on('tap', '.btn-back', function() {
//      	tl.clear();
//      	tl.to($oCouponWrapper, 0.5, {
//      		x: '0%'
//      	});
//      });


        // 清空form
        function handler4EmptyFormData() {
        	
        }

        // 绑定form
        function handler4BindFormData(data) {
        	
        }
	}
	
	

})(Zepto, window, document);