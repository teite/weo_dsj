//注意：每次调用$.get() 或$.post()或$.ajax()的时候都会调用 ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //options.url 可以拿到请求头
    //console.log(options.url);
    //发起ajax请求之前 统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})