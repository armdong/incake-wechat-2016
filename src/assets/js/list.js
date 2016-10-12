/**
 * Desc: list javascript file
 * Author: armdong
 * Date: 2016/10/12
 */

;(function($, window, document){

	$(function(){

		// 绑定全部蛋糕
		fnBindAll();
	});

	function fnBindAll() {
		var $oContainer = $('#secAll');

        // 渲染 全部 模板
        var _data = {
            list: [{
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }, {
                link: 'javascript:;',
                img: 'assets/imgs/list/cake.jpg',
                name: {
                    cn: '芒果拿破仑',
                    en: 'Fresh Mango Napoleon'
                },
                price: '189',
                pound: '1.5'
            }]
        };
        var _html = template('tplSecAll', _data);
        $oContainer.html(_html);
	}

})(Zepto, window, document);