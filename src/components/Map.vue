<script setup>
import { BMap, BInfoWindow, BMarker } from "vue3-baidu-map-gl";
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import {  } from 'vue3-baidu-map-gl'

const mapSetting = ref({
    enableDragging: true,
    enableInertialDragging: true,
    enableContinuousZoom: true,
    enableResizeOnCenter: true,
    enableDoubleClickZoom: false,
    enableKeyboard: true,
    enablePinchToZoom: true,
    enableAutoResize: true,
    enableTraffic: false
  })
const show = ref(false)
const mapStyle = ref("BMAP_NORMAL_MAP")
const mapCenter = ref({
        lng: 126.57618999481201,
        lat: 43.860602088678505,
      })
const value = ref('')
const options = [
  {
    label: '公司一',
    options: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Beijing',
        label: 'Beijing',
      },
    ],
  },
  {
    label: '公司二',
    options: [
      {
        value: 'Chengdu',
        label: 'Chengdu',
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen',
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou',
      },
      {
        value: 'Dalian',
        label: 'Dalian',
      },
    ],
  },
]
</script>

<template>
      <div class="z-50 w-[100%] flex justify-center items-center gap-3 py-6">
          <el-button type="primary" size="small" @click="mapStyle='BMAP_NORMAL_MAP'">常规模式</el-button>
          <el-button type="success" size="small" @click="mapStyle='BMAP_EARTH_MAP'">地球模式</el-button>
          <el-button type="info" size="small" @click="mapStyle='BMAP_SATELLITE_MAP'">卫星模式</el-button>
          <el-dropdown class="ml-3">
                <el-button type="primary" size="small">
                    Dropdown List<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu class="flex flex-col ml-6">
                      <el-checkbox v-model="mapSetting.enableDragging" label="拖拽" size="large" />
                      <el-checkbox v-model="mapSetting.enableInertialDragging" label="惯性拖拽" size="large" />
                      <el-checkbox v-model="mapSetting.enablePinchToZoom" label="双指缩放地图" size="large" />
                      <el-checkbox v-model="mapSetting.enableKeyboard" label="键盘操作" size="large" />
                      <el-checkbox v-model="mapSetting.enableDoubleClickZoom" label="双击缩放" size="large" />
                      <el-checkbox v-model="mapSetting.enableContinuousZoom" label="平滑缩放" size="large" />
                      <el-checkbox v-model="mapSetting.enableTraffic" label="交通路况" size="large" />
                      <el-checkbox v-model="show" label="简介显示" size="large" />
                      <el-switch v-model="show" active-text="简介显示" inactive-text="简介关闭" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" inline-prompt/>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-select class="ml-3" v-model="value" placeholder="快速导航" style="width: 140px" size="small">
              <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
      </div>
    <BMap
      class="map overflow-hidden border-dark-50"
      :zoom="9"
      :minZoom="3"
      height="80vh"
      :mapType="mapStyle"
      :center="mapCenter"
      enableScrollWheelZoom
      mapStyleId="0f3219e982947931ae2893345940df80"
      :enableDragging="mapSetting.enableDragging"
      :enableInertialDragging="mapSetting.enableInertialDragging"
      :enableContinuousZoom="mapSetting.enableContinuousZoom"
      :enableDoubleClickZoom="mapSetting.enableDoubleClickZoom"
      :enableKeyboard="mapSetting.enableKeyboard"
      :enablePinchToZoom="mapSetting.enablePinchToZoom"
      :enableTraffic="mapSetting.enableTraffic"
    >
      <BMarker
        :position="{ lat: 43.860602088678505, lng: 126.57618999481201 }"
        icon="red1"
      />
      <BInfoWindow
        v-model:show="show"
        :position="{ lat: 43.860602088678505, lng: 126.57618999481201 }"
        title="图文组合排版"
      >
        <h2>天安门</h2>
        <div class="infoWindow-content">
          <p>
            天安门坐落在中国北京市中心，故宫的南侧，与天安门广场隔长安街相望，是清朝皇城的大门。..
          </p>
          <img
            width="139"
            height="104"
            src="https://lbs.baidu.com/jsdemo/img/tianAnMen.jpg"
            alt=""
          />
        </div>
      </BInfoWindow>
      <!-- <BPanoramaControl /> -->
      <!-- <BPanoramaCoverageLayer /> -->
    </BMap>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
