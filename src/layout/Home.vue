<template>
  <Top :title="title" @change-title="(e) => (title = e)" />
  <Content content="this is content">
    这是slot这是slot这是slot这是slot这是slot这是slot这是slot
  </Content>
  <hr />
  <div class="tabs">
    <span @click="changeTab('One')">动态组件一</span>
    <span @click="changeTab('Two')">动态组件二</span>
  </div>
  <div>
    <component :is="index"></component>
  </div>
  <hr />
  <div>
    <van-button type="primary" to="/echartsmap">go to Echarts</van-button>
  </div>
</template>

<script>
import Top from "../components/Top.vue";
import Content from "../components/Content.vue";
import One from "../components/One.vue";
import Two from "../components/Two.vue";
import { ref } from "vue";
export default {
  components: {
    Top,
    Content,
    One,
    Two,
  },
  setup() {
    let index = ref("One");
    let title = ref("hello");
    function changeTab(e) {
      console.log(e);
      index.value = e;
    }
    function getChildTitle(e) {
      console.log(e);
      title.value = e;
    }
    return {
      index,
      title,
      changeTab,
      getChildTitle,
    };
  },
};
</script>

<style>
.h2 {
  font-size: 44px;
  width: 200px;
}
.tabs span:nth-child(1) {
  margin-right: 10px;
}
</style>