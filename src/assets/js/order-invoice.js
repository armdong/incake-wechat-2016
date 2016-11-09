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
			$oNoInvoice = $oGroup.find('.no-invoice'),
			$oInvoiceTitle = $oGroup.find('.invoice-title'),
			$oBusiness = $oGroup.find('.business'),
			$oBtnSave = $('#footerBar').children('.btn-save');

		// 不需要发票选项点击事件
		$oNoInvoice.on('tap', '.radio', function() {
			$(this).addClass('selected');
			$oInvoiceTitle.children('.radio').removeClass('selected');
			$oBusiness.children('.radio').removeClass('selected');
		});

		// 发票抬头选择
		$oInvoiceTitle.on('tap', '.radio', function() {
			$(this).addClass('selected').siblings().removeClass('selected');
			$oNoInvoice.children('.radio').removeClass('selected');

			// 业务范围是否选中
			var businessSelected = $oBusiness.children('.selected').length > 0 ? true : false;
			if(!businessSelected) {
				$oBusiness.children('.radio').eq(0).addClass('selected');
			}
		});

		// 业务范围选择
		$oBusiness.on('tap', '.radio', function() {
			$(this).addClass('selected').siblings().removeClass('selected');
			$oNoInvoice.children('.radio').removeClass('selected');

			// 发票抬头是否选中
			var titleSelected = $oInvoiceTitle.children('.selected').length > 0 ? true : false;
			if(!titleSelected) {
				$oInvoiceTitle.children('.radio').eq(0).addClass('selected');
			}
		});

		// 保存
		$oBtnSave.on('tap', function() {
			var title4Company = $oInvoiceTitle.find('.txt-company').closest('.radio').hasClass('selected');
			if(title4Company) {
				var txtCompany = $oInvoiceTitle.find('.txt-company').val();

				// 公司名称非空验证
				if(txtCompany === '') {
					var dialog = $(document).dialog({
						type: 'toast',
						infoIcon: 'assets/plugins/dialog2/images/icon/fail.png',
						infoText: '请填写公司名称！',
						autoClose: '1500'
					});
		            return false;
				}
			}

			// TODO 执行订单发票关联			
			window.location.href = 'order-submit.html';
		});
	}

})(Zepto, window, document);