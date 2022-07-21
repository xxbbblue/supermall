<template>
  <div v-if="Object.keys(goods).length != 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <!-- services在info-other已经展示过了，所以这里 -1 循环的是一个数字 -->
      <span class="info-service-item" v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfoo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
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
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 10px;
}
.n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.discount {
  position: relative;
  top: -10px;
  font-size: 15px;
  border-radius: 8px;
  color: var(--color-high-text);
  margin-left: 5px;
}
.info-other {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  line-height: 30px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-service {
  display: flex;
  margin-top: 15px;
  line-height: 60px;
  justify-content: space-between;
}
.info-service img {
  width: 13px;
  height: 13px;
}
.info-service-item span {
  font-size: 13px;
  color: #333;
}
</style>