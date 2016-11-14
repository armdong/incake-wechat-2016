;(function($, window, document) {

	$(function() {

		// 解决Zepto点透bug
		FastClick.attach(document.body);

		// 初始化地址列表
		fnBindAddress();
	});

	/**
	 * 绑定收获地址
	 * @return {[type]} [description]
	 */
	function fnBindAddress() {
		var $oAddressList = $('#addressList');

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
			}]
		};
		var _html = template('tplAddressList', _data);
        $oAddressList.html(_html);
	}

})(Zepto, window, document);