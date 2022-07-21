<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in titles " :key='index' class="tab-control-item" :class="{active:index===curentindex} " @click='itemClick(index)'>
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      curentindex: 0,
    };
  },

  mounted() {},

  methods: {
    itemClick(index) {
      this.curentindex = index;
      this.$emit("tabclick", index);
    },
  },
};
</script>

<style scoped>
.tabcontrol {
  display: flex;
  text-align: center;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-hight-text);
}
.active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>