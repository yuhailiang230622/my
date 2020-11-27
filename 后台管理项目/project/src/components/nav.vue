<template>
  <div>
    <el-menu
      default-active="defaultAction"
      class="el-menu-vertical-demo"
      background-color="#585858"
      text-color="#fff"
      active-text-color="#FF8000"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-grid"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu :index="item.id.toString()" v-for="item in getUserInfo.menus" :key="item.id">

        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>

        <el-menu-item :index="menu.url" v-for="menu in item.children" :key="menu.id">
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>

       
      </el-submenu>
      
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      defaultAction: "/home",
    };
  },
  mounted() {
    //  console.log(this.$route,'s路又远');
    this.defaultAction = this.$route.path;
    // this.getMenuList()
  },
  computed: {
    // ...mapGetters({
    //  menuList:'menu/getMenuList'
    // })
    ...mapGetters(['getUserInfo'])
  },

  // methods:{
  //   ...mapActions({
  //     getMenuList:'menu/getMenuListAction'
  //   })
  // }
};
</script>

<style lang="stylus" scoped>
.el-menu {
  height: 90vh;
}
</style>
