;(function() {

	$(function() {

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		// 初始化
		fnInit();		
	});

	/**
	 * 初始化代码
	 * @return {[type]} [description]
	 */
	function fnInit() {
		var $oGroup = $('#sectionGroup'),
			$oNoGift = $oGroup.find('.no-gift'),
			$oGreetingCard = $oGroup.find('.greeting-card'),
			$oBirthCard = $oGroup.find('.birth-card'),
			$oCandle = $oGroup.find('.candle'),
			$oBtnSave = $('#footerBar').children('.btn-save');

		// 不需要赠品
		$oNoGift.on('tap', '.radio', function() {
			$(this).addClass('selected');
			$oGreetingCard.children('.radio').removeClass('selected');
			$oBirthCard.children('.checkbox').removeClass('selected');
			$oCandle.children('.checkbox').removeClass('selected');
		});

		// 贺卡
		$oGreetingCard.on('tap', '.radio', function() {
			$(this).addClass('selected');
			$oNoGift.children('.radio').removeClass('selected');
		});

		// 生日牌
		$oBirthCard.on('tap', '.checkbox', function() {
			$(this).toggleClass('selected');
			$oNoGift.children('.radio').removeClass('selected');
		});

		// 蜡烛
		$oCandle.on('tap', '.checkbox', function() {
			$(this).toggleClass('selected');
			$oNoGift.children('.radio').removeClass('selected');
		});

		// 保存
		$oBtnSave.on('tap', function() {
			var card4Order = $oGreetingCard.find('.txt-card').closest('.radio').hasClass('selected');
			if(card4Order) {
				var txtCard = $oGreetingCard.find('.txt-card').val();

				// 贺卡非空验证
				if(txtCard === '') {
					var dialog = $(document).dialog({
						type: 'toast',
						infoIcon: 'assets/plugins/dialog2/images/icon/fail.png',
						infoText: '请填写贺卡内容！',
						autoClose: '1500'
					});
		            return false;
				}
			}

			// TODO 执行订单赠品关联			
			window.location.href = 'order-submit.html';
		});
	}

})(Zepto, window, document);