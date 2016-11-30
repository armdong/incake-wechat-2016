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
			$oCardList = $oNewCoupon.find('#cardList'),
			$oBtnCakeCash = $oNewCoupon.find('.btn-cake-cash'),
			$oBtnCoupon = $oNewCoupon.find('.btn-coupon'),
			$oLine = $oNewCoupon.find('.header-line');
			$oBtnSubmit = $oNewCoupon.find('.btn-submit');
			$oCakeCash = $oNewCoupon.find('.cake-cash'),
			$oCoupon = $oNewCoupon.find('.coupon'),
			$oCardNum = $oCakeCash.find('.cardNum'),
			$oCardPwd = $oCakeCash.find('.cardPwd'),
			$aBtnDel = $oCakeCash.find('.btn-del'),
			$oTxtCouponNum = $oCoupon.find('.txtCouponNum'),
			$oBtnClear = $oCoupon.find('.btn-clear'),
			$oBtnUse = $oNewCoupon.find('.btn-use'),
			$oMastCouponInfo = $oPageCoupon.find('#couponInfo'),
			$oBtnClose = $oMastCouponInfo.find('.btn-close'),
			$oMastTip = $oPageCoupon.find('#maskTip'),
			$oBtnCancel = $oMastTip.find('.btn-cancel'),
			$oBtnContinue = $oMastTip.find('.btn-continue'),
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
			
			// 绑定数据
			var _data2 = {
				hasCard: true, // 卡券列表是否有数据
				cardList: [{
					cardNum: 11111,
					cardPrice: 189
				}, {
					cardNum: 22222,
					cardPrice: 189
				}, {
					cardNum: 33333,
					cardPrice: 189
				}, {
					cardNum: 44444,
					cardPrice: 189
				}, {	
					cardNum: 55555,
					cardPrice: 189
				}]
			};
			var _html = template('tplCardList', _data2);
	        $oCardList.html(_html);
			
        	tl.clear();
        	tl.to($oCouponWrapper, 0.5, {
        		x: '-50%',
        		onStart: handler4EmptyFormData
        	});
        });
		
		// 删除已添加卡券
		$oCakeCash.on('tap', '.btn-del', function(){
			$(this).closest('li').remove();
		});
		
        // 添加优惠券
        $oBtnCoupon.on('tap', function() {
			//清除表单数据
			handler4EmptyFormData();
			
			// 切换显示内容
			tl.clear();
        	tl.to($oLine, 0.2, {
        		x: '100%'
        	});
        	$oBtnCakeCash.removeClass('active');
        	$oBtnCoupon.addClass('active');
        	
        	$oCakeCash.hide();
        	$oCoupon.show();
        });
        
        // 检测优惠券输入
        $oTxtCouponNum.keyup(function(){
        	if($oTxtCouponNum.val()!=""){
	        	$oBtnClear.show();
        	}else{
        		$oBtnClear.hide();
        	}
        });
        
        // 清除已输入优惠券信息
         $oBtnClear.on('tap', function() {
			//清除表单数据
			$('.txtCouponNum').val('');
			
        });
        
        // 立即使用卡券
         $oBtnUse.on('tap', function() {
         	//判断是否已添加卡券
         	var state = true;
         	if(state){
         		Mask.show();
				$oMastTip.show();
         	}
        });
        
		// 继续添加优惠券操作--------------------相关功能代码待完善
		$oBtnContinue.on('tap', function() {
		
		});
		
		// 取消添加优惠券
        $oBtnCancel.on('tap', function() {
			Mask.hide();
			$oMastTip.hide();
		});
		
		// 添加蛋糕卡/现金券
		$oBtnCakeCash.on('tap', function() {
			// 切换显示内容
			tl.clear();
        	tl.to($oLine, 0.2, {
        		x: '0%'
        	});
        	$oBtnCakeCash.addClass('active');
        	$oBtnCoupon.removeClass('active');
        	
        	$oCakeCash.show();
        	$oCoupon.hide();
			
		});
		
		// 提交优惠券信息
        $oBtnSubmit.on('tap', function() {
        	// 信息优惠券信息验证--------------------相关功能代码待完善
        	var regInfo = true;
        	
        	if(regInfo){
        		// 添加优惠券至列表
				var html = '<li class="clearfix"><span class="cardNum">'+$('.cardNum').val()+'</span><span>￥'+$('.cardPwd').val()+'</span><i class="btn-del"></i></li>';
				$oCardList.append(html);
				//清除表单数据
				handler4EmptyFormData();
        	}else{
        		fnRegDialog($oCardNum, '请输入正确的卡号或密码！');
        	}
        });
        
        // 清空form
        function handler4EmptyFormData() {
        	$('.cardNum').val('');
        	$('.cardPwd').val('');
        	$('.txtCouponNum').val('');
        }

	}
	
 
	/**
	 * 输入框错误相关提示
	 * @param  {[type]} msg [提示文字]
	 * @return {[type]}     [description]
	 */
	function fnRegDialog($oDom, msg) {
		var dialog = $(document).dialog({
	        type: 'toast',
	        infoIcon: 'assets/plugins/dialog2/images/icon/fail.png',
	        infoText: msg,
	        autoClose: '1500',
	        onClosed: function() {
	        	$oDom.val('');
	        	$oDom.trigger('focus');
	        }
	    });
	}

})(Zepto, window, document);