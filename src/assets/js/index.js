/**
 * Desc: homepage javascript file
 * Author: armdong
 * Date: 2016/09/12
 */

;(function($, window, document) {

    $(function() {

        var swiperBanner = null,
            swiperRecommend = null;

        // 首页Banner模块
        fnInitBanner();

        // 精品推荐模块
        fnInitRecommend();

        $(window).on('resize', function() {
            fnInitBanner();
            fnInitRecommend();
        });

        // 首页Banner
        function fnInitBanner() {
            var $oContainer = $('#idxSlide'),
                containerWidth = $oContainer.width();

            //console.log(containerWidth);

            $oContainer.find('img').css({
                width: containerWidth,
                height: containerWidth / 2
            });
            if (swiperBanner != null) {
                swiperBanner.destroy(true, true);
            }
            swiperBanner = null;
            swiperBanner = new Swiper('#idxSlide', {
                pagination: '.swiper-pagination',
                width: containerWidth,
                height: containerWidth / 2,
                loop: true,
                centeredSlides: true,
                autoplay: 5000,
                speed: 500,
                autoplayDisableOnInteraction: false,
                preloadImages: false,
                lazyLoading: true
            });
        }

        // 精品推荐
        function fnInitRecommend() {

        	var $oContainer = $('#idxSection'),
            	containerWidth = $oContainer.find('.sec-body').width();

            //console.log(containerWidth);

            if (swiperRecommend != null) {
                swiperRecommend.destroy(true, true);
            }

            swiperRecommend = new Swiper('#recSlide', {
                pagination: '.swiper-pagination',
                loop: false,
                centeredSlides: true,
                speed: 500,
                preloadImages: true,
                lazyLoading: true,
                updateTranslate: true
            });
            swiperRecommend.update(true);
        }

        // 首页公告模块
        fnInitNotice();

        // 喜欢/收藏
        fnFavor();

    });

    function fnInitNotice() {
    	var $oNotice = $('#idxNotice'),
    		$oNoticeMsg = $oNotice.find('.notice-msg'),
    		$oNoticeClose = $oNotice.find('.notice-close'),
    		tl = new TimelineLite();

    	// 关闭公告
    	$oNoticeClose.on('click', function(){
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
        var marqueeText = '非真正内容非真正内容，非真正内容非真正内容非真正内容。非真正内容非真正内容，非真正内容非真正内容非真正内容。';
        $oNoticeMsg.marquee({
            text: marqueeText,
            timer: 200,
            direction: 'left'
        });
    }

    function fnFavor() {
        var $oContainer = $('#idxSection'),
            $aFavor = $oContainer.find('.favor');

        $.each($aFavor, function(i, ele){
            $(ele).on('click', function(){
                $(this).toggleClass('followed');
            });
        });
    }

})(Zepto, window, document);


