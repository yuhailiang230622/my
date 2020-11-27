<template>
  <div>
    <!-- <h1>主页 一级路由</h1> -->
    <el-container>
      <el-header>
        易购商城管理
        <div class="userInfo">
          Welcome
          {{ getUserInfo.username }}
          <el-button @click="logout" type="danger" size="small">
            退出

          </el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 导航菜单 -->
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import vNav from "../components/nav";
export default {
  data() {
    return {};
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  },

  components: {
    vNav,
  },

  methods:{
    ...mapActions(['changeUserInfoAction']),

    logout(){
      this.changeUserInfoAction(null)
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background: #4F4F4F;
  font-size: 25px;
  color: #f0f0f0;
  // text-align: center;
  line-height: 60px;
}

.userInfo{
  float right
}
</style>
