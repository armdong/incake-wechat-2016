/**
 * Desc:订单评价
 * Author: chenxj
 * Date: 2016/12/08
 */
;(function($, window, document) {

    $(function() {

    	// mock 订单数据
    	var _data = {
            list: [{
            	cakePhoto: 'assets/imgs/order/list_img.jpg',
            	cakeName: '女王芝士',
                cakeInfo: {
                    cakeWeight: '1.5磅',
                    cakeNumber: '1',
                    cakePrice: '189'
                }                
            }, {
            	cakePhoto: 'assets/imgs/order/list_img.jpg',
            	cakeName: '女王芝士',
                cakeInfo: {
                    cakeWeight: '1.5磅',
                    cakeNumber: '1',
                    cakePrice: '189'
                }                
            }, {
            	cakePhoto: 'assets/imgs/order/list_img.jpg',
            	cakeName: '女王芝士',
                cakeInfo: {
                    cakeWeight: '1.5磅',
                    cakeNumber: '1',
                    cakePrice: '189'
                }                
            }]
        };
        // 绑定订单信息
        fnBindCommentData(_data);

        // 加载订单信息
        // TODO 绑定数据时调用这个方法，上面的mock数据可以去掉
        // fnLoadCommentData();
        
        // 提交评价内容
        fnInitComment();
        
    });

    /**
     * 加载对应类型订单数据
     * @return {[type]} [description]
     */
    function fnLoadCommentData() {

    	// 发送Ajax请求
    	$.ajax({
    		url: 'loadCommentData.aspx', // 获取订单数据api
    		type: 'POST',
    		dataType: 'json',
    		success: function() {
    			fnLoadCommentData();
    		}
    	});
    }

    /**
     * 绑定订单列表
     * @param  {[type]} _data [数据]
     * @return {[type]} [description]
     */
    function fnBindCommentData(_data) {
        var $oCommentContainer = $('#comments');
        
        var _html = template('tplComment', _data);
        $oCommentContainer.html(_html);

    }
    
    /**
     * 初始化评价操作
     */
    function fnInitComment() {
        var $oCommentContainer = $('#comments'),
        	$oTextarea = $oCommentContainer.find('#txtSummary'),
        	iMaxLen = 50;
        
        // 星级评价
        $oCommentContainer.on('click', '.item-star li', function(){
        	var _starList = $(this).closest('.item-star'),
        		_item = _starList.find('li'),
        		_index = $(this).index(),
        		_height = _starList.closest('.item-evaluate').siblings('.item-footer').find('.comment').css('height');
        	
        	if(_height != '0px'){
        		$(_item).removeClass('active');
	        	for(var i=0; i<=_index; i++){
	    			$(_item[i]).addClass('active');
	        	}
	        	
	        	var status = _starList.find('.active').length,
	        		_remarkList = _starList.closest('.item-evaluate').siblings('.item-remark').find('ul'),
	        		_html = "";
	        	
	        	switch (status) {
	        		case 1:
	        			_html = "<li>物流太慢</li><li>味道不好</li><li>蛋糕不新鲜</li>"
	        			break;
	        		case 2:
	        			_html = "<li>物流太慢</li><li>味道不满意</li><li>蛋糕不新鲜</li>"
	        			break;
	        		case 3:
	        			_html = "<li>物流有待提升</li><li>味道一般</li><li>总体还行</li>"
	        			break;
	        		case 4:
	        			_html = "<li>按时送达</li><li>味道不错</li><li>基本满意</li>"
	        			break;
	        		case 5:
	        			_html = "<li>服务态度好</li><li>味道赞</li><li>蛋糕很新鲜</li>"
	        			break;
	        	}
	        	
	        	_remarkList.html(_html);
        	}
        	
        });
        
        $oTextarea.bind('input propertychange', function(e) {
            var text = $(this).val().trim(),
                iLen = text.length,
                $oLastWord = $(this).closest('.comment').find('#lastWord');

            if (iLen > iMaxLen) {
                $(this).val(text.substring(0, iMaxLen));
                iLen = iMaxLen;
            }
            $oLastWord.html(iLen);
        });
        
        // 提交评价
        $oCommentContainer.on('click', '.btn-submit', function(){
        	var _textarea = $(this).siblings('textarea'),
        		_number = $(this).siblings('.number'),
        		_comment = $(this).closest('.comment'),
        		_footer = _comment.closest('.item-footer'),
        		_subComment = _comment.siblings('.sub-comment'),
	        	_remark = _footer.siblings('.item-remark'),
	        	_evaluate = _footer.siblings('.item-evaluate'),
				_remarkItem = _remark.find('li');
        	
        	// 隐藏item-footer
        	_textarea.hide();
        	_number.hide();
        	$(this).hide();
        	$(this).closest('.comment').css({
				'height':'0',
				'transition':'.5s'
			});
			
        	// 显示评语 
        	if(_textarea.val()!=""){
        		_subComment.text(_textarea.val());
        		_subComment.show();
        	}else{
        		_footer.css('padding','0');
    			_remark.css('border','none');
        	}
        	
        	// 显示热门标签
        	_remarkItem.hide();
    		_remark.find('li.active').show();
        	
    		// 清除热评标签样式	
    		if(!$(_remarkItem).hasClass('active')){
    			_remark.css('border','none');
    			_remark.css('padding','0');
    		}
    		
        });
        
        // 选择评论选项
        $oCommentContainer.on('click', '.item-remark li', function(){
        	var _height = $(this).closest('.item-remark').siblings('.item-footer').find('.comment').css('height');
        	
        	if(_height != '0px'){
        		$(this).toggleClass('active');
        	}
        });
        
    }

})(Zepto, window, document);
