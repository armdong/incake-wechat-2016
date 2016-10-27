(function ($) {
	var methods = {
		init: function () {
			var p = {
				scrollamount: 60 //滚动速度，越大越快
			};
			
			return this.each(function () {
				var strWrap = $(this).addClass('str_wrap').data({scrollamount:p.scrollamount});
					
				strWrap.wrapInner($('<div>').addClass('str_move'));
				
				var strMove = $('.str_move', strWrap),
					time = 0;

				var leftPos = -strMove.width(),
					//单次动画所需时间
					timeFunc = function () {
						var fullS = Math.abs(leftPos),
							time = (fullS / strWrap.data('scrollamount')) * 1000;
						if (parseFloat(strMove.css('left')) != 0) {
							fullS = (fullS + strWrap.width());
							time = (fullS - (strWrap.width() - parseFloat(strMove.css('left')))) / strWrap.data('scrollamount') * 1000;
						}
						return time;
					},
					moveFunc = function () {
						strMove.animate({
							left: leftPos
						}, timeFunc(), 'linear', function () {
							$(this).css({
								left: strWrap.width()
							});
							
							setTimeout(moveFunc, p.scrolldelay);
						});
					};
				
				moveFunc();
					
			});
		}
	};
	
	$.fn.liMarquee = function (method) {
		return methods.init.apply(this, arguments);
	};
})(Zepto);