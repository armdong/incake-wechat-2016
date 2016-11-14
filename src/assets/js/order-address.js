;(function($, window, document) {

	$(function() {

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		// 初始化地址列表
		fnInitAddress();
	});

	/**
	 * 绑定收获地址
	 * @return {[type]} [description]
	 */
	function fnInitAddress() {
		var $oAddressList = $('#addressList'),
			$oNewAddress = $('#newAddress'),
			$oAddressWrapper = $oAddressList.parent('.address-wrapper'),
			tl = new TimelineLite();

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
					street: '广中西路777弄99号506室'
				}
			}]
		};
		var _html = template('tplAddressList', _data);
        $oAddressList.html(_html);

        // 收货地址切换
        $oAddressList.on('tap', '.btn-radio', function() {
        	$(this).addClass('selected')
        		.parent().siblings()
        		.children('.btn-radio')
        		.removeClass('selected');
        });

        // 新增收货地址
        $oAddressList.on('tap', '.btn-new', function() {        	
        	tl.clear();
        	tl.to($oAddressWrapper, 0.5, {
        		x: '-50%'
        	});
        });

        // 编辑收货地址
        $oAddressList.on('tap', '.btn-edit', function() {
        	tl.clear();
        	tl.to($oAddressWrapper, 0.5, {
        		x: '-50%'
        	});
        });

        // 保存新增/编辑地址
        $oNewAddress.on('tap', '.btn-save', function() {
        	tl.clear();
        	tl.to($oAddressWrapper, 0.5, {
        		x: '0%'
        	});
        });
	}

})(Zepto, window, document);