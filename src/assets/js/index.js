/**
 * Desc: homepage javascript file
 * Author: armdong
 * Date: 2016/09/12
 */

;(function($, window, document) {

    $(function() {

        var swiperBanner = null,
            swiperRecommend = null;

        // 首页Banner轮播图模块
        fnInitBanner();

        // 精品推荐轮播图模块
        fnInitRecommend();

        $(window).on('resize', function() {
            fnInitBanner();
            fnInitRecommend();
        });


        // 首页Banner轮播图
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

        // 精品推荐轮播图
        function fnInitRecommend() {

        	var $oContainer = $('#idxSection'),
            	containerWidth = $oContainer.find('.sec-body').width();

            console.log(containerWidth);

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

    });

})(Zepto, window, document);
