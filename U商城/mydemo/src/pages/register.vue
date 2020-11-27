<template>
  <div>
    <van-nav-bar :title="$route.meta.name" left-text="返回" left-arrow @click-left='$router.back()'>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-form @submit="register">
      <van-field
        v-model="regInfo.phone"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="regInfo.nickname"
        name="昵称"
        label="昵称"
        placeholder="请输入昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="regInfo.password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getRegister } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      regInfo: {
        nickname: "",
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      getRegister(this.regInfo)
      .then(res => {
        console.log(res,'00000');
        if(res.code==200){
            // console.log(res);
            Toast.success(res.msg)
            this.$router.push('/login')
        }else{
            Toast.fail(res.msg)
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
</style>
