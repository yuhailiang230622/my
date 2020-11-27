<template>
  <div>
    <van-nav-bar :title="$route.meta.name" left-text="返回" left-arrow @click-left='$router.back()'>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <van-tabs v-model="active">
      <van-tab title="推荐">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in bannerList" :key="item.id">
            <img class="img" :src="$imgUrl + item.img" alt="" />
          </van-swipe-item>
        </van-swipe>

        <!-- 限时抢购 -->
        <van-grid>
          <van-grid-item icon="aim" text="限时抢购" />
          <van-grid-item icon="shrink" text="积分商城" />
          <van-grid-item icon="qr-invalid" text="联系我们" />
          <van-grid-item icon="photo-o" text="商品列表"  to='/goodsList'/>
        </van-grid>
        <div>
          <img src="../assets/images/bar.jpg" alt="" class="img_itm" />
        </div>
        <van-tabs v-model="active1">
          <van-tab title="热门推荐">
            <van-card
              v-for="item in newsList"
              :key="item.id"
              num="2"
              :price="item.market_price"
              desc="嘎嘎好你就用吧 用一次爱上一辈子"
              :title="item.goodsname"
              :thumb="
                item.img
                  ? $imgUrl + item.img
                  : '//m.360buyimg.com/n1/s150x150_jfs/t29566/227/1464891645/10350/a5b133e2/5ce20cdcNd9cdd972.jpg!q70.jpg.dpg'
              "
            />
          </van-tab>
          <van-tab title="发现好货">
            <van-card
              v-for="item in hotsList"
              :key="item.id"
              num="1"
              :price="item.market_price"
              desc=" 用一次爱上一辈子"
              :title="item.goodsname"
              :thumb="
                item.img
                  ? $imgUrl + item.img
                  : '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/75300/31/13658/33045/5daeb773Ebbbd91bd/47a1bdf9047ed568.jpg!q70.jpg.dpg'
              "
            />
          </van-tab>
          <van-tab title="只看专场">
            <van-card
              v-for="item in goodsLsit"
              :key="item.id"
              num="2"
              :price="item.market_price"
              desc="嘎嘎好你就用吧 用一次爱上一辈子"
              :title="item.goodsname"
              :thumb="
                item.img
                  ? $imgUrl + item.img
                  : '//m.360buyimg.com/mobilecms/s150x150_jfs/t1/75300/31/13658/33045/5daeb773Ebbbd91bd/47a1bdf9047ed568.jpg!q70.jpg.dpg'
              "
            />
          </van-tab>
          <!-- <van-tab title="只看商品">内容 3</van-tab> -->
        </van-tabs>
      </van-tab>
      <van-tab title="女装"></van-tab>
      <van-tab title="鞋包"></van-tab>
      <van-tab title="居家"></van-tab>
      <van-tab title="母婴儿童"></van-tab>
      <van-tab title="美食"></van-tab>
      <van-tab title="果蔬"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getBanner, getIndexGoods } from "../util/axios";
export default {
  data() {
    return {
      active: "",
      bannerList: [],
      newsList: [],
      hotsList: [],
      goodsLsit: [],
      active1: "",
    };
  },
  mounted() {
    this.getBannerList();
    this.getIndexGoodsList();
  },
  methods: {
    getBannerList() {
      getBanner().then((res) => {
        // console.log(res,'121321');
        if (res.code == 200) {
          this.bannerList = res.list;
        }
      });
    },

    getIndexGoodsList() {
      getIndexGoods().then((res) => {
        console.log(res, "hh");
        (this.newsList = res.list[0].content),
          (this.hotsList = res.list[1].content),
          (this.goodsLsit = res.list[2].content);
      });
    },
  },
};
</script>

<style lang="" scoped>
.img {
  width: 100%;
  height: 3.5rem;
}
.img_itm {
  width: 100%;
  height: 2rem;
}
.van-nav-bar {
  background: #f26b11;
}
</style>


 :thumb="item.img?'//m.360buyimg.com/mobilecms/s150x150_jfs/t1/75300/31/13658/33045/5daeb773Ebbbd91bd/47a1bdf9047ed568.jpg!q70.jpg.dpg':''"