// 遮罩层
var Mask = (function($){

	var publicAPI = {
		show: showMask,
		hide: hideMask
	};

	function showMask() {
		var $oMask = $('#mask');
		if($oMask.length > 0) {
			$oMask.show();
		} else {
			$('<div id="mask"></div>').appendTo($('body')).show();
		}
		$('body').on('touchmove.mask', function(e) {
            e.preventDefault();
        });
	}

	function hideMask() {
		var $oMask = $('#mask');
		$oMask.hide().remove();
		$('body').off('.mask');
	}

	return publicAPI;
})(Zepto);
