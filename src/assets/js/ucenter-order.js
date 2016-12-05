/**
 * Desc:我的订单
 * Author: wangmd
 * Date: 2016/12/05
 */
;(function($, window, document) {

    $(function() {

    	// mock 订单数据
    	var _data = {
            hasOrders: true,
            list: [{
                time: '2016年12月12日 17:00-20:00 送达',
                status: {
                    className: 'unpay',
                    text: '待付款'
                },
                orders: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_01.jpg'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_02.jpg'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_01.jpg'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_02.jpg'
                }],
                btns: [{
                    className: 'btn-pay active',
                    html: '去付款(<span class="countdown"><i class="minute">30</i>:<i class="second">00</i></span>)'
                }, {
                    className: 'btn-cacel',
                    html: '取消订单'
                }, {
                    className: 'btn-detail',
                    html: '查看详情'
                }]
            }, {
                time: '2016年12月12日 17:00-20:00 送达',
                status: {
                    className: 'canceled',
                    text: '已取消'
                },
                orders: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_01.jpg'
                }],
                btns: [{
                    className: 'btn-detail',
                    html: '查看详情'
                }]
            }, {
                time: '2016年12月12日 17:00-20:00 送达',
                status: {
                    className: 'preparing',
                    text: '准备中'
                },
                orders: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_01.jpg'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_02.jpg'
                }],
                btns: [{
                    className: 'btn-detail',
                    html: '查看详情'
                }, {
                    className: 'btn-contact',
                    html: '联系客服'
                }]
            }, {
                time: '2016年12月12日 17:00-20:00 送达',
                status: {
                    className: 'shipped',
                    text: '已配送'
                },
                orders: [{
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_01.jpg'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_02.jpg'
                }, {
                    link: 'javascript:;',
                    img: 'assets/imgs/ucenter/cake_01.jpg'
                }],
                btns: [{
                    className: 'btn-comment active',
                    html: '评价'
                }, {
                    className: 'btn-detail',
                    html: '查看详情'
                }]
            }]
        };
        // 绑定订单信息
        fnBindOrdersData(_data);

        // 加载订单信息
        // TODO 绑定数据时调用这个方法，上面的mock数据可以去掉
        // fnLoadOrdersData();
    });

    /**
     * 加载对应类型订单数据
     * @return {[type]} [description]
     */
    function fnLoadOrdersData() {
    	var orderType = utils.getParameterByName('ordertype');
    	orderType === null ? 'all' : orderType;

    	// 发送Ajax请求
    	$.ajax({
    		url: 'loadOrderData.aspx',
    		type: 'POST',
    		data: {
    			orderType: orderType
    		},
    		dataType: 'json',
    		success: function(data) {
    			fnBindOrdersData(data);
    		}
    	});
    }

    /**
     * 绑定订单列表
     * @param  {[type]} _data [数据]
     * @return {[type]} [description]
     */
    function fnBindOrdersData(_data) {
        var $oOrderContainer = $('#orders');
        
        var _html = template('tplOrders', _data);
        $oOrderContainer.html(_html);

        // 初始化swiper
        handle4Swiper();
    }

    /**
     * 初始化swiper处理函数
     * @return {[type]} [description]
     */
    function handle4Swiper() {
        new Swiper('.swiper-container', {
            scrollbarHide: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            grabCursor: true,
            freeMode: true,
            updateTranslate: true,
            setWrapperSize: true,
            observer: true,
            observeParents: true
        });
    }

})(Zepto, window, document);
