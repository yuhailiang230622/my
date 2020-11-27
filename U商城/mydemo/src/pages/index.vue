<template>
  <div>
    <router-view></router-view>

    <van-tabbar v-model="active" active-color="#f26b11" inactive-color="#000">
      <van-tabbar-item to='/home' icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to='/sort' icon="search">分类</van-tabbar-item>
      <van-tabbar-item to='/cart' icon="friends-o">购物车</van-tabbar-item>
      <van-tabbar-item to='/mine' icon="setting-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:'',
    };
  },
};
</script>

<style lang="" scoped>
.van-nav-bar {
  background: #f26b11;
}
/* .van-tabbar{
 background: #f26b11;
} */
</style>
