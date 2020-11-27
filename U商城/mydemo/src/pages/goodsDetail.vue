<template>
  <div>
    <van-nav-bar :title="$route.meta.name" left-text="返回" left-arrow @click-left='$router.back()'>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <!-- 照片 -->
    <div>
      <img
        class="img"
        :src="
          goodsInfo.img
            ? $imgUrl + goodsInfo.img
            : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605795617471&di=3c8b633832c86adc65c23490b8ec96ad&imgtype=0&src=http%3A%2F%2Fspider.nosdn.127.net%2F9c841bfe69f85fa3a39b3cc09b4601f3.jpeg'
        "
        alt=""
      />
      <!-- 巴拉巴拉什么一堆字 -->
      <p class="titleL">
        {{ goodsInfo.goodsname }}
      </p>
      <!-- 价格 -->
      <p class="mani">￥{{ goodsInfo.market_price }}</p>
      <div class="banT2">
        <!-- 促销--- -->
        <p class="Promotion">促销:{{ goodsInfo.specsattr }}</p>
        <p class="spa"><span>购买数量:</span><van-stepper v-model="value" /></p>
        <p class="svg">
          商品属性:
          <span class="svg_son">
            规格：
            <van-button size="small" type="danger">30G</van-button>
            <van-button size="small" type="default">5G</van-button>
          </span>
        </p>
      </div>
      <div>
        <h2 class="h2">商品详情</h2>
        <p v-html="goodsInfo.description"></p>
        <!-- <img :src="goodsInfo.img?$imgUrl+goodsInfo.img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605803366507&di=d94ddbf89fc63036e1e3d7ff5167c27e&imgtype=0&src=http%3A%2F%2Fwww.dzwww.com%2Fnvxing%2Ftt%2F201403%2FW020140313413755513446.jpg'" alt=""> -->
      </div>

      <div class="title_thr">
        <h3 class="h2">商品评价啊大大大是</h3>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
        <!-- <van-goods-action-icon icon="shop-o" text="店铺" badge="12" /> -->
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="goCart"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { getIndexGoods, getCartAdd, getGoodsInfo } from "../util/axios";
import {Toast} from 'vant'
export default {
  data() {
    return {
      goodsInfo: [],
      value: 1,
      specsAttr: [],
    };
  },
  mounted() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      getGoodsInfo({
        id: this.$route.query.id,
      }).then((res) => {
        console.log(res, "nisheia");
        if (res.code == 200) {
          this.goodsInfo = res.list[0];
        }
      });
    },

    goCart() {
      if (sessionStorage.getItem("userInfo")) {
        getCartAdd({
          uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
          goodsid: this.goodsInfo.id,
          num: this.value,
        }).then(res=>{
          Toast.success(res.msg)
          this.$router.push({
            path:'/cart',
            query:{
              id:JSON.parse(sessionStorage.getItem('userInfo')).uid
            }
          })
        })
      }else{
        Toast.fail('当前没有登录，请先登录')
        this.$router.push('/login')
      }
    },
  },
};
</script>

<style lang="" scoped>
.title_thr {
  width: 100%;
  height: 4rem;
}
.van-nav-bar {
  background: #f26b11;
}
.titleL {
  font-size: 20px;
}
.spa span {
  font-size: 22px;
}
.van-stepper {
  float: right;
  margin-top: 25px;
}
.Promotion {
  font-size: 23px;
}
.img {
  width: 100%;
  height: 3.5rem;
}
.mani {
  font-size: 20px;
}
.svg {
  font-size: 20px;
}
.svg_son {
  display: block;
}
.h2 {
  font-size: 25px;
}
</style>
