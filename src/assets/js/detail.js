(function($, window, document){

	$(function(){
		var swiperDetail = null;
		fnInitDetailSlide();

		// 设备横竖屏发生改变监听事件
        $(window).on('resize', function() {
            fnInitDetailSlide();
        });

        // 详情页Banner
        function fnInitDetailSlide() {
            var $oContainer = $('#detailSlide'),
                containerWidth = $oContainer.width();

            // 渲染swiper模板
            var _data = {
                list: [{
                    img: 'assets/imgs/detail/01.jpg'
                }, {
                    img: 'assets/imgs/detail/01.jpg'
                }, {
                    img: 'assets/imgs/detail/01.jpg'
                }]
            };
            var _html = template('tplDetailSlide', _data);
            $oContainer.find('.swiper-wrapper').html(_html);

            $oContainer.find('img').css({
                width: containerWidth
            });
            if (swiperDetail !== null) {
                swiperDetail.destroy(true, true);
            }
            swiperDetail = null;
            swiperDetail = new Swiper('#detailSlide', {
                pagination: '.swiper-pagination',
                width: containerWidth,
                loop: true,
                centeredSlides: true,
                autoplay: 5000,
                speed: 500,
                autoplayDisableOnInteraction: false,
                preloadImages: false,
                lazyLoading: true,
                observer: true,
                observeParents: true
            });
        }

        // 规格切换
        fnInitSpec();
	});

	/**
	 * 规格切换
	 * @return {[type]} [description]
	 */
	function fnInitSpec() {
		var $oSpec = $('#specInfo'),
			$oPound = $oSpec.find('.pounds'),				
			tl = new TimelineLite();

		// 切换规格
		$oPound.on('tap', 'li', function(){
			$(this).addClass('active').siblings().removeClass('active');
		});

		// 查看更多规格
		$oSpec.on('tap', '.more-pound', function(){
			var isExpand = $oPound.hasClass('expand'),
				iPoundH = $oPound.find('li').height(),
				iPoundM = parseInt($oPound.find('li').css('margin-bottom'), 10);

			tl.clear();

			if(isExpand) { // 展开状态
				$oPound.removeClass('expand').css({
					'height': (iPoundH + iPoundM - 1) + 'px'
				});
				tl.to($oSpec.find('.more-pound'), 0.2, {
					rotation: 0
				});
			} else {	// 非展开状态
				$oPound.addClass('expand').css({
					'height': 'auto'
				});
				tl.to($oSpec.find('.more-pound'), 0.2, {
					rotation: 180
				});
			}			
		});
	}

})(Zepto, window, document);