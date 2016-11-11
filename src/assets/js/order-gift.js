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
			$oBtnSave = $('#footerBar').children('.btn-save'),
			$oMaskGreeting = $('#maskGreeting'),
			$oMaskOk = $oMaskGreeting.find('.btn-ok'),
			$oCurrWords = $oMaskGreeting.find('.words-calculator').find('i'),
			iMaxLen = 50; // 贺卡字数限制最多为50个字符

		// 不需要赠品
		$oNoGift.on('tap', '.radio', function() {
			$(this).addClass('selected');
			$oGreetingCard.children('.radio').removeClass('selected');
			$oBirthCard.children('.checkbox').removeClass('selected');
			$oCandle.children('.checkbox').removeClass('selected');
		});

		// 贺卡
		$oGreetingCard.on('tap', '.radio', function() {
			$(this).addClass('selected').siblings().removeClass('selected');
			$oNoGift.children('.radio').removeClass('selected');
		});

		// 编辑贺卡内容
		$oGreetingCard.on('tap', '.content', function() {

			// 弹出编辑层
			Mask.show();
			$oMaskGreeting.show();			
		});

		// 字数限制
		$oMaskGreeting.find('.txt-greeting').bind('input propertychange', function(e) {
            var text = $(this).val(),
                iLen = text.length;

            if (iLen >= iMaxLen) {
                $oMaskGreeting.find('.txt-greeting').val(text.substring(0, iMaxLen));
                iLen = iMaxLen;
                $oCurrWords.addClass('red');
            } else {
            	$oCurrWords.removeClass('red');
            }
            $oCurrWords.text(iLen);
        });

		// 关闭编辑贺卡内容
		$oMaskGreeting.on('tap', '.btn-ok', function() {

			// TODO 处理添加备注逻辑

			Mask.hide();
			$oMaskGreeting.hide();
		});

		// 生日牌
		$oBirthCard.on('tap', '.info', function() {
			$(this).closest('.checkbox').toggleClass('selected');
			$oNoGift.children('.radio').removeClass('selected');
		});

		// 蜡烛
		$oCandle.on('tap', '.checkbox', function() {
			$(this).toggleClass('selected');
			$oNoGift.children('.radio').removeClass('selected');
		});

		// 保存
		$oBtnSave.on('tap', function() {
			var $oGreeting = $oGreetingCard.find('.selected');
			if($oGreeting.length > 0) {
				var txtCard = $oGreeting.find('.content').text();

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