(function($, window, document) {

	$(function(){
		var $oContainer = $('#loginContainer'),
			$oForm = $oContainer.find('.login-form');

		// 初始化对应流程
		if($oForm.hasClass('normal-login')) {
			// 手机登录
			fnInitNormalLogin($oForm);
		} else if($oForm.hasClass('account-login')) {
			// 账号登录
			fnInitAccountLogin($oForm);
		} else if($oForm.hasClass('wechat-login')) {
			// 微信登录
			fnInitWechatLogin($oForm);
		} else if($oForm.hasClass('findpwd')) {
			// 重置密码
			fnInitFindPassword($oForm);
		}
	});

	// 手机登录
	function fnInitNormalLogin($oForm) {

	}

	// 账号登录
	function fnInitAccountLogin($oForm) {
		
	}

	// 微信登录
	function fnInitWechatLogin($oForm) {
		
	}

	// 重置密码
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