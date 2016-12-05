/**
 * Desc: Javascript Utils
 * Author: wangmd
 * Date: 2016/12/05
 */
;(function(window, document) {

	var utils = utils || {};

	/**
	 * 获取Url中指定QueryString的值
	 * @param  {[type]} name [description]
	 * @param  {[type]} url  [description]
	 * @return {[type]}      [description]
	 */
	utils.getParameterByName = function(name, url) {
		if(!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if(!results) {
			return null;
		}
		if(!results[2]) {
			return '';
		}
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	window.utils = utils;

})(window, document);