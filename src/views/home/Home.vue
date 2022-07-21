<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll" :pull-up-load='true' @pullingUp='loadmore'>
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabclick="tabclick" ref='tabControl'></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="clickBack" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommend from "./childComps/HomeRecommend.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeData } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommend,
    FeatureView,

    TabControl,
    NavBar,
    GoodsList,
    BackTop,

    Scroll,
  },
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      offsetTop: 0,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },

  mounted() {
    //获取tabControl的offsetTop
    //所有组件都有一个属性$el:用于获取组件中的元素
    // setTimeout(() => {
    //   console.log(this.$refs.tabControl.$el.offsetTop);
    // }, 300);
  },
  destroyed() {
    console.log("sss");
  },

  methods: {
    //事件监听方法
    tabclick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    clickBack() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
    },
    loadmore() {
      // console.log("上拉加载更多");
      this.getHomeData(this.currentType);

      this.$refs.scroll.scroll.refresh();
    },
    /*
    网络请求方法
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // 函数调用后里面的变量都没了，再次调用再次创建所以得保存
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求商品数据
    getHomeData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        // 请求过来的数据进行保存
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        // 翻页
        this.goods[type].page += 1;

        this.$refs.scroll.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
/* scoped当前作用域的样式 只会在当前组件起效果 */
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.content {
  overflow: hidden;
  /* height: 300px; */

  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>