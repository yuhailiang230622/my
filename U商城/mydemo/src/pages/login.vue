<template>
  <div>
    <van-nav-bar :title="$route.meta.name" left-text="返回" left-arrow @click-left='$router.back()'>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <van-form @submit="login">
      <van-field
        v-model="loginInfo.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="loginInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <div>
        <van-button @click="$router.push('/register')" type="warning" >
          先去注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getLogin } from "../util/axios";
export default {
  data() {
    return {
      loginInfo: {
        phone: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      getLogin(this.loginInfo).then((res) => {
        if (res.code == 200) {
          Toast.success(res.data);
          sessionStorage.setItem("userInfo", JSON.stringify(res.list));
          this.$router.push("/mine");
        } else {
          Toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
