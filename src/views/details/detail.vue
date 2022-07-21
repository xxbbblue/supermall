<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" :currentIndex="currentIndex" ref="nav"></detail-nav-bar>
    <scroll class="detail-content" ref="scroll" @scroll="cententscroll" :probeType="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-infoo :goods="goods"></detail-base-infoo>
      <detail-shopp-info :shop="shop"></detail-shopp-info>
      <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- .native 是监听自定义标签根标签的事件，将原生事件绑定到组件上 -->
    <back-top @click.native="clickBack" v-show="isShowBackTop"> </back-top>

  </div>

</template>

<script>
import detailNavBar from "./childComps/detailNavBar";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import detailSwiper from "./childComps/detailSwiper";
import DetailBaseInfoo from "./childComps/DetailBaseInfoo";
import DetailShoppInfo from "./childComps/DetailShoppInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import { debounce } from "common/utils.js";

import { mapActions } from "vuex";

export default {
  name: "detail",
  components: {
    detailNavBar,
    detailSwiper,
    DetailBaseInfoo,
    DetailShoppInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null, //防抖
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  created() {
    //1.保存存入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求数据
    getDetail(this.iid).then((res) => {
      //1.获取顶部轮播图数据
      console.log(res);
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;
      //2.获取商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //4.获取店铺详情图片
      this.detailInfo = data.detailInfo;
      // 5.获取商品尺寸信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });
    //给getThemeTopY赋值 对给this.themeTopYs赋值的操作进行防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },
  updated() {
    this.getThemeTopY();
  },
  mounted() {},

  methods: {
    // 映射
    ...mapActions(["addCart"]),
    // 详情图片加载完成
    imgLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    },
    cententscroll(position) {
      // console.log(position);
      // 获取Y值
      const positionY = -position.y;
      // positionY和主题中值的比较
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 是否回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
    clickBack() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //加入购物车
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2.将商品添加到购物车
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product).then(res=>{
      //   console.log(res);
      // })

      this.addCart(product).then((res) => {
        console.log(res);
      });

      this.$toast.show("加入购物车成功", 2000);
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content {
  height: calc(100vh - 44px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>