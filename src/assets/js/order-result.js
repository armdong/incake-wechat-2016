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
			$oFail = $oContainer.find('.fail-container');

		// TODO 判断订单是否成功支付
		var result = true;

		if(result) { // 成功

			// 订单支付方式：online 在线支付  offline: 货到付款/POS支付
			var paytype = 'online',
				$oMsg = $oSuccess.find('.msg');

			if(paytype === 'online') {
				$oMsg.find('.txt').children('span').html('订单已成功提交！');
			} else {
				$oMsg.find('.txt').children('span').html('支付成功！');
			}

			$oSuccess.show();
		} else {
			$oFail.show();
		}
	}

})(Zepto, window, document);