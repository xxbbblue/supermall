<template>
  <div class="back_top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.back_top {
  position: fixed;
  right: 8px;
  bottom: 55px;
}
.back_top img {
  width: 45px;
  height: 45px;
}
</style>