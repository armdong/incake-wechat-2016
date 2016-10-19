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

/**
 * 对规格进行格式化
 * @param  spec    要格式化的规格
 * @param  format  进行格式化的规格字符串
 * @return [description]
 */
template.helper('specFormat', function(spec) {
    var str = '';
    if(!!spec && _.isArray(spec)){
	    for(var i = 0, len = spec.length; i < len; i++) {
	        str += spec[i].price + ',' + spec[i].pound + ',' + spec[i].note;
	        if( i !== len - 1) {
	            str += '|';
	        }
	    }
    }
    return str;
});