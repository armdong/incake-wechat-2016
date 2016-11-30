/* $oContainer.on("click", '.default-query-widget-submit', function() {
    var self = $(this);
    handle4Submit(self);
 });

 function handle4Submit(ele) {
     var Input = $(ele).siblings('label.default-query-item').children('input.default-query-widget-text');
     Input.attr("id", "oInput1");
     var oVal = Input.val();
     var reg = /^\+?[1-9][0-9]*$/;
     if (!reg.test(oVal)) {
         var d = dialog({
             content: document.getElementById('Tip'),
             quickClose: false, // 点击空白处快速关闭
             skin: 'inputTip'
         });
         d.show(document.getElementById('oInput1'));
         setTimeout(function() {
             d.close().remove();
         }, 3000);
     }
 }
*/