/**
 * Desc:订单评价
 * Author: chenxj
 * Date: 2016/12/14
 */
(function($, window, document) {

    $(function() {

    	// mock 订单数据
    	var _data = {
    		commodityData: {
            	commodityList: [{
	            	cakePhoto: 'assets/imgs/order/list_img.jpg',
	            	cakeName: '女王芝士',
	                cakeInfo: {
	                    cakeWeight: '1.5磅',
	                    cakeCount: '1',
	                    cakePrice: '189'
	                }                
	            }, {
	            	cakePhoto: 'assets/imgs/order/list_img.jpg',
	            	cakeName: '蓝莓拿破仑',
	                cakeInfo: {
	                    cakeWeight: '1.6磅',
	                    cakeCount: '2',
	                    cakePrice: '378'
	                }
	            }, {
	            	cakePhoto: 'assets/imgs/order/list_img.jpg',
	            	cakeName: '挚爱红丝绒',
	                cakeInfo: {
	                    cakeWeight: '2.4磅',
	                    cakeCount: '1',
	                    cakePrice: '588'
	                }
                }, {
	            	cakePhoto: 'assets/imgs/order/list_img.jpg',
	            	cakeName: '超级蜂巢',
	                cakeInfo: {
	                    cakeWeight: '1.6磅',
	                    cakeCount: '2',
	                    cakePrice: '378'
	                }
	            }, {
	            	cakePhoto: 'assets/imgs/order/list_img.jpg',
	            	cakeName: '浓情巧克力',
	                cakeInfo: {
	                    cakeWeight: '1.2磅',
	                    cakeCount: '1',
	                    cakePrice: '169'
	                }                
	            }]
            },
            largessData: {
            	largessList: [{
	            	largessName: '餐具',
	            	largessCount: '5'
	            },{
	            	largessName: '蜡烛',
	            	largessCount: '1'
	            },{
	            	largessName: '生日牌',
	            	largessCount: '1'
	            },{
	            	largessName: '生日贺卡',
	            	largessCount: '1'
	            },{
	            	largessName: '蜡烛',
	            	largessCount: '2'
	            },{
	            	largessName: '生日牌',
	            	largessCount: '1'
	            },{
	            	largessName: '贺卡',
	            	largessCount: '3'
	            },{
	            	largessName: '餐具',
	            	largessCount: '1'
	            }]
            },
            orderData: {
            	orderType: 'unpay', //unpay：待付款 unconfirm：待确认 preparing：准备中 shipped：已配送 canceled：已取消
    			estimatedTime: '12月18日 10:00 - 12:00 送达',
            	orderNumber: 'SHW8900004',
            	orderTime: '2016/12/15 15:20:00',
            	orderMode: '支付宝',
            	orderTotal: '432',
            	orderFreight: '10',
            	orderDiscount: '40',
            	orderPay: '338',
            	orderIntegral: '10',
            	orderRemarks: '订单备注订单备注'
            }
        };
        // 绑定订单信息
        fnBindCommodityData(_data);

        // 加载订单信息
        // TODO 绑定数据时调用这个方法，上面的mock数据可以去掉
        // fnLoadCommodityData();
        
    });

    /**
     * 加载对应类型订单数据
     * @return {[type]} [description]
     */
    function fnLoadCommodityData() {
		// 获取url中的订单类型，例如“准备中” preparing
    	// http://192.168.1.223:3000/order-detail.html?ordertype=preparing
    	// -> orderType: preparing
    	var orderType = utils.getParameterByName('ordertype');
    	orderType === null ? 'all' : orderType;
		
    	// 发送Ajax请求
    	$.ajax({
    		url: 'loadCommodityData.aspx', // 获取订单数据api
    		type: 'POST',
    		data: {
    			orderType: orderType
    		},
    		dataType: 'json',
    		success: function() {
    			fnBindCommodityData(data);
    		}
    	});
    }

    /**
     * 绑定订单商品列表
     * @param  {[type]} _data [数据]
     * @return {[type]} [description]
     */
    function fnBindCommodityData(_data) {
        var $oCommodityList = $('#commodityList'),
        	$oLargessList = $('#largessList'),
        	$oOrderInfo = $('#orderInfo');
        
        var _commodityHtml = template('tplCommodity', _data.commodityData),
        	_largessHtml = template('tplLargess', _data.largessData),
        	_orderHtml = template('tplOrderInfo', _data.orderData);
        $oCommodityList.html(_commodityHtml);
		$oLargessList.html(_largessHtml);
		$oOrderInfo.html(_orderHtml);
		
		// 初始化操作
		fnInitComment(_data);
		
    }
    
    /**
     * 初始化操作
     */
    function fnInitComment(_data) {
        var $oDetailsContainer = $('.details-container'),
        	$oDetailsItem = $oDetailsContainer.find('.details-item'),
        	$oTime = $oDetailsItem.find('.time'),
        	$oCountdown = $oDetailsItem.find('.countdown'),
        	$oBtnMore = $oDetailsItem.find('.btn-more');
        	$oFooter = $oDetailsContainer.find('.footer'),
        	$oBtnCall = $oFooter.find('.btn-call'),
        	$oBtnPayment = $oFooter.find('.btn-payment'),
        	orderType = _data.orderData.orderType;
        
        // 预计送达时间
        $oTime.text(_data.orderData.estimatedTime);
        
        // 显示订单状态&改变按钮状态
        $('.'+orderType).addClass('active');
        
        if(orderType=='unpay'){ //待付款
        	
        	$oCountdown.removeClass('hide');
        	
        	// 初始化倒计时
        	handle4Countdown();
        	
        }else if(orderType=='unconfirm'){ //待确认
        	
        	$('.unpay').addClass('hide');
        	$('.unconfirm').removeClass('hide');
        	$oBtnPayment.addClass('btn-canceled').removeClass('btn-payment');
        	$('.btn-canceled').text('取消订单');
        	// 绑定取消订单操作	---------------功能待完善
        	
        }else if(orderType=='preparing'){	//准备中
        	
        	$oBtnPayment.hide();
        	$oBtnCall.css('width','100%');
        	$oBtnCall.addClass('change');
        
        }else if(orderType=='shipped'){ //已配送
        	
        	$oBtnPayment.addClass('btn-comment').removeClass('btn-payment');
        	$('.btn-comment').text('评价');
        	// 绑定评价订单操作	---------------功能待完善
        	$('.btn-comment').attr('href','order-comment.html');
        
        }else if(orderType=='canceled'){ //已取消
        	
        	$('.shipped').addClass('hide');
        	$('.canceled').removeClass('hide');
        	$oBtnPayment.hide();
        	$oBtnCall.css('width','100%');
        	$oBtnCall.addClass('change');
        	
        
        }
        
        // 查看更多商品
        $oBtnMore.on('click', function(){
        	var $oCommodityList = $(this).siblings('.commodity-list'),
        		$oCommodityItem = $oCommodityList.find('li');
        	
        	$(this).hide();
        	$oCommodityItem.eq(1).css({
        		'borderBottom':'1px',
        		'borderStyle': 'dotted',
        		'borderColor': '#dcdcdc'
    		});
        	$oCommodityItem.css('display','block');
			
        });
        
    }
    
    /**
     * 初始化倒计时处理函数
     * @return {[type]} [description]
     */
    function handle4Countdown() {

    	// 拿到所有待支付订单倒计时DOM
    	var $aCountDown = $('.details-container').find('.countdown');

		// 拿到下单时间
		var strTime = $('.order-time').text(),
			beginTime = new Date(strTime);

		var endTime = beginTime.addMinutes(30),
			currShowTimeSeconds = 0;

		var $oMinute = $aCountDown.find('.minute'),
			$oSecond = $aCountDown.find('.second');

		currShowTimeSeconds = getCurrentShowTimeSeconds();

		$aCountDown.timer = setInterval(function() {
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
				
				clearInterval($aCountDown.timer);
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
    }

})(Zepto, window, document);
