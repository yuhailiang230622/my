U.addLoad(function () {
    var banner = document.querySelector('.banner')
   
    var leftbtn = banner.querySelector('.leftbtn')
    var rightbtn = banner.querySelector('.rightbtn')
    var pageSpan = banner.querySelectorAll('.page span')
    var ul = banner.querySelector('.bann_cont')
    var li = ul.querySelectorAll('li');
    var img = ul.querySelectorAll('img')

    // console.log(pageSpan);
    var imgW = img[0].clientWidth;//一个图的宽
    var len = li.length;//图的个数
    var clientW = document.documentElement.clientWidth;//可视区的宽

    // console.log(len);
    var timer = null;//定时器
    var count = 0;//计时器

    for (var i = 0; i < len; i++) {
        li[i].style.width = clientW + 'px';
        img[i].style.left = (clientW - imgW) / 2 + 'px';
    }

    ul.style.width = len * clientW + 'px';


    //一打开就执行
    timer = setInterval(auto, 2000);

    banner.onmouseover = function () {
        clearInterval(timer);
    }
    //滑离开启
    banner.onmouseout = function () {
        timer = setInterval(auto, 2000);
    }
    //上一张
    leftbtn.onclick = function () {
        count--;
        if (count < 0) {
            count = len - 1
        }
        change()
    }
    //下一章
    rightbtn.onclick = auto;

    for (var i = 0; i < len; i++) {
        pageSpan[i].index = i;
        pageSpan[i].onmouseover = function () {
            count = this.index;
            change();
        }
    }



    function auto() {
        count++;
        if (count >= len) {
            count = 0;
        }
        change();
    }

    function change() {
        U.move(ul, { left: -count * clientW });
        for (var s = 0; s < len; s++) {
            pageSpan[s].className = '';
        }
        pageSpan[count].className = 'active'
    }
})