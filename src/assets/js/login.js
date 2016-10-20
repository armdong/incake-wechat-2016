(function($, window, document) {

	$(function(){

		// 正则表达式地图
		window.regMap = {
			mobile: reg = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/
		};

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




	/**
	 * ==================================================
	 *                  页面初始化函数
	 * ==================================================
	 */

	// 手机登录初始化
	function fnInitNormalLogin($oForm) {
		var $oTxtMobile = $oForm.find('.txt-mobile'),
			$oTxtVCode = $oForm.find('.txt-vcode'),
			$oBtnVCode = $oForm.find('.btn-vcode'),
			$oBtnLogin = $oForm.find('.btn-login'),
			$oBtnVoice = $oForm.find('.btn-voice');

		// 获取短信验证码
		$oBtnVCode.on('click', function(){
			var $oThis = $(this);

			if($oThis.attr('isSend') !== 'send') {				
				var txtMobile = $.trim($oTxtMobile.val());

				// 手机号非空验证
				if(txtMobile === '') {
					fnMobileDialog($oTxtMobile, '请输入手机号码');
		            return false;
				}
				
				// 手机号合法性验证
				if(!regMap.mobile.test(txtMobile)) {
					fnMobileDialog($oTxtMobile, '请输入正确的手机号码');
					return false;
				}
				
				// 验证是否是30分钟内第三次获取验证码（包括语音验证码）	
				// 后台验证，每次点击需要发送请求到后台获取状态			
				handler4ValidateSendTime(function(isThirdTime){
					if(isThirdTime) { // true表示30分钟内第三次获取验证码，此时需弹出行为验证码
						handler4ActionValidate(function(){
							handler4SendCode($oThis, txtMobile);
						});
					} else {
						handler4SendCode($oThis, txtMobile);
					}
				});	
			}	
		});

		// 获取语音验证码
		$oBtnVoice.on('click', function(){
			var isSend = $oBtnVCode.attr('isSend') === 'send' ? true : false,
				iSeconds = $oBtnVCode.attr('seconds');

			var txtMobile = $.trim($oTxtMobile.val());
			var $oThis = $oBtnVCode;

			// 手机号非空验证
			if(txtMobile === '') {
				fnMobileDialog($oTxtMobile, '请输入手机号码');
	            return false;
			}
			
			// 手机号合法性验证
			if(!regMap.mobile.test(txtMobile)) {
				fnMobileDialog($oTxtMobile, '请输入正确的手机号码');
				return false;
			}

			if(isSend) { // 短信验证码正在倒计时
				fnFailDialog(iSeconds + 's后再获取语音验证码');
				return false;
			} else {
				handler4ValidateSendTime(function(isThirdTime){
					if(isThirdTime) { // true表示30分钟内第三次获取验证码，此时需弹出行为验证码
						handler4ActionValidate(function(){
							// 发送语音验证码
							handler4SendVoice($oThis, txtMobile);
						});
					} else {
						handler4SendVoice($oThis, txtMobile);
					}
				});
			}
		});

		// 登录
		$oBtnLogin.on('click', function(){

			var txtMobile = $.trim($oTxtMobile.val());
			var txtVCode = $.trim($oTxtVCode.val());

			// 手机号非空验证
			if(txtMobile === '') {
				fnMobileDialog($oTxtMobile, '请输入手机号码');
	            return false;
			}

			// 手机号合法性验证
			if(!regMap.mobile.test(txtMobile)) {
				fnMobileDialog($oTxtMobile, '请输入正确的手机号码');
				return false;
			}

			// 验证码非空验证
			if(txtVCode === '') {
				fnMobileDialog($oTxtVCode, '请输入验证码');
	            return false;
			}

			// 判断验证码正确性
			// TODO: 这里为了演示使用“硬编码”，后面需要改成后台判断
			var vcode = '123456';
			if(txtVCode !== vcode) {
				fnMobileDialog($oTxtVCode, '验证码不正确');
				return false;
			} else {
				// 验证码正确
				// TODO 处理登录逻辑
				
			}
		});
	}

	// 账号登录初始化
	function fnInitAccountLogin($oForm) {
		
	}

	// 微信登录初始化
	function fnInitWechatLogin($oForm) {
		
	}

	// 重置密码初始化
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




	/**
	 * ==================================================
	 *                处理程序 Handler
	 * ==================================================
	 */
	
	/**
	 * 行为验证码处理程序
	 * @param  {Function} callback [验证成功后的回调函数]
	 * @return {[type]}            [description]
	 */
	function handler4ActionValidate(callback) {

		var $oMaskAction = $('#maskAction'),
			$oBtn = $oMaskAction.find('.button'),
	    	$oSlider = $oMaskAction.find('.slider'),
	    	$oTrack = $oMaskAction.find('.track'),
	    	iW,iLeft;

	    // 显示行为验证码弹框
	    $oMaskAction.show();
	 
	    $oBtn.on('touchstart',function(e){
	        var touches = e.touches[0];
	        iW = touches.clientX - $oBtn.offset().left;
	        $oBtn.removeClass('button-on');
	        $oTrack.removeClass('track-on');
	        document.addEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
	    });
	 
	    $oBtn.on("touchmove", function(e) {
	        var touches = e.touches[0];
	        iLeft = touches.clientX - iW;
	        var disW = $oSlider.width() - $oBtn.width();
	        if(iLeft < 0) {
	            iLeft = 0;
	        }else if(iLeft > disW) {
	            iLeft = disW;
	        }
	        $oBtn.css({
	        	left: iLeft + 'px'
	        });
	        $oTrack.css({
	        	width: iLeft + 'px'
	        });
	    });
	 
	    $oBtn.on("touchend",function() {
	    	var disW = $oSlider.width()-$oBtn.width();	    	
	        if(iLeft >= disW) {
	        	$oBtn.css({
	        		left: disW + 'px'
	        	});
	        	$oTrack.width(disW);

	        	// 隐藏滑动解锁弹框
				$oMaskAction.hide();
	        	var dialog = $(document).dialog({
					type: 'toast',
					infoIcon: 'assets/plugins/dialog2/images/icon/success.png',
					infoText: '验证成功',
					autoClose: '1500',
					onClosed: function(){
						$oBtn.css({
			        		left: '0'
			        	});
			        	$oTrack.width(0);
						callback && callback();
					}
				});
	        }else{
	        	$oBtn.css({
	        		left: '0'
	        	});
	        	$oTrack.css({
	        		width: '0'
	        	});
	        }
	        $oBtn.addClass('button-on');
	        $oTrack.addClass('track-on');
	        document.removeEventListener("touchmove",defaultEvent,false);//阻止页面的滑动默认事件
	    });
	 
	    function defaultEvent(e) {
	        e.preventDefault();
	    }
	}
	
	/**
	 * 倒计时处理程序
	 * @param  {[type]} $oTarget  [目标元素]
	 * @param  {[type]} timestamp [时间戳]
	 * @return {[type]}           [description]
	 */
	function handler4CountDown($oTarget, timestamp) {
		var timer = null;
		var beginTime = timestamp;
        var endTime = beginTime + 90 * 1000;
        var curShowTimeSeconds = 0;

        curShowTimeSeconds = getCurrentShowTimeSeconds();

        timer = setInterval(function() {
            render();
            update();
        }, 50);

        function update() {
            var nextShowTimeSeconds = getCurrentShowTimeSeconds();
            var nextSeconds = nextShowTimeSeconds;
            var curSeconds = curShowTimeSeconds;
            if (nextSeconds !== curSeconds) {
                curShowTimeSeconds = nextShowTimeSeconds;
            }
        }

        function render() {
            var seconds = curShowTimeSeconds;
            if (seconds === 0) {
                clearInterval(timer);

                // 倒计时完成把isSend设成空字符串
                $oTarget.attr('isSend', '');
                $oTarget.attr('seconds', '');
                $oTarget.html('重新获取');
            } else {
            	$oTarget.attr('seconds', seconds);
            	$oTarget.html(seconds + 's后重新获取');
            }            
        }

        function getCurrentShowTimeSeconds() {
            var curTime = new Date().getTime();
            var ret = endTime - curTime;
            ret = Math.round(ret / 1000);
            return ret >= 0 ? ret : 0;
        }
	}

	/**
	 * 发送短信验证码处理程序
	 * @param  {[type]} $oTarget [获取验证码按钮Zepto Dom对象]
	 * @param  {[type]} mobile   [手机号]
	 * @return {[type]}          [description]
	 */
	function handler4SendCode($oTarget, mobile) {
		$.ajax({
			url: 'assets/js/send_validate_code.json',
			type: 'GET', // 上线后要用POST请求
			data: {mobile: mobile},
			dataType: 'json',
			success: function(data) {
				if(data.sendState) { // sendState:true 表示发送成功
					handler4CountDown($oTarget, data.sendTime);
					$oTarget.attr('isSend', 'send');
					fnSuccessDialog('短信验证码已发送');
				}
			},
			error: function() { // 网络错误				
				fnFailDialog('网络不稳定，请重试');
			}
		});		
	}

	/**
	 * 发送语音验证码处理程序
	 * @param  {[type]} $oTarget [获取验证码按钮Zepto Dom对象]
	 * @param  {[type]} mobile   [手机号]
	 * @return {[type]}          [description]
	 */
	function handler4SendVoice($oTarget, mobile) {
		$.ajax({
			url: 'assets/js/send_voice_code.json',
			type: 'GET', // 上线后要用POST请求
			data: {mobile: mobile},
			dataType: 'json',
			success: function(data) {
				if(data.sendState) { // sendState:true 表示发送成功
					handler4CountDown($oTarget, data.sendTime);
					$oTarget.attr('isSend', 'send');
					fnSuccessDialog('语音验证码已发送');
				}
			},
			error: function() { // 网络错误				
				fnFailDialog('网络不稳定，请重试');
			}
		});		
	}

	/**
	 * 后台验证是否是30分钟内第三次获取验证码
	 * @param  {Function} callback [回调函数]
	 * @return {[type]}            [description]
	 */
	function handler4ValidateSendTime(callback) {
		$.ajax({
			url: 'assets/js/valiedate_send_time.json',
			type: 'GET',
			dataType: 'json',
			data: {},
			success: function(data) {
				//data.state 为布尔类型，true表示是30分钟内第三次获取验证码
				callback && callback(data.isThirdTime); 
			},
			error: function() { // 网络错误				
				fnFailDialog('网络不稳定，请重试');
			}
		});
	}




	/**
	 * ==================================================
	 *                    相关辅助函数
	 * ==================================================
	 */
 
	/**
	 * 输入框错误相关提示
	 * @param  {[type]} msg [提示文字]
	 * @return {[type]}     [description]
	 */
	function fnMobileDialog($oDom, msg) {
		var dialog = $(document).dialog({
	        type: 'toast',
	        infoIcon: 'assets/plugins/dialog2/images/icon/fail.png',
	        infoText: msg,
	        autoClose: '1500',
	        onClosed: function() {
	        	$oDom.val('');
	        	$oDom.trigger('focus');
	        }
	    });
	}

	/**
	 * 成功提示
	 * @param  {[type]} msg [提示文字]
	 * @return {[type]}     [description]
	 */
	function fnSuccessDialog(msg) {
		var dialog = $(document).dialog({
			type: 'toast',
			infoIcon: 'assets/plugins/dialog2/images/icon/success.png',
			infoText: msg,
			autoClose: '1500'
		});
	}

	/**
	 * 失败提示
	 * @param  {[type]} msg [提示文字]
	 * @return {[type]}     [description]
	 */
	function fnFailDialog(msg) {
		var dialog = $(document).dialog({
			type: 'toast',
			infoIcon: 'assets/plugins/dialog2/images/icon/fail.png',
			infoText: msg,
			autoClose: '1500'
		});
	}

})(Zepto, window, document);