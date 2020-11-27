<template>
  <div>
    <div class="title_1">
      <van-nav-bar :title="$route.meta.name" left-text="" left-arrow @click-left='$router.back()'>
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </div>

    <div class="userInfo" v-if="!userInfo">
      <img class="img" src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" />
      <p class="info">XXX</p>

      <div class="btninfo">
        <van-button @click="$router.push('/login')" type="info"
          >未登录，请登录</van-button
        >
      </div>
    </div>

    <div class="userInfo" v-else>
      <img
        class="img"
        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3720363765,2998178192&fm=26&gp=0.jpg"
        alt=""
      />
      <p class="info">{{ userInfo.nickname }}</p>

      <div class="btninfo">
        <van-button @click="quit" type="info">退出登录</van-button>
      </div>
    </div>
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>

    <div>
      <div class="title_list">
        <p class="solie">
         
          <van-icon name="location-o" size="40" />

          <span class="span1"> 地址管理</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: "",
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
  },

  methods: {
    quit() {
      sessionStorage.removeItem("userInfo");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="" scoped>
/* .title_a{
  background: #cccccc;
} */
.van-nav-bar {
  background: #f26b11;
}
.title_1 {
  width: 100%;
  height: 1rem;
}
.title_2 {
  height: 2rem;
}
.userInfo {
  height: 3rem;
  width: 100%;
  background: #f26b11;

  position: absolute;
  top: 0.7rem;
  /* right: 1.2rem; */
}

.img {
  border-radius: 50%;
  border: 1px solid #cccccc;
  width: 2rem;
  height: 2rem;
  margin-top: 30px;
  margin-left: 10px;
}
.info {
  font-size: 18px;
  color: #f0f0f0;
  position: absolute;
  top: 1.24rem;
  left: 2.48rem;
}
.btninfo {
  float: right;
  margin-bottom: 1rem;
  margin-top: 1rem;
  margin-right: 10px;
}
.btninfo .van-button {
  background: #f0f0f0 !important;
  color: #f26b11 !important;
  border: 1px solid #cccccc !important;
}

.titleInfo {
  color: #f0f0f0 !important;
  width: 100%;
  height: 3rem;
}

.van-nav-bar__title {
  color: #f0f0f0 !important;
}

.title_list {
  background: #f0f0f0;
  position: absolute;
  top: 5.3rem;
  background: brown;
  width: 100%;
  height: 1rem;
  /* margin-top: 5px; */
}
.title_list .solie {
  border-bottom: 2px solid #cccccc;
  background: #ffffff;
}
.title_list .solie .span1 {
  font-size: 18px;

  position: absolute;
  top: 18px;
  left: 47px;
}
.van-grid {
  margin-top: 2.7rem;
}
</style>
