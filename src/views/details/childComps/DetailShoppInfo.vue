<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle ">
      <div class="shop-middle-left">
        <div class="info-sells">
          <div class="shop-count">{{shop.sells |sellCountFilter}}</div>
          <span class="sells-text">总销量</span>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <span class="goods-text">全部宝贝</span>
        </div>
      </div>
      <div class="shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td class="info-name">{{item.name}}</td>
            <td class="score" :class="{'better-score':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'score-better':item.isBetter}">
              <span>{{item.isBetter?"高":"低"}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="enter-shop-wrap">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShoppInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.shop-top {
  margin-top: 15px;
  padding: 0 8px;
}
.shop-top img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.title {
  align-items: center;
  margin: 20px 10px;
}
.shop-middle {
  display: flex;
  justify-content: space-between;
}
.shop-middle-left {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 10px;
  color: #222;
}
.shop-count {
  font-size: 15px;
}
.info-sells {
  padding: 0 18px;
}
.sells-text {
  margin-top: 15px;
  font-size: 10px;
}
.goods-text {
  margin-top: 15px;
  font-size: 10px;
}
.shop-middle-right {
  margin-right: 15px;
  text-align: center;
  font-size: 16px;
}
.info-name {
  padding: 0 10px 5px 0;
}
.score {
  padding: 0 10px 5px 0;
  color: #5ea732;
}
.better span {
  background-color: #5ea732;
  text-align: center;
  color: #fff;
}
.better-score {
  color: #f13e3a;
}
.shop-middle-right .score-better span {
  background-color: #f13e3a;
  color: #fff;
}
.enter-shop-wrap {
  text-align: center;
}
.enter-shop {
  display: inline-block;
  background-color: #f2f2f2;
  font-size: 12px;
  padding: 6px 30px;
  border-radius: 100px;
  margin: 10px;
}
</style>