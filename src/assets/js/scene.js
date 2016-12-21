/**
 * Desc: scene javascript file
 * Author: armdong
 * Date: 2016/12/19
 */

/**
 * 对规格进行格式化
 * @param  spec    要格式化的规格
 * @param  format  进行格式化的规格字符串
 * @return [description]
 */
template.helper('specFormat', function(spec) {
    var str = '';
    if(!!spec && $.isArray(spec)){
        for(var i = 0, len = spec.length; i < len; i++) {
            str += spec[i].price + ',' + spec[i].pound + ',' + spec[i].note;
            if( i !== len - 1) {
                str += '|';
            }
        }
    }
    return str;
});

;(function($, window, document) {

    $(function() {
        
    });

})(Zepto, window, document);