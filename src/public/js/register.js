// const { Script } = require("vm");
window.addEventListener('load', function() {
    var tel = document.querySelector('#tel');
    var email = document.querySelector('#email');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd');
    // 提交按钮
    var over = document.querySelector('#over');
    var cbx = document.querySelector('#cbx');

    var regtel = /^1[3|4|5|7|8]\d{9}$/;
    var regemail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/;
    var regmsg = /^\d{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
    regexp(tel, regtel); // 手机号码
    regexp(email, regemail); // 邮箱
    regexp(nc, regnc); // 昵称
    regexp(msg, regmsg); // 短信验证
    regexp(pwd, regpwd); // 密码框
    // 表单验证的函数
    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                // console.log('正确的');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
            } else {
                // console.log('不正确');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请从新输入 ';
            }
            // 向服务器发送请求
            ajax({
                type: 'get',
                url: 'http://localhost:3000/verifyEmailAdress',
                data: {
                    email: this.value
                },


            });
        }
    }
    surepwd.onblur = function() {
        if (this.value === pwd.value && this.value != '') {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码输入不一致';

        }
    };

    // 提交按钮
    var inp = document.querySelectorAll('.inp');
    cbx.onclick = function() {
        for (var i = 0; i < inp.length; i++) {
            if (cbx.checked === true && inp[i].value != '' && inp[i].nextElementSibling.className != 'error') {
                over.disabled = false;
                over.className = 'over';
            } else {
                over.disabled = true;
                over.className = 'notover';
            }
        }

    };



    // 封装ajax
    function ajax(options) {
        // 默认值
        var defaults = {
                type: 'get',
                url: '',
                async: true,
                data: {},
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function() {},
                error: function() {}
            }
            // 使用用户传递的参数替换默认值参数
        Object.assign(defaults, options);
        // 创建ajax对象
        var xhr = new XMLHttpRequest();
        // 参数拼接变量
        var params = '';
        // 循环参数
        for (var attr in defaults.data) {
            // 参数拼接
            params += attr + '=' + defaults.data[attr] + '&';
            // 去掉参数中最后一个&
            params = params.substr(0, params.length - 1)
        }
        // 如果请求方式为get
        if (defaults.type == 'get') {
            // 将参数拼接在url地址的后面
            defaults.url += '?' + params;
        }

        // 配置ajax请求
        xhr.open(defaults.type, defaults.url, defaults.async);
        // 如果请求方式为post
        if (defaults.type == 'post') {
            // 设置请求头
            xhr.setRequestHeader('Content-Type', defaults.header['Content-Type']);
            // 如果想服务器端传递的参数类型为json
            if (defaults.header['Content-Type'] == 'application/json') {
                // 将json对象转换为json字符串
                xhr.send(JSON.stringify(defaults.data))
            } else {
                // 发送请求
                xhr.send(params);
            }
        } else {
            xhr.send();
        }
        // 请求加载完成
        xhr.onload = function() {
                // 获取服务器端返回数据的类型
                var contentType = xhr.getResponseHeader('content-type');
                // 获取服务器端返回的响应数据
                var responseText = xhr.responseText;
                // 如果服务器端返回的数据是json数据类型
                if (contentType.includes('application/json')) {
                    // 将json字符串转换为json对象
                    responseText = JSON.parse(responseText);
                }
                // 如果请求成功
                if (xhr.status == 200) {
                    // 调用成功回调函数, 并且将服务器端返回的结果传递给成功回调函数
                    defaults.success(responseText, xhr);
                } else {
                    // 调用失败回调函数并且将xhr对象传递给回调函数
                    defaults.error(responseText, xhr);
                }
            }
            // 当网络中断时
        xhr.onerror = function() {
            // 调用失败回调函数并且将xhr对象传递给回调函数
            defaults.error(xhr);
        }
    }
});