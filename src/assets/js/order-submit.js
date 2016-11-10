;(function() {

	$(function() {

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		// 送达时间选择
		fnChangeRecieveTime();

		// 查看全部商品
		fnViewAllProduct();

		// 优惠商品
		fnViewPrivilegeProduct();

		// 订单备注
		fnOrderComment();

		// 支付方式
		fnInitPayment();
	});

	/**
	 * 支付方式选择
	 * @return {[type]} [description]
	 */
	function fnInitPayment() {
		var $oPaymentAction = $('#paymentAction'),
			$oBtnPayment = $('#btnPayment'),
			tl = new TimelineLite();

		// 切换支付方式
		$oBtnPayment.on('tap', function() {
			tl.clear();
			tl.to($oPaymentAction, 0.3, {
				y: '0%',
				ease: Linear.easeIn,
				onStart: function() {
					Mask.show();
				}
			});
		});

		// 支付方式切换
		$oPaymentAction.on('tap', 'li', function() {
			$(this).addClass('active').siblings().removeClass('active');
		});

		// 关闭支付方式
		$oPaymentAction.on('tap', '.btn-cancel', function() {
			tl.clear();
			tl.to($oPaymentAction, 0.3, {
				y: '100%',
				ease: Linear.easeOut,
				onComplete: function() {
					Mask.hide();
				}
			});
		});

		// 确定支付方式
		$oPaymentAction.on('tap', '.btn-ok', function() {

			var $oCurrPayment = $oPaymentAction.find('.list').children('.active'),
				txtPayment = $oCurrPayment.children('.name').text();

			$oBtnPayment.text(txtPayment);

			tl.clear();
			tl.to($oPaymentAction, 0.3, {
				y: '100%',
				ease: Linear.easeOut,
				onComplete: function() {
					Mask.hide();
				}
			});
		});
	}

	/**
	 * 订单备注
	 * @return {[type]} [description]
	 */
	function fnOrderComment() {
		var $oOrderComment = $('#orderComment'),
			$oBtnComment = $('#btnComment'),
			$oCurrWords = $oOrderComment.find('.words-calculator').find('i'),
			iMaxLen = 50;

		// 订单备注
		$oBtnComment.on('tap', function() {
			Mask.show();
			$oOrderComment.show();
		});

		// 字数限制
		$oOrderComment.find('.txt-comment').bind('input propertychange', function(e) {
            var text = $(this).val(),
                iLen = text.length;

            if (iLen >= iMaxLen) {
                $oOrderComment.find('.txt-comment').val(text.substring(0, iMaxLen));
                iLen = iMaxLen;
                $oCurrWords.addClass('red');
            } else {
            	$oCurrWords.removeClass('red');
            }
            $oCurrWords.text(iLen);
        });

		// 关闭订单备注
		$oOrderComment.on('tap', '.btn-ok', function() {

			// TODO 处理添加备注逻辑

			Mask.hide();
			$oOrderComment.hide();
		});
	}

	/**
	 * 优惠商品
	 * @return {[type]} [description]
	 */
	function fnViewPrivilegeProduct() {
		var $oPrivilegeList = $('#privilegeList'),
			$oBtnViewPrivilege = $('#btnViewPrivilege');

		// 优惠商品
		$oBtnViewPrivilege.on('tap', function() {
			Mask.show();
			$oPrivilegeList.show();
		});

		// 关闭优惠商品
		$oPrivilegeList.on('tap', '.btn-close', function() {
			Mask.hide();
			$oPrivilegeList.hide();
		});
	}

	/**
	 * 查看全部商品
	 * @return {[type]} [description]
	 */
	function fnViewAllProduct() {
		var $oAllList = $('#allList'),
			$oBtnViewAll = $('#btnViewAll');

		// 查看全部
		$oBtnViewAll.on('tap', function() {
			Mask.show();
			$oAllList.show();
		});

		// 关闭全部商品
		$oAllList.on('tap', '.btn-close', function() {
			Mask.hide();
			$oAllList.hide();
		});
	}

	/**
	 * 送达时间选择
	 * @return {[type]} [description]
	 */
	function fnChangeRecieveTime() {

		window.adaptive.desinWidth = 750;
        window.adaptive.init();

		var dayData = [
		    {'id': '1201', 'value': '12月01日(周四)'},
		    {'id': '1202', 'value': '12月02日(周五)'},
		    {'id': '1203', 'value': '12月03日(周六)'},
		    {'id': '1204', 'value': '12月04日(周日)'},
		    {'id': '1205', 'value': '12月05日(周一)'},
		    {'id': '1206', 'value': '12月06日(周二)'},
		    {'id': '1207', 'value': '12月07日(周三)'},
		    {'id': '1208', 'value': '12月08日(周四)'},
		    {'id': '1209', 'value': '12月09日(周五)'},
		    {'id': '1210', 'value': '12月10日(周六)'},
		    {'id': '1211', 'value': '12月11日(周日)'},
		    {'id': '1212', 'value': '12月12日(周一)'},
		    {'id': '1213', 'value': '12月13日(周二)'},
		    {'id': '1214', 'value': '12月14日(周三)'},
		    {'id': '1215', 'value': '12月15日(周四)'},
		    {'id': '1216', 'value': '12月16日(周五)'}
		];
		var timeData = [
		    {'id': '09001030', 'value': '09:00-10:30'},
		    {'id': '10001130', 'value': '10:00-11:30'},
		    {'id': '11001230', 'value': '11:00-12:30'},
		    {'id': '12001330', 'value': '12:00-13:30'},
		    {'id': '13001430', 'value': '13:00-14:30'},
		    {'id': '14001530', 'value': '14:00-15:30'},
		    {'id': '15001630', 'value': '15:00-16:30'},
		    {'id': '16001730', 'value': '16:00-17:30'},
		    {'id': '17001830', 'value': '17:00-18:30'}
		];

		var showTimeDom = document.querySelector('#showTime');
	    var dayIdDom = document.querySelector('#dayId');
	    var timeIdDom = document.querySelector('#timeId');
	    showTimeDom.addEventListener('click', function () {
	        var dayId = showTimeDom.dataset['day_id'];
	        var dayValue = showTimeDom.dataset['day_value'];
	        var timeId = showTimeDom.dataset['time_id'];
	        var timeValue = showTimeDom.dataset['time_value'];
	        var recieveTimeSelect = new IosSelect(2, 
	            [dayData, timeData],
	            {
	                title: '时间选择',
                    itemHeight: 0.933333,
                    headerHeight: 1.18,
	                oneLevelId: dayId,
	                twoLevelId: timeId,
	                callback: function (selectOneObj, selectTwoObj) {
	                    dayIdDom.value = selectOneObj.id;
	                    timeIdDom.value = selectTwoObj.id;
	                    showTimeDom.innerHTML = selectOneObj.value + ' ' + selectTwoObj.value;

	                    showTimeDom.dataset['day_id'] = selectOneObj.id;
	                    showTimeDom.dataset['day_value'] = selectOneObj.value;
	                    showTimeDom.dataset['time_id'] = selectTwoObj.id;
	                    showTimeDom.dataset['time_value'] = selectTwoObj.value;
	                }
	        });
	    });
	}

})(Zepto, window, document);