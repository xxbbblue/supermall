<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cartList" :key="item.iid" :itemInfo="item"></cart-list-item>
    </scroll>

  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartLIst",
  components: {
    Scroll,
    CartListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // this.$refs.scroll.refresh();
  },
  mounted() {},

  methods: {},
};
</script>

<style scoped>
.cart-list {
  height: 100%;
}
.content {
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>