$(function () {

    //http://api-breakingnews-web.itheima.net 备用网址
    //去注册
    $('#dengru-ba').on('click', function () {
        $('.dengru-c').show();
        $('.dengru-b').hide();
    })
    //去登陆
    $('#dengru-ca').on('click', function () {
        $('.dengru-c').hide();
        $('.dengru-b').show();
    })
    // 自定义验证规则
    // 获取layui中的layui.form对象
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify()函数自定义验证
    form.verify({
        //自定义了一个叫pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,不能出现空格'],
        // 验证两次输入的密码是否一致
        pwdd: function (rem) {
            // 获取第一个密码框输入的密码
            var psw = $('.dengru-c [name=password]').val();
            if (rem !== psw) return '两次密码不一致'
        },
        yong: [/^([a-zA-Z]|[\u4E00-\u9FA5]){1}([a-zA-Z0-9]|[\u4E00-\u9FA5]|[_]){5,15}$/, '用户名可以由字母、数字、下划线和中文组成，以中文或字母开头，长度为6-16位']
    })
    // 监听注册表单的提交事件
    $('#form-zhu').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('#form-zhu [name=username]').val(), password: $('#form-zhu [name=password]').val(),
        }, function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功')
            $('#dengru-ca').click()
        })
    })
    //登陆事件
    $('#form-left').on('submit', function (e) {
        e.preventDefault()
        $.post('/api/login', $(this).serialize(), function (e) {
            if (e.status !== 0) return layer.msg('登陆失败')
            layer.msg('登陆成功')
            //将登陆成功后的 token 字符串保存到 localStorage中 本地存储 为后面的做准备
            localStorage.setItem('token', e.token)

            //之后跳转到后台主页
            location.href = '../../index.html'
        })
    })
})