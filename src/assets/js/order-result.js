;(function($, window, document) {

	$(function() {

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		// 初始化订单支付结果
		fnInitResult();
		
	});

	/**
	 * 初始化订单支付结果
	 * @return {[type]} [description]
	 */
	function fnInitResult() {
		var $oContainer = $('#pageContainer'),
			$oSuccess = $oContainer.find('.success-container'),
			$oSucMsg = $oSuccess.find('.msg'),
			paytype = 'online',
			$oFail = $oContainer.find('.fail-container');

		// TODO 判断订单是否成功支付 true:支付成功/提交成功  false:支付失败
		var result = false;

		if(result) { // 支付成功

			// TODO 获取订单支付方式：
			// online 在线支付  
			// offline: 货到付款/POS支付
			paytype = 'online';

			if(paytype === 'online') {
				// 在线支付
				$oSucMsg.find('.txt').children('span').html('支付成功！');
			} else {
				// 货到付款/货到POS支付
				$oSucMsg.find('.txt').children('span').html('订单已成功提交！');
			}

			$oSuccess.show();
		} else { // 支付失败



			$oFail.show();
		}
	}

})(Zepto, window, document);