/**
 * Desc: list javascript file
 * Author: armdong
 * Date: 2016/10/12
 */

;(function($, window, document){

	$(function(){

		// 发现切换
		fnChangeCategories();

		// 绑定全部蛋糕
		fnBindAll();

		// 绑定口味模块
		fnBindTaste();

		// 口味切换
		fnChangeTaste();
	});

	function fnChangeTaste() {
		var $oSecTaste = $('#secTaste');

		$oSecTaste.on('click', '.nav-item', function(){
			$(this).addClass('active').siblings().removeClass('active');

			
		});
	}

	function fnBindTaste() {
		var $oSecTaste = $('#secTaste'),
			$oTasteList = $oSecTaste.find('.taste-list'),
			$aTasteItem = $oTasteList.find('.taste-item');

		var _data = {
			cheese: {
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
		        }]
			},
			chocolate: {
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
		        }]
			},
			napoleon: {
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
		        }]
			},
			mousse: {
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
		        }]
			},
			milk: {
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
		        }]
			},
			coffee: {
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
		        }]
			},
			fruit: {
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
		        }]
			},
			sugarfree: {
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
		        }]
			}
		};

		// 遍历所有的口味
		$.each($aTasteItem, function(i, item) {
			var $oCurrTaste = $(item),
				tasteType = $oCurrTaste.attr('taste');

			if(!!_data[tasteType]){
				var _html = template('tplList', _data[tasteType]);
				$oCurrTaste.append(_html);
			}
		});
	}

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
        var _html = template('tplList', _data);
        $oContainer.html(_html);
	}

	function fnChangeCategories() {
		var $oListHeader = $('#listHeader'),
			$oListContainer = $('#listContainer');

		$oListHeader.on('click', '.c-item', function(){
			var category = $(this).attr('category');

			$(this).addClass('active').siblings().removeClass('active');

			$oListContainer.find('.sec')
				.filter('.sec[category=' + category + ']')
				.addClass('active')
				.siblings()
				.removeClass('active');
		});
	}

})(Zepto, window, document);