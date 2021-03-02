window.addEventListener("load", function() {
    var navbar_brand = document.getElementById('navbar-brand');
    var navbar_toggle = document.querySelector('.navbar-toggle');
    var navbar_nav = document.getElementById('navbar-nav');
    var dropdown = navbar_nav.querySelectorAll('.dropdown');
    var dropdown_toggle = document.querySelectorAll('.dropdown-toggle');
    var hover_effect = document.querySelector('.hover-effect');
    var hover_voerlay = document.querySelectorAll('.hover-voerlay');
    var fixedtools = document.querySelector('.fixedtools');
    document.addEventListener("click", function() {
        console.log(window.sessionStorage);
        if (window.sessionStorage.length == 0) {
            alert("请登录后再操作!");
            window.location.href = "login.html";
        }
    });
    // 用户刷新页面返回顶部
    window.addEventListener('beforeunload', function() {
        document.documentElement.scrollTop = 0; //ie下
        document.body.scrollTop = 0; //非ie
    });
    // 标题点击刷新页面
    navbar_brand.addEventListener('click', function() {
        location.reload();
    });
    // 点击侧边导航栏跳转到指定位置
    window.addEventListener('scroll', function() {
        var rollDistance = document.documentElement.scrollTop;
        if (rollDistance >= 100) {
            fixedtools.style.display = 'block';
        } else {
            fixedtools.style.display = 'none';
        }
        fixedtools.addEventListener('click', function() {
            window.scrollTo(0, 0);
        });
    });
    // 导航条经过显示当前li的ul
    for (var i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener('mouseover', function() {
            for (var i = 0; i < dropdown.length; i++) {
                dropdown[i].children[1].style.display = 'none';
            }
            this.children[1].style.display = 'block';
        });
        dropdown[i].addEventListener('mouseout', function() {
            for (var i = 0; i < dropdown.length; i++) {
                dropdown[i].children[1].style.display = 'none';
            }
        });
    }
    // 鼠标经过阴影层图片缩小放大
    for (var i = 0; i < hover_voerlay.length; i++) {
        hover_voerlay[i].parentNode.addEventListener('mouseover', function() {
            this.children[0].children[0].classList.add('img-hover-effects');
            this.children[1].style.display = 'none';
            this.children[2].style.display = 'block';

        });
        hover_voerlay[i].parentNode.addEventListener('mouseout', function() {
            this.children[0].children[0].classList.remove('img-hover-effects');
            this.children[1].style.display = 'block';
            this.children[2].style.display = 'none';
        })
    }
})