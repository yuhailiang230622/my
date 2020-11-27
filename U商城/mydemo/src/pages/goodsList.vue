<template>
  <div>
    <!-- 上策导航 -->
    <van-nav-bar :title="$route.meta.name" left-text="返回" left-arrow @click-left='$router.back()'>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 中部列表 -->
    <van-list>
      <van-card
        @click="goDetail(item.id)"
        v-for="item in goodsList"
        :key="item.id"
        :price="item.market_price.toFixed(2)"
        desc="商品特别好赶紧买买买"
        :title="item.goodsname"
        :thumb="
          item.img
            ? $imgUrl + item.img
            : 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1419931825,2802720710&fm=26&gp=0.jpg'
        "
        origin-price="10.00"
      />
    </van-list>
  </div>
</template>

<script>
import { getGoods } from "../util/axios";
export default {
  data() {
    return {
      goodsList: [],
    };
  },
  mounted() {
    this.getGoodsList();
  },

  methods: {
    getGoodsList() {
      getGoods({
        fid: this.$route.query.id,
      }).then((res) => {
        console.log(res, "哈哈哈");
        if (res.code == 200) {
          this.goodsList = res.list;
        }
      });
    },

    goDetail(id) {
      this.$router.push({
        path: "/goodsDetail",
        query:{
            id
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.van-nav-bar {
  background: #f26b11;
}
</style>
