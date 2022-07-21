<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="navbar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import cartList from "./childComps/CartLIst.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    cartList,
    CartBottomBar,
  },
  name: "Cart",
  computed: {
    // mapGetters函数混入getter
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
