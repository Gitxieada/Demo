/*
 $(function(){
// do something
  }); 

其实这个就是jq ready()的简写，他等价于：

  $(document).ready(function(){
//do something
  });

因为$(document).ready(function(){})里面的内容是规定在DOM（网页文档）加载完成之后网页内容加载之前再执行的，
可以理解成html加载完成之后，图片加载之前。
为解决加载顺序造成的错误，把js代码用这个包裹起来：
$(function(){
  //here goes your code
});*/

$(function () {
  'use strict';

  /*选中页面中所有的input[data-rule]*/
  var $inputs = $('[data-rule]')
    , $form = $('#signup')
    , inputs = [];

  $inputs.each(function (index, node) {
    /*解析每一个input的验证规则*/
    var tmp = new Input(node);
    inputs.push(tmp);
  })

  $form.on('submit', function (e) {
    e.preventDefault();
    $inputs.trigger('blur');

    for (var i = 0; i < inputs.length; i++) {
      var item = inputs[i];
      var r = item.validator.is_valid();
      if (!r) {
        alert('invalid');
        return;
      }
    }

    alert('注册成功');
  })

  function signup() {
    // $.post('/api/signup', {...})
  }
});

