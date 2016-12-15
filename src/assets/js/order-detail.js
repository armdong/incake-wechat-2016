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
            	status: 'canceled', //unpay：待付款 unconfirm：待确认 preparing：准备中 shipped：已配送 canceled：已取消
    			estimatedTime: '12月12日 10:00 - 12:00 送达',
            	orderNumber: 'SHW8900004',
            	orderTime: '2016年12月12日',
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

    	// 发送Ajax请求
    	$.ajax({
    		url: 'loadCommentData.aspx', // 获取订单数据api
    		type: 'POST',
    		dataType: 'json',
    		success: function() {
    			fnLoadCommodityData();
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
        	status = _data.orderData.status;
        
        $oTime.text(_data.orderData.estimatedTime);
        
        // 显示订单状态
        $('.'+status).addClass('active');
        if(status=='unpay'){ //待付款
        	$oCountdown.show();
        	//启动计时器
        }else if(status=='unconfirm'){ //待确认
        	$('.unpay').addClass('unconfirm').removeClass('unpay').addClass('active');
        	$('.unconfirm').text('待确认');
        }else if(status=='canceled'){ //已配送
        	$('.shipped').addClass('canceled').removeClass('shipped').addClass('active');
        	$('.canceled').text('已取消');
        }
        
        // 提交评价
//      $oCommentContainer.on('click', '.btn-submit', function(){
//      	var _textarea = $(this).siblings('textarea'),
//      		_number = $(this).siblings('.number'),
//      		_comment = $(this).closest('.comment'),
//      		_footer = _comment.closest('.item-footer'),
//      		_subComment = _comment.siblings('.sub-comment'),
//	        	_remark = _footer.siblings('.item-remark'),
//	        	_evaluate = _footer.siblings('.item-evaluate'),
//				_remarkItem = _remark.find('li');
//      	
//      	// 隐藏item-footer
//      	_textarea.hide();
//      	$(this).hide();
//      	$(this).closest('.comment').css({
//				'height':'0',
//				'transition':'.5s'
//			});
//			
//      });
        
        // 选择评论选项
//      $oCommentContainer.on('click', '.item-remark li', function(){
//      	var _height = $(this).closest('.item-remark').siblings('.item-footer').find('.comment').css('height');
//      	
//      	if(_height != '0px'){
//      		$(this).toggleClass('active');
//      	}
//      });
//      
    }

})(Zepto, window, document);
