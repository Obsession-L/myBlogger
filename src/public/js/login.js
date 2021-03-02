window.addEventListener('load', function() {
    var login_top = document.getElementById('login_top'); //登录部分顶部模块
    var login_bottom = document.querySelectorAll(".login-bottom"); //登录部分底部模块
    var account = document.getElementById("account"); //账号输入框
    var password = document.getElementById("password"); //密码输入框
    var phoneNumber = document.getElementById('phoneNumber'); //手机号输入框
    var authCode = document.getElementById('authCode'); //验证码输入框
    var phoneReminder = document.getElementById('phoneReminder'); //手机登录提示信息
    var phoneEnter = document.getElementById('phoneEnter'); //手机短信登录按钮
    var enter = document.getElementById('enter'); //账号登录按钮
    var reminder = document.getElementById('reminder'); //账号登录部分没填写完整提示信息
    var phoneLogin = document.getElementById('phoneLogin'); //手机短信登录/注册

    // 正则表达式
    var accountRegexp = /^[a-zA-Z][a-zA-Z0-9_]{1,15}$/; //账号正则
    var emailRegexp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮箱正则
    var phoneRegexp = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/; //手机号正则
    var passwordRegexp = /^[a-zA-Z0-9_.]\w{5,17}$/; //密码正则
    var authCodeRegexp = /^[0-9]{6}$/; //验证码正则
    // 用户刷新页面返回顶部
    window.addEventListener('beforeunload', function() {
        document.documentElement.scrollTop = 0; //ie下
        document.body.scrollTop = 0; //非ie
        for (var i = 0; i < login_bottom.length; i++) {
            login_bottom[i].classList.add("login-bottoms");
            login_bottom[0].classList.remove("login-bottoms");
        };
    });
    for (var i = 0; i < login_bottom.length; i++) {
        login_bottom[i].classList.add("login-bottoms");
        login_bottom[0].classList.remove("login-bottoms");
    };
    // 点击账号登录部分
    login_top.children[0].addEventListener('click', function() {
        this.style.textDecoration = "none";
        this.classList.add("current");
        this.nextElementSibling.nextElementSibling.classList.remove("current");
        for (var i = 0; i < login_bottom.length; i++) {
            login_bottom[i].classList.add("login-bottoms");
            login_bottom[0].classList.remove("login-bottoms");
        };
    });
    // 点击扫码登录部分
    login_top.children[2].addEventListener('click', function() {
        this.classList.add("current");
        this.previousElementSibling.previousElementSibling.classList.remove("current");
        this.style.textDecoration = "none";
        for (var i = 0; i < login_bottom.length; i++) {
            login_bottom[i].classList.add("login-bottoms");
            login_bottom[1].classList.remove("login-bottoms");
        };
    });
    // 点击手机验证码登录部分
    phoneLogin.addEventListener('click', function() {
        for (var i = 0; i < login_bottom.length; i++) {
            login_bottom[i].classList.add("login-bottoms");
            login_bottom[2].classList.remove("login-bottoms");
        };
        phoneEnter.addEventListener("click", function() {
            if (phoneRegexp.test(phoneNumber.value) && authCodeRegexp.test(authCode.value)) {
                window.location.href = 'index.html';
            } else {
                phoneReminder.innerHTML = '请输入正确的手机号和验证码';
            }
            if (phoneNumber.value.trim() == "") {
                phoneReminder.innerHTML = '请输入手机号';
            } else if (authCode.value.trim() == "") {
                phoneReminder.innerHTML = '您还没有输入验证码';
            }
            if (account.value != "" && password.value != "") {
                window.location.href = 'index.html';
            }
        });
    });
    // 点击登录按钮 对账号密码没填写做出提示
    enter.addEventListener("click", function() {
        if (phoneRegexp.test(account.value) && password.value != "") {
            window.location.href = 'index.html';
        } else if (accountRegexp.test(account.value) && password.value != "") {
            window.location.href = 'index.html';
        } else if (emailRegexp.test(account.value) && password.value != "") {
            window.location.href = 'index.html';
        } else {
            reminder.innerHTML = '请输入合法账号或密码';
        }
        if (account.value.trim() == "") {
            reminder.innerHTML = '请输入账号';
            account.value = '';
        } else if (password.value.trim() == "") {
            reminder.innerHTML = '请输入密码';
            password.value = '';
        }
        // 1.创建ajax对象
        var xhr = new XMLHttpRequest();
        // 获取用户在文本框输入的值
        var accountValue = account.value;
        var passwordValue = password.value;
        var params = 'account=' + accountValue + '&password=' + passwordValue;
        console.log(xhr);

        // 2.告诉ajax对象要向哪里发送请求
        xhr.open('post', 'http://localhost:3000/post');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // 当ajax状态码发生变化的时候出发
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // window.location.href = 'index.html';
                window.sessionStorage.setItem('token', res.data.token);
                console.log(window.sessionStorage);
            }
        }
        xhr.send(params);

        xhr.onload = function() {
            console.log(xhr.responseText);
            //   var firstText = JSON.parse(xhr.responseText);
            //   console.log(firstText);
            window.sessionStorage.setItem(accountValue, passwordValue);
            window.location.href = "index.html";
        }
    });
});