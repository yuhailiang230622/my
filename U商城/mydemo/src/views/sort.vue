<template>
  <div>
    <van-nav-bar :title="$route.meta.name" left-text="返回" left-arrow @click-left='$router.back()'>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <!-- 一级分类 -->
    <div class="cateInf">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in firstList"
          :key="item.id"
          :title="item.catename"
        />
      </van-sidebar>

      <!-- 二级分类 -->

      <van-grid :border="false" :column-num="3">
        <van-grid-item
          :to="'/goodsList?id=' + item.id"
          v-for="item in secondList"
          :key="item.id"
        >
          <van-image
            :src="
              item.img
                ? $imgUrl + item.img
                : '//img10.360buyimg.com/mobilecms/s372x372_jfs/t1/118427/14/14921/144544/5f3649b1E9be1a98c/f459d534c27a002e.jpg!q70.dpg.webp'
            "
          />
          <span class="title">
            {{ item.catename }}
          </span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getCartTree } from "../util/axios";
export default {
  data() {
    return {
      //   onChange: "",
      activeKey: 0,
      firstList: [],
      secondList: [],
    };
  },
  mounted() {
    this.getCartTreeList();
  },

  methods: {
    onChange(e) {
      console.log(this.activeKey, "你是谁");
        this.secondList = this.firstList[e].children;
    },

    getCartTreeList() {
      getCartTree().then((res) => {
        console.log(res, "hhhhh你是谁");
        if (res.code == 200) {
          this.firstList = res.list;
          this.secondList = res.list[this.activeKey].children;
        }
      });
    },
  },
};
</script>

<style lang="" scoped>
.cateInf{
  display: flex;
}
.van-grid{
  flex: 1;
}
.title {
  font-size: 14px;
}
.van-nav-bar {
  background: #f26b11;
}
</style>
