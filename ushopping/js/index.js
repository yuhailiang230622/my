

//入口
let init = () => {
    getPopularityRequest()
    getbannerRequest()
    getHomeRequest()
    getloveRequest()
    gethotRequest()
    getfirstRequest()

}
//人气好货的渲染
let getPopularityRequest = () => {
    $.ajax({
        type: "get",
        url: "http://www.ujiuye.tech:3000/api/popularity",
        success: function (response) {
            // console.log(response)
            let {
                result: {
                    data
                }
            } = response;
            // console.log(data)
            let str = '';
            data.forEach(function (item) {
                str += `<li class="fl zihe">
                <div class="img5">
                <img src=${item.image_url} alt=""></div>
                <p class="neirong1">${item.goods_name}</p>
                 <span>${item.evalNum}</span>
            </li>`
            })
            $('#popularity').html(str)
        }
    });
}



//轮播图--
let getbannerRequest = () => {
    $.ajax({
        type: "get",
        url: "http://www.ujiuye.tech:3000/api/banner",
        success: function (response) {
            // console.log(response)
            let {
                result: {
                    data
                }
            } = response;
            // console.log(data)
            let str = '';
            data.forEach(function (item) {
                str += `<li><a href="#">
                <img src="${item.coverimg}" alt=""></a></li>`
            })
            $('#banner').html(str)


            //------------------------

            var banner = document.querySelector('.banner')

            var leftbtn = banner.querySelector('.leftbtn')
            var rightbtn = banner.querySelector('.rightbtn')
            var pageSpan = banner.querySelectorAll('.page span')
            var ul = banner.querySelector('.bann_cont')
            var li = ul.querySelectorAll('li');
            var img = ul.querySelectorAll('img')

            // console.log(pageSpan);
            var imgW = img[0].clientWidth;//一个图的宽


            // console.log(rightbtn);
            var len = li.length;//图的个数
            var clientW = document.documentElement.clientWidth;//可视区的宽

            // console.log(len);
            var timer = null;//定时器
            var count = 0;//计时器

            for (var i = 0; i < len; i++) {
                li[i].style.width = clientW + 'px';
                img[i].style.left = ((clientW - imgW) - 165) + 'px';
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
                // console.log(leftbtn);
                count--;
                if (count < 0) {
                    count = len - 1

                }
                change()
            }
            //下一章
            rightbtn.onclick = auto;
            // console.log(rightbtn);

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



            //-------------------------
        }
    });
}

//各大版块

let getHomeRequest = () => {
    $.ajax({
        type: 'get',
        url: 'http://www.ujiuye.tech:3000/api/home',
        success(res) {
            let { result } = res;
            // console.log(result);
            let html = template('homeTemp', result);
            $('#home').html(html)
        }
    })
}

//猜你喜欢

let getloveRequest = () => {
    $.ajax({
        type: 'get',
        url: 'http://www.ujiuye.tech:3000/api/love',

        success(res) {
            let { result } = res;
            // console.log(result);
            let html = template('loveTemp', result);
            $('#love').html(html)


        }
    })

}


//热词搜索
let gethotRequest = () => {
    $.ajax({
        type: 'get',
        url: 'http://www.ujiuye.tech:3000/api/hot',
        success(res) {
            let { result } = res;
            // console.log(result);

            let html = template('hotTemp', result);
            $('#hot').html(html)
        }
    })
}


// 轮播图商品分类

let getfirstRequest = () => {
    $.ajax({
        type: "get",
        url: 'http://www.ujiuye.tech:3000/api/category/first',
        success(res) {
            let { result } = res;
            // console.log(result);
            let html = template('firstTemp', result);
            $('#first').html(html)
        }


    })
}

//排行榜---------------
let getrankingRequest = () => {
    $.ajax({
        type: 'get',
        url: 'http://www.ujiuye.tech:3000/api/ranking',
        success(res) {
            let { result } = res;
            console.log(result);
        }
    })
}

init()

