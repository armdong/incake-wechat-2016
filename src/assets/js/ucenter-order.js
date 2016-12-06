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
                    html: '去付款（<span class="countdown"><i class="minute">30</i>:<i class="second">00</i></span>）'
                }, {
                    className: 'btn-cacel',
                    html: '取消订单'
                }, {
                    className: 'btn-detail',
                    html: '查看详情'
                }],
                pubTime: '2016/12/06 13:10:00' // 下单时间
            }, {
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
                    html: '去付款（<span class="countdown"><i class="minute">30</i>:<i class="second">00</i></span>）'
                }, {
                    className: 'btn-cacel',
                    html: '取消订单'
                }, {
                    className: 'btn-detail',
                    html: '查看详情'
                }],
                pubTime: '2016/12/06 12:50:00' // 下单时间
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
                }],
                pubTime: '2016/12/06 11:00:00'
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
                }],
                pubTime: '2016/12/06 11:00:00'
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
                }],
                pubTime: '2016/12/06 11:00:00'
            }, {
                time: '2016年12月12日 17:00-20:00 送达',
                status: {
                    className: 'unconfirm',
                    text: '待确认'
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
                    className: 'btn-cancel',
                    html: '取消订单'
                }, {
                    className: 'btn-detail',
                    html: '查看详情'
                }],
                pubTime: '2016/12/06 11:00:00'
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
    	// 获取url中的订单类型，例如“准备中” preparing
    	// http://192.168.1.223:3000/ucenter-order.html?ordertype=preparing
    	// -> orderType: preparing
    	var orderType = utils.getParameterByName('ordertype');
    	orderType === null ? 'all' : orderType;

    	// 发送Ajax请求
    	$.ajax({
    		url: 'loadOrdersData.aspx', // 获取订单数据api
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

        // 初始化倒计时
        handle4Countdown();
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

    /**
     * 初始化倒计时处理函数
     * @return {[type]} [description]
     */
    function handle4Countdown() {

    	// 拿到所有待支付订单倒计时DOM
    	var $aCountDown = $('#orders').find('.countdown');

    	// 遍历所有的倒计时DOM
    	$.each($aCountDown, function(i, ele) {
    		// 拿到下单时间
    		var strTime = $(ele).closest('.item-footer').attr('data-pubtime'),
    			beginTime = new Date(strTime);

    		var endTime = beginTime.addMinutes(30),
    			currShowTimeSeconds = 0;

    		var $oMinute = $(ele).find('.minute'),
    			$oSecond = $(ele).find('.second');

    		currShowTimeSeconds = getCurrentShowTimeSeconds();

    		ele.timer = setInterval(function() {
    			render();
    			update();
    		}, 50);

    		function update() {
    			var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    			var nextHours = parseInt(nextShowTimeSeconds / 3600, 10),
    				nextMinutes = parseInt((currShowTimeSeconds - nextHours * 3600) / 60, 10),
    				nextSeconds = nextShowTimeSeconds % 60;

    			var currHours = parseInt(currShowTimeSeconds / 3600, 10),
    				currMinutes = parseInt((currShowTimeSeconds - currHours * 3600) / 60, 10),
    				currSeconds = currShowTimeSeconds / 60;

    			if(nextSeconds !== currSeconds) {
    				currShowTimeSeconds = nextShowTimeSeconds;
    			}
    		}

    		function render() {
    			var hours = parseInt(currShowTimeSeconds / 3600, 10),
    				minutes = parseInt((currShowTimeSeconds - hours * 3600) / 60, 10),
    				seconds = currShowTimeSeconds % 60;

    			if(hours === 0 && minutes === 0 && seconds === 0) {
    				// TODO 处理取消订单动作
    				// handle4CancelOrder();
    				
    				clearInterval(ele.timer);
    			}

    			$oMinute.html(minutes < 10 ? '0' + minutes : minutes);
    			$oSecond.html(seconds < 10 ? '0' + seconds : seconds);
    		}

    		function getCurrentShowTimeSeconds() {
    			var currTime = new Date();
    			var ret = endTime.getTime() - currTime.getTime();
    			ret = Math.round(ret / 1000);
    			return ret >= 0 ? ret : 0;
    		}
    	});
    }

})(Zepto, window, document);
