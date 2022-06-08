<template>
  <div class="breadCrumb" v-if="breadList.length > 1">
    <span
      v-for="item in breadList"
      :key="item.cityCode"
      @click="goBack(item.cityCode)"
      >{{ item.name }}</span
    >
  </div>
  <div id="map"></div>
</template>
<script>
import load from "../plugin/loadScript";
const amapUi = "//webapi.amap.com/ui/1.1/main.js?v=1.1.1";
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
export default {
  setup() {
    let map = ref(null);
    let chart = null;
    let mapJson = ref(null);
    let parentJson = ref([]);
    let breadList = ref([
      {
        name: "全国",
        cityCode: "100000",
      },
    ]);
    // 引入UI组件库（1.1版本）
    function init() {
      load(amapUi, (err) => {
        // this.loading = false
        if (err) {
          this.$message.error(err.message);
          return;
        }
        getGeoJson("100000");
      });
    }
    function getGeoJson(adcode) {
      AMapUI.loadUI(["geo/DistrictExplorer"], function (DistrictExplorer) {
        var districtExplorer = (window.districtExplorer = new DistrictExplorer({
          eventSupport: true, // 打开事件支持
          map: map.value,
        }));
        districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
          if (error) {
            console.error(error);
            return;
          }
          //   该区域中全部的子级区划Feature数组
          let Json = areaNode.getSubFeatures();
          if (Json.length > 0) {
            parentJson = Json;
          } else if (Json.length === 0) {
            Json = parentJson.filter((item) => {
              if (item.properties.adcode === adcode) {
                return item;
              }
            });
          }

          // geoJson必须这种格式
          mapJson.value = {
            type: "FeatureCollection",
            features: Json,
          };
          initChart();
        });
      });
    }
    function initChart() {
      let data = [
        {
          name: "浙江省", //必须和geoJson中的name名字一致
          value: 800,
          cityCode: 330000,
        },
        {
          name: "湖州市", //必须和geoJson中的name名字一致
          value: 200,
          cityCode: 330500,
        },
      ];
      echarts.registerMap("Map", mapJson.value);
      chart.setOption(
        {
          tooltip: {
            trigger: "item",
          },
          visualMap: {
            show: false,
            min: 1,
            max: 1000,
            text: ["1", "1000"],
            realtime: true,
            calculable: true,
            inRange: {
              color: ["#e0ffff", "blue"], //取值范围的颜色
            },
          },
          series: [
            {
              name: "地图",
              type: "map",
              map: "Map",
              roam: true, // 是否可缩放
              zoom: 1.2, // 缩放比例
              data: data,
              label: {
                normal: {
                  show: true, // 显示省份标签
                  textStyle: {
                    color: "#323233", // 省份标签字体颜色
                    fontSize: 12,
                  },
                },
                emphasis: {
                  // 对应的鼠标悬浮效果
                  show: true,
                  textStyle: {
                    color: "#000",
                  },
                },
              },
            },
          ],
        },
        true
      );
    }
    // 下钻
    function echartsMapClick(params) {
      console.log(params);
      if (!params.data) {
        return false;
      }
      let obj = breadList.value.find(
        (item) => item.cityCode === params.data.cityCode
      );
      obj
        ? ""
        : breadList.value.push({
            ...params.data,
          });
      getGeoJson(params.data.cityCode);
    }
    function goBack(cityCode) {
      let index = breadList.value.findIndex(
        (item) => item.cityCode === cityCode
      );
      if (index === breadList.value.length - 1) {
        return;
      }

      breadList.value.splice(index + 1, this.breadList.length - 1);
      getGeoJson(cityCode);
    }
    onMounted(() => {
      map.value = new AMap.Map("container", {
        resizeEnable: true,
      });
      chart = echarts.init(document.getElementById("map"));
      //  echarts 点击事件 可做下钻功能
      chart.on("click", echartsMapClick);
      init();
    });
    return {
      breadList,
      goBack,
    };
  },
};
</script>
<style scoped>
#map {
  width: 100%;
  height: 320px;
}
.breadCrumb span {
  margin-right: 6px;
}
</style>