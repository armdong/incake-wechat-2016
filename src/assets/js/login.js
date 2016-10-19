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
		var $oTxtMobile = $oForm.find('.txt-mobile'),
			$oTxtVCode = $oForm.find('.txt-vcode'),
			$oBtnVCode = $oForm.find('.btn-vcode'),
			$oBtnLogin = $oForm.find('.btn-login');

		// 获取短信验证码
		$oBtnVCode.on('click', function(){

			var txtMobile = $oTxtMobile.val();

			// 验证手机号是否为空
			if($.trim(txtMobile) === '') { 
				var msg = '请输入手机号码';
				txtMobileDialog(msg);
	            return false;
			}
			
			// 验证手机号是否是非法手机号
			var reg = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/;
			if(!reg.test(txtMobile)) {
				var msg = '请输入正确的手机号码';
				txtMobileDialog(msg);
				return false;
			}

			// TODO 获取验证码
			

		});

		// 手机号码错误相关提示
		function txtMobileDialog(msg) {
			var dialog = $(document).dialog({
                type: 'toast',
                infoIcon: 'assets/plugins/dialog2/images/icon/fail.png',
                infoText: msg,
                autoClose: '1500',
                onClosed: function() {
                	// 清空输入框
                	$oTxtMobile.val('');
                	// 获取焦点
                	$oTxtMobile.trigger('focus');
                }
            });
		}
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