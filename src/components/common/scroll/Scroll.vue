<template>
  <!-- ref绑定子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSscroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
      //   message: "aaa",
    };
  },

  mounted() {
    //1.创建BSscroll对象
    this.scroll = new BSscroll(this.$refs.wrapper, {
      observeDOM: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      //   开启对 wrapper 子元素中图片元素的加载的探测。无论图片的加载成功与否，都会自动调用referesh
      observeImage: true,
      click: true,
    });
    //2.监听滚动位置
    this.scroll.on("scroll", (position) => {
      //   console.log(position);
      this.$emit("scroll", position);
    });
    //3.监听上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        //   console.log("上拉加载更多");
        this.$emit("pullingUp");
      });
    }
  },

  methods: {
    scrollTo(x, y, time) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style scoped>
</style>