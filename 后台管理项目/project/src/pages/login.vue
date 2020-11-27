<template>
  <div class="login">
    <div class="logax">
      <h3>用技术</h3>
      <p class="con">让复杂的数据变得更清晰</p>
      <!-- <img src="../assets/images/1.jpg" alt=""> -->
      <!-- <h1>易购后台管理</h1> -->
    </div>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="loginForm"
    >
      <el-form-item label="">
        <p class="title_one">欢迎登录</p>
      </el-form-item>
      <el-form-item label="用户名" prop="username" class="label">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="login('loginForm')" class="btn" cantar>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getUserLogin} from '../util/axios'
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blue",
          },
          {
            min: 2,
            max: 15,
            message: "长度在2到15个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 18,
            message: "长度6到18个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserLogin(this.loginForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
                this.changeUserInfoAction(res.data.list)
              //跳转
              this.$router.push("/home");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

// h1{
//   position:absolute
//   left -100px
//   top -300px
//   font-size :38px
  

// }
.login {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/images/reg_bg_min.jpg');
.label{
  font-size 20px
}
  .loginForm {
    position: absolute;
    left: 50%;
    top: 30%;
    margin: -100px 0 0 200px;
    width: 370px;
    height: 320px;
    padding: 35px 10px;
    background: #EFF2FB;
    background: rgba(255, 255, 255, 0.3);
    // border 1px solid #cccccc
    border-radius: 6%;
  }
}



.el-form-item .title_one {
  font-size: 24px;
  margin-left 60px
}

.logax {
  position: fixed;
  left: 195px;
  top: 314px;
  color: #fff;
}

.logax h3 {
  font-size: 54px;
  letter-spacing: 0;
  font-weight: 700;
  margin-bottom: 10px;
}

.logax .con {
  font-size: 32px;
  letter-spacing: 3.81px;
  font-weight: 300;
}
</style>
