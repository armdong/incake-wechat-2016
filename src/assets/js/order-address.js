;
(function($, window, document) {

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

    // textarea auto-expand
    fnAutoExpand();
  });

  function fnAutoExpand() {
    // Applied globally on all textareas with the "auto-expand" class
    $(document).one('focus.auto-expand', 'textarea.auto-expand', function() {
      var savedValue = this.value;
      this.value = '';
      this.baseScrollHeight = this.scrollHeight;
      this.value = savedValue;
    }).on('input.auto-expand', 'textarea.auto-expand', function() {
      var minRows = this.getAttribute('data-min-rows') | 0,
        rows;
      this.rows = minRows;
      rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 40);
      this.rows = minRows + rows;
    });
  }

  /**
	 * 绑定收获地址
	 * @return {[type]} [description]
	 */
  function fnInitAddress() {
    var $oAddressList = $('#addressList'),
      $oAddressWrapper = $oAddressList.parent('.address-wrapper'),
      $oNewAddress = $('#newAddress'),
      $oTitle = $oNewAddress.find('.header').children('.title'),
      $oName = $oNewAddress.find('.txt-name'),
      $oMobile = $oNewAddress.find('.txt-mobile'),
      $oCity = $oNewAddress.find('.txt-city'),
      $oArea = $oNewAddress.find('.txt-area'),
      $oStreet = $oNewAddress.find('.txt-street'),
      $oDetail = $oNewAddress.find('.txt-detail'),
      $oDetailForm = $oNewAddress.find('.detail-form'),
      tl = new TimelineLite();

    // 高德地图
    var map = new AMap.Map('mapContainer', {
      resizeEnable: true,
      zoom: 11
    });
    AMap.plugin('AMap.ToolBar', function() {
      var toolbar = new AMap.ToolBar();
      map.addControl(toolbar)
    });
    var placeSearch = null;
    AMap.service(["AMap.PlaceSearch"], function() {
      placeSearch = new AMap.PlaceSearch({ //构造地点查询类
        pageSize: 5,
        pageIndex: 1,
        map: map,
        panel: "mapPanel"
      });
      //关键字查询
      // placeSearch.search('广中西路777弄');
    });

    var cityName = '';

    // 绑定数据
    var _data = {
      hasAddress: true, // 地址列表是否有数据
      list: [
        {
          isSelected: true, // 是否选中
          info: {
            name: '张三',
            mobile: '13322222222'
          },
          addr: {
            city: '上海市',
            area: '静安区',
            street: '广中西路777弄99号506室',
            detail: '上海印克电子商务股份有限公司'
          }
        }, {
          info: {
            name: '王卯东',
            mobile: '18502194699'
          },
          addr: {
            city: '上海市',
            area: '普陀区',
            street: '桃浦路1023弄',
            detail: '2幢5号404室'
          }
        }, {
          isDisabled: true, // 是否禁用
          info: {
            name: '张三',
            mobile: '13322222222'
          },
          addr: {
            city: '上海市',
            area: '静安区',
            street: '广中西路777弄99号506室',
            detail: '上海印克电子商务股份有限公司'
          }
        }
      ]
    };
    var _html = template('tplAddressList', _data);
    $oAddressList.html(_html);

    // 新增收货地址 事件处理函数
    $oAddressList.on('tap', '.btn-new', function() {

      // 隐藏删除按钮
      $oNewAddress.find('.btn-del').hide();
      $oTitle.text('新增收货地址');

      tl.clear();
      tl.to($oAddressWrapper, 0.5, {
        x: '-50%',
        onStart: handler4EmptyFormData
      });
    });

    // 编辑收货地址 事件处理函数
    $oAddressList.on('tap', '.btn-edit', function() {

      // 显示删除按钮
      $oNewAddress.find('.btn-del').show().css('display', 'block');
      $oTitle.text('编辑收货地址');

      var $oText = $(this).prev('.text');
      var opt = {
        name: $oText.find('.name').text(),
        mobile: $oText.find('.mobile').text(),
        city: $oText.find('.city').text(),
        area: $oText.find('.area').text(),
        street: $oText.find('.street').text(),
        detail: $oText.find('.detail').text()
      };

      // 绑定数据
      handler4BindFormData(opt);

      tl.clear();
      tl.to($oAddressWrapper, 0.5, {x: '-50%'});
    });

    // 返回列表
    $oNewAddress.children('.header').on('tap', '.btn-back', function() {
      tl.clear();
      tl.to($oAddressWrapper, 0.5, {x: '0%'});
    });

    // 选择详细地址 智能定位
    $oStreet.on('tap', function() {
      cityName = $oCity.attr('data-value');

      var addr = $(this).html().trim() == '街道/小区/写字楼' ? '' : $(this).html().trim();

      tl.clear();
      tl.to($oDetailForm, 0.5, {
        y: '0%',
        onStart: function() {
          $('#txtSearch').val(addr);
          $('#mapPanel').empty();
          map.setCity(cityName);
          placeSearch.setCity(cityName);
          if(addr !== '') {
            placeSearch.search(addr);
          }
        }
      });
    });

    // 选中地图地址
    $oDetailForm.on('tap', '.poibox', function(e) {
      var addr = $(this).find('.poi-addr').html().substr(3);

      $oStreet.html(addr);
      tl.clear();
      tl.to($oDetailForm, 0.5, {y: '100%'});
    });

    /**
     * ========================
     * 高德地图联想
     * ========================
     */

    // 搜索框文本改变事件
    $('#txtSearch').bind('input propertychange', function() {
      var keywords = $(this).val();
      if (keywords === '') {
        $(this).next('.btn-clear').css('display', 'none');
        $('#mapPanel').empty();
        // placeSearch.search('');
        return false;
      } else {
        $(this).next('.btn-clear').css('display', 'block');
      }
      cb4PlaceSearch(keywords);
    });

    function cb4PlaceSearch(keywords) {
      placeSearch.search(keywords);
    }

    // 关闭定位
    $oDetailForm.children('.header').on('tap', '.btn-back', function() {
      tl.clear();
      tl.to($oDetailForm, 0.5, {y: '100%'});
    });

    // 清空搜索条件
    $oDetailForm.on('tap', '.btn-clear', function() {
      $(this).prev('.txt-search').val('');
      $(this).css('display', 'none');
      $('#mapPanel').empty();
      // placeSearch.search('');
    });

    // 清空form
    function handler4EmptyFormData() {
      $oName.val('');
      $oMobile.val('');
      $oCity.text('请选择').attr('data-id', '').attr('data-value', '');
      $('#cityId').attr('id', '').attr('value', '');
      $oArea.text('请选择').attr('data-id', '').attr('data-value', '');
      $('#areaId').attr('id', '').attr('value', '');
      $oStreet.text('街道/小区/写字楼');
      $oDetail.text('');
    }

    // 绑定form
    function handler4BindFormData(data) {
      $oName.val(data.name);
      $oMobile.val(data.mobile);
      $oCity.text(data.city);
      $oArea.text(data.area);
      $oStreet.text(data.street);
      $oDetail.text(data.detail);
    }
  }

  /**
     * 城市切换
     * @return {[type]} [description]
     */
  function fnInitCity() {

    var showCityDom = document.querySelector('#showCity');
    var cityIdDom = document.querySelector('#cityId');

    var data = [
      {
        'id': '021',
        'value': '上海市'
      }, {
        'id': '0591',
        'value': '福州市'
      }, {
        'id': '0512',
        'value': '苏州市'
      }, {
        'id': '0999',
        'value': '昆山市'
      }, {
        'id': '0592',
        'value': '厦门市'
      }, {
        'id': '214000',
        'value': '无锡市'
      }, {
        'id': '010',
        'value': '北京市'
      }, {
        'id': '025',
        'value': '南京市'
      }, {
        'id': '0571',
        'value': '杭州市'
      }
    ];

    showCityDom.addEventListener('click', function() {
      var cityId = showCityDom.dataset.id;
      var cityName = showCityDom.dataset.value;

      var citySelect = new IosSelect(1, [data], {
        title: '选择城市',
        oneLevelId: cityId,
        itemHeight: 0.933333,
        headerHeight: 1.18,
        callback: function(selectOneObj) {
          cityIdDom.value = selectOneObj.id;
          showCityDom.innerHTML = selectOneObj.value;
          showCityDom.dataset.id = selectOneObj.id;
          showCityDom.dataset.value = selectOneObj.value;
        }
      });
    });
  }

  /**
     * 区域切换
     * @return {[type]} [description]
     */
  function fnInitArea() {

    var showAreaDom = document.querySelector('#showArea');
    var areaIdDom = document.querySelector('#areaId');

    var data = [
      {
        'id': 'bs',
        'value': '宝山区'
      }, {
        'id': 'cn',
        'value': '长宁区'
      }, {
        'id': 'fx',
        'value': '奉贤区'
      }, {
        'id': 'hk',
        'value': '虹口区'
      }, {
        'id': 'hp',
        'value': '黄浦区'
      }, {
        'id': 'jd',
        'value': '嘉定区'
      }, {
        'id': 'js',
        'value': '金山区'
      }, {
        'id': 'ja',
        'value': '静安区'
      }, {
        'id': 'mh',
        'value': '闵行区'
      }, {
        'id': 'pd',
        'value': '浦东新区'
      }, {
        'id': 'pt',
        'value': '普陀区'
      }, {
        'id': 'qp',
        'value': '青浦区'
      }, {
        'id': 'sj',
        'value': '松江区'
      }, {
        'id': 'xh',
        'value': '徐汇区'
      }, {
        'id': 'yp',
        'value': '杨浦区'
      }, {
        'id': 'zb',
        'value': '闸北区'
      }
    ];

    showAreaDom.addEventListener('click', function() {
      var areaId = showAreaDom.dataset.id;
      var areaName = showAreaDom.dataset.value;

      var areaSelect = new IosSelect(1, [data], {
        title: '选择区域',
        oneLevelId: areaId,
        itemHeight: 0.933333,
        headerHeight: 1.18,
        callback: function(selectOneObj) {
          areaIdDom.value = selectOneObj.id;
          showAreaDom.innerHTML = selectOneObj.value;
          showAreaDom.dataset.id = selectOneObj.id;
          showAreaDom.dataset.value = selectOneObj.value;
        }
      });
    });
  }

})(Zepto, window, document);
