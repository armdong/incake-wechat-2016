/**
 * Desc: homepage javascript file
 * Author: armdong
 * Date: 2016/09/12
 */

;(function($){

	$(function(){

		// 首页Banner轮播图模块
		var swiperBanner = null,
			$oBannerContainer = $('#idxSlide');

		fnInitBanner();

		// 首页Banner轮播图
		function fnInitBanner() {
			var containerWidth = $oBannerContainer.width();
	        $oBannerContainer.find('img').css({
	            width: containerWidth,
	            height: containerWidth / 2
	        });
	        if (swiperBanner != null) {
	            swiperBanner.destroy();
	        }
	        swiperBanner = null;
	        swiperBanner = new Swiper('.swiper-container', {
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

		$(window).on('resize', function() {
            fnInitBanner();
        });

	});

})(Zepto);