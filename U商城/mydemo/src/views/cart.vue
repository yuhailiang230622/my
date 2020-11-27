<template>
  <div>
    <van-nav-bar
      :title="$route.meta.name"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <div v-if="cartList">
      <div class="cartInfo"  v-for="item in cartList" :key="item.id">
        <van-checkbox v-model="checked"  class="checkb"></van-checkbox>
        <van-swipe-cell>
          <van-card
            :num="item.num"
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            class="goods-card"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2075359129,4290660478&fm=26&gp=0.jpg'
            "
          />
          <!-- <van-stepper v-model="value" /> -->
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="del(item.id)"
            />
          </template>
        </van-swipe-cell>
      </div>
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <van-checkbox  v-model="checked">全选</van-checkbox>
       
      </van-submit-bar>
    </div>

    <div v-else-if="(userInfo) => 0">
      <van-empty description="购物车啥都没有，快去买呀" />
    </div>

    <div v-else>
      <van-empty description="描述文字">
        <van-button round type="danger" @click="$router.push('/login')">
          您还没有登录，请登录
        </van-button>
      </van-empty>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getCartList, getCartDelete } from "../util/axios";
export default {
  data() {
    return {
      value: "",
      cartList: [],
      userInfo: "",
      checked:[],
      // checkb:false
    };
  },

  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
    this.cartListInfo();
  },
  methods: {
    cartListInfo() {
      getCartList({
        uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
      }).then((res) => {
        console.log(res, "hhhhhhhhh");
        if (res.code == 200) {
          this.cartList = res.list;
        }
      });
    },
    // checked(){

    // },
    
    onSubmit() {},
    del(id) {
      getCartDelete({ id }).then((res) => {
        if (res.code == 200) {
          getCartList({
            uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
          }).then((res) => {
            console.log(res, "hhhhhhhhh");
            if (res.code == 200) {
              this.cartList = res.list;
            }
          });
          Toast.success(res.mag);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>

.checkb{
float: left;
margin-top: 40px;
}
van-swipe-cell{
 float: right;
}
.van-stepper {
  position: absolute;
  right: 10px;
  top: 1.4rem;
}
.van-nav-bar {
  background: #f26b11;
}

.van-submit-bar {
  bottom: 53px !important;
}
</style>
