;(function($, window, document) {

	$(function() {

        window.adaptive.desinWidth = 750;
        window.adaptive.init();

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		// 初始化地址列表
		fnInitAddress();

		// 城市切换
		fnInitCity();

		// 区域切换
		fnInitArea();
	});

	/**
	 * 绑定收获地址
	 * @return {[type]} [description]
	 */
	function fnInitAddress() {
		var $oAddressList = $('#addressList'),
			$oAddressWrapper = $oAddressList.parent('.address-wrapper'),
			$oNewAddress = $('#newAddress'),
			$oName = $oNewAddress.find('.txt-name'),
			$oMobile = $oNewAddress.find('.txt-mobile'),
			$oCity = $oNewAddress.find('.txt-city'),
			$oArea = $oNewAddress.find('.txt-area'),
			$oStreet = $oNewAddress.find('.txt-street'),
			$oDetail = $oNewAddress.find('.txt-detail'),
			tl = new TimelineLite(),
			action = ''; // 动作：first:首次新增地址，new:普通新增地址,edit:修改地址

		// 绑定数据
		var _data = {
			hasAddress: true, // 地址列表是否有数据
			list: [{
				isDefault: true, // 默认地址
				isDisabled: false,
				info: {
					name: '张三',
					mobile: '13322222222'
				},
				addr: {
					city: '上海市',
					area: '静安区',
					street: '广中西路777弄99号506室'
				}
			}, {
				isDefault: false,
				isDisabled: false,
				info: {
					name: '张三',
					mobile: '13322222222'
				},
				addr: {
					city: '上海市',
					area: '静安区',
					street: '广中西路777弄99号506室印克时光'
				}
			}, {
				isDefault: false,
				isDisabled: true,
				info: {
					name: '张三',
					mobile: '13322222222'
				},
				addr: {
					city: '上海市',
					area: '静安区',
					street: '广中西路777弄99号506室'
				}
			}]
		};
		var _html = template('tplAddressList', _data);
        $oAddressList.html(_html);

        // 收货地址切换 事件处理函数
        $oAddressList.on('tap', '.btn-radio', function() {
        	$(this).addClass('selected')
        		.parent().siblings()
        		.children('.btn-radio')
        		.removeClass('selected');
        });

        // 新增收货地址 事件处理函数
        $oAddressList.on('tap', '.btn-new', function() {   

        	// 拿到当前新增动作，首次还是普通
        	action = $(this).attr('action');

        	tl.clear();
        	tl.to($oAddressWrapper, 0.5, {
        		x: '-50%',
        		onStart: handler4EmptyForm
        	});
        });

        // 编辑收货地址 事件处理函数
        $oAddressList.on('tap', '.btn-edit', function() {
        	tl.clear();
        	tl.to($oAddressWrapper, 0.5, {
        		x: '-50%'
        	});
        });

        // 保存新增/编辑地址 事件处理函数
        $oNewAddress.on('tap', '.btn-save', function() {

        	if(typeof action === 'string' && action !== '') {
        		switch(action) {
        			case 'first': 	// 首次新增地址
        				handler4FirstAdd();
        				break;
        			case 'new': 	// 普通新增地址
        				handler4Add();
        				break;
        			case 'edit': 	// 修改地址
        				handler4Edit();
        				break;
        			default: 		// 普通新增地址
        				handler4Add();
        				break;
        		}
        	}

        	tl.clear();
        	tl.to($oAddressWrapper, 0.5, {
        		x: '0%'
        	});
        });

        // 普通新增地址
        function handler4Add() {
        	var name = $oName.val(),
        		mobile = $oMobile.val(),
        		city = $oCity.text(),
        		area = $oArea.text(),
        		street = $oStreet.text();
        }

        // 清空form
        function handler4EmptyForm() {
        	$oName.val('');
        	$oMobile.val('');
        	$oCity.text('请选择').attr('data-id', '').attr('data-value', '');
        	$('#cityId').attr('id', '').attr('value', '');
        	$oArea.text('请选择').attr('data-id', '').attr('data-value', '');
        	$('#areaId').attr('id', '').attr('value', '');
        	$oStreet.text('街道/小区/写字楼');
        	$oDetail.text('楼号/单元/门牌号');
        }
	}

	/**
     * 城市切换
     * @return {[type]} [description]
     */
    function fnInitCity(){

        var showCityDom = document.querySelector('#showCity');
        var cityIdDom = document.querySelector('#cityId');

        var data = [
            {'id': '021', 'value': '上海'},
            {'id': '0591', 'value': '福州'},
            {'id': '0512', 'value': '苏州'},
            {'id': '0999', 'value': '昆山'},
            {'id': '0592', 'value': '厦门'},
            {'id': '214000', 'value': '无锡'},
            {'id': '010', 'value': '北京'},
            {'id': '025', 'value': '南京'},
            {'id': '0571', 'value': '杭州'}
        ];

        showCityDom.addEventListener('click', function () {
            var cityId = showCityDom.dataset.id;
            var cityName = showCityDom.dataset.value;

            var citySelect = new IosSelect(1, 
                [data],
                {
                    title: '选择城市',
                    oneLevelId: cityId,
                    itemHeight: 0.933333,
                    headerHeight: 1.18,
                    callback: function (selectOneObj) {
                        cityIdDom.value = selectOneObj.id;
                        showCityDom.innerHTML = selectOneObj.value;
                        showCityDom.dataset.id = selectOneObj.id;
                        showCityDom.dataset.value = selectOneObj.value;
                    }
                }
            );
        });
    }

    /**
     * 区域切换
     * @return {[type]} [description]
     */
    function fnInitArea(){

        var showAreaDom = document.querySelector('#showArea');
        var areaIdDom = document.querySelector('#areaId');

        var data = [
            {'id': 'bs', 'value': '宝山区'},
            {'id': 'cn', 'value': '长宁区'},
            {'id': 'fx', 'value': '奉贤区'},
            {'id': 'hk', 'value': '虹口区'},
            {'id': 'hp', 'value': '黄浦区'},
            {'id': 'jd', 'value': '嘉定区'},
            {'id': 'js', 'value': '金山区'},
            {'id': 'ja', 'value': '静安区'},
            {'id': 'mh', 'value': '闵行区'},
            {'id': 'pd', 'value': '浦东新区'},
            {'id': 'pt', 'value': '普陀区'},
            {'id': 'qp', 'value': '青浦区'},
            {'id': 'sj', 'value': '松江区'},
            {'id': 'xh', 'value': '徐汇区'},
            {'id': 'yp', 'value': '杨浦区'},
            {'id': 'zb', 'value': '闸北区'}
        ];

        showAreaDom.addEventListener('click', function () {
            var areaId = showAreaDom.dataset.id;
            var areaName = showAreaDom.dataset.value;

            var areaSelect = new IosSelect(1, 
                [data],
                {
                    title: '选择区域',
                    oneLevelId: areaId,
                    itemHeight: 0.933333,
                    headerHeight: 1.18,
                    callback: function (selectOneObj) {
                        areaIdDom.value = selectOneObj.id;
                        showAreaDom.innerHTML = selectOneObj.value;
                        showAreaDom.dataset.id = selectOneObj.id;
                        showAreaDom.dataset.value = selectOneObj.value;
                    }
                }
            );
        });
    }

})(Zepto, window, document);