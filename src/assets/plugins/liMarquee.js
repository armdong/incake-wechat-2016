(function ($) {
	var methods = {
		init: function () {
			var p = {
				scrollamount: 60 //滚动速度，越大越快
			};
			
			return this.each(function () {
				var strWrap = $(this).addClass('str_wrap');
					
				strWrap.wrapInner($('<div>').addClass('str_move'));
				
				var strMove = $('.str_move', strWrap),
					leftPos = -strMove.width(),
					time = 0;

				//单次动画所需时间
				var timeFunc = function () {
						var fullS = Math.abs(leftPos),
							time = (fullS / p.scrollamount) * 1000;
						if (parseFloat(strMove.css('left')) != 0) {
							fullS = (fullS + strWrap.width());
							time = (fullS - (strWrap.width() - parseFloat(strMove.css('left')))) / p.scrollamount * 1000;
						}
						return time;
					},
					//轮播效果具体实现
					moveFunc = function () {
						strMove.animate({
							left: leftPos
						}, timeFunc(), 'linear', function () {
							$(this).css({
								left: strWrap.width()
							});
							//定时调取动画
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