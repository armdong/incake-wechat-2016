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
			$oFail = $oContainer.find('.fail-container'),
			$oFailMsg = $oFail.find('.msg'),
			$oFailPayment = $oFail.find('.payment'),
			$oMinute = $oFailMsg.find('.countdown').find('.minutes'),
            $oSecond = $oFailMsg.find('.countdown').find('.seconds'),
			beginTime, endTime, curShowTimeSeconds,
			timer = null,
			timeout = 30 * 60 * 1000; // 超时时间

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

			// TODO:下单时间需要到数据库查询
            //beginTime = new Date(2016, 10, 10, 11, 0, 0).getTime();
            beginTime = new Date().getTime();
            endTime = beginTime + timeout; // 下单30分钟内需要完成支付
            curShowTimeSeconds = 0;

            curShowTimeSeconds = getCurrentShowTimeSeconds();

            timer = setInterval(function() {
                render();
                update();
            }, 50);

			$oFail.show();
		}

        function update() {
            var nextShowTimeSeconds = getCurrentShowTimeSeconds();
            var nextMinutes = parseInt(nextShowTimeSeconds / 60);
            var nextSeconds = nextShowTimeSeconds % 60;
            var curMinutes = parseInt(curShowTimeSeconds / 60);
            var curSeconds = curShowTimeSeconds % 60;
            if (nextSeconds != curSeconds) {
                curShowTimeSeconds = nextShowTimeSeconds;
            }
        }

        function render() {
            var minutes = parseInt(curShowTimeSeconds / 60);
            var seconds = curShowTimeSeconds % 60;
            if (minutes === 0 && seconds === 0) {
                // 订单支付超时
                clearInterval(timer);
                // 超时回调函数
                fnTimeoutCallback();
            }
            $oMinute.html(minutes < 10 ? '0' + minutes : minutes);
            $oSecond.html(seconds < 10 ? '0' + seconds : seconds);
        }

        function getCurrentShowTimeSeconds() {
            var curTime = new Date().getTime();
            var ret = endTime - curTime;
            ret = Math.round(ret / 1000);
            return ret >= 0 ? ret : 0;
        }

        // 支付超时回调函数
        function fnTimeoutCallback() {
        	$oFailMsg.find('.order-detail').html('交易已关闭，请重新下单！');
        	$oFailPayment.hide();
        }

        // 支付方式切换
        $oFailPayment.find('.payment-container').on('tap', 'li', function() {
        	$(this).addClass('active').siblings().removeClass('active');
        });
	}

})(Zepto, window, document);