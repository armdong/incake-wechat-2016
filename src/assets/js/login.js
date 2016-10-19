(function($, window, document) {

	$(function(){
		var $oContainer = $('#loginContainer'),
			$oForm = $oContainer.find('.login-form');

		if($oForm.hasClass('findpwd')) {
			fnInitFindPassword($oForm);
		}
	});

	// 找回密码
	function fnInitFindPassword($oForm) {
		var $oStep1 = $oForm.find('.step1'),
			$oStep2 = $oForm.find('.step2'),
			$oBtnNext = $oStep1.find('.btn-next'),
			tl = new TimelineLite();

		// 下一步
		$oBtnNext.on('click', function(){
			tl.clear();
			tl.to($oForm, 0.5, {
				x: '-100%'
			});
		});
	}

})(Zepto, window, document);