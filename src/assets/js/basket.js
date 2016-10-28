;(function($, window, document) {

	$(function() {

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		// 购物篮公告模块
        fnInitNotice();
		
	});

	/**
     * [fnInitNotice 购物篮公告模块]
     * @return {[type]} [description]
     */
    function fnInitNotice() {
        var $oNotice = $('#basketNotice'),
            $oNoticeMsg = $oNotice.find('.notice-msg'),
            $oNoticeClose = $oNotice.find('.notice-close'),
            tl = new TimelineLite();

        // 关闭公告
        $oNoticeClose.on('tap', function() {
            tl.clear();
            tl.to($oNotice, 0.5, {
                opacity: 0,
                ease: Linear.easeOut,
                useFrames: true,
                onComplete: function() {
                    $oNotice.remove();
                }
            });
        });

        // 公告轮播
        var marqueeText = '订单满199元，可获得25元优惠券一张';
        $oNoticeMsg.text(marqueeText);

    	$oNoticeMsg.liMarquee();
    }

})(Zepto, window, document);