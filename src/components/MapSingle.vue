<script setup>
import { BMap, BInfoWindow, BMarker, BNavigation3d, useDefaultMarkerIcons } from "vue3-baidu-map-gl";
import { ref, watch, onMounted, computed ,nextTick} from 'vue'
import { storeToRefs } from "pinia";
import { ArrowDown, CircleCloseFilled, Sunny, Moon,SwitchButton } from '@element-plus/icons-vue'
import { useRouter } from "vue-router"
import { useDark } from '@vueuse/core'
import { DrawScene, MarkerDraw } from 'bmap-draw';
import { PageArchives, UserService } from "/src/api/api.js";
import { storage, sessionStorage } from "../utils/storage";
import { useArchiveStore } from '../store/index'
const isDark = useDark()
const router = useRouter()
const archiveStore = useArchiveStore()
const archivesList = archiveStore.archivesList
const loginout = () => {
  storage.remove("token");
  storage.remove("userId");
  storage.remove("isLogin");
  sessionStorage.remove("token");
  sessionStorage.remove("userId");
  router.push("/login");
}
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
const show = ref(true)
const visible = ref(false)
const mapStyle = ref("BMAP_NORMAL_MAP")
const changeMap = (s) => {
  if (s === 1) {
    mapStyle.value = "BMAP_NORMAL_MAP"
  } else if (s === 2) {
    mapStyle.value = "BMAP_EARTH_MAP"
  } else {
    mapStyle.value = "BMAP_SATELLITE_MAP"
  }
}

const value = ref('')

const zoom = ref(5)

// 鼠标交互
let distance = ref({
  instance: null,
  isMeasuring: true,
  toggle() {
    let _distance = distance.value
    _distance.isMeasuring ? _distance.instance.close() : _distance.instance.open()
    _distance.isMeasuring = !_distance.isMeasuring
  }
})
let measure = ref({
  instance: null,
  isMeasuring: true,
  toggle() {
    let _measure = measure.value
    _measure.isMeasuring ? _measure.instance.close() : _measure.instance.open()
    _measure.isMeasuring = !_measure.isMeasuring
  }
})
let marker = ref({
  instance: null,
  isDrawing: false,
  toggle() {
    let _marker = marker.value
    _marker.isDrawing ? _marker.instance.closeAll() : _marker.instance.open()
    _marker.isDrawing = !_marker.isDrawing
  }
})
let circle = ref({
  instance: null,
  isDrawing: false,
  toggle() {
    let _circle = circle.value
    _circle.isDrawing ? _circle.instance.closeAll() : _circle.instance.open()
    _circle.isDrawing = !_circle.isDrawing
  }
})
let polyline = ref({
  instance: null,
  isDrawing: false,
  toggle() {
    let _polyline = polyline.value
    _polyline.isDrawing ? _polyline.instance.closeAll() : _polyline.instance.open()
    _polyline.isDrawing = !_polyline.isDrawing
  }
})
let polygon = ref({
  instance: null,
  isDrawing: false,
  toggle() {
    let _polygon = polygon.value
    _polygon.isDrawing ? _polygon.instance.closeAll() : _polygon.instance.open()
    _polygon.isDrawing = !_polygon.isDrawing
  }
})
let rectangle = ref({
  instance: null,
  isDrawing: false,
  toggle() {
    let _rectangle = rectangle.value
    _rectangle.isDrawing ? _rectangle.instance.closeAll() : _rectangle.instance.open()
    _rectangle.isDrawing = !_rectangle.isDrawing
  }
})
let clearFn = ref()
function handleInitd({ map, BMapGL }) {
  import('bmap-draw').then(({ DrawScene, MarkerDraw, PolylineDraw, CircleDraw, PolygonDraw, RectDraw, DistanceMeasure, AreaMeasure }) => {
    const scene = new DrawScene(map)
    clearFn.value = () => scene.clearData()
    distance.value.instance = new DistanceMeasure(scene,{
      isSeries: false,
      unit: 'metric'
    })
    distance.value.toggle()
    distance.value.instance.addEventListener('measure-length-end', (e) => {
      console.log('measure-end', e)
    })
    // 测量面积
    measure.value.instance = new AreaMeasure(scene,{
      isSeries: false,
      unit: 'metric'
    })
    measure.value.toggle()
    measure.value.instance.addEventListener('measure-area-end', (e) => {
      console.log('measure-end', e)
    })

    // 点绘制
    const defaultIcons = useDefaultMarkerIcons()
    marker.value.instance = new MarkerDraw(scene, {
      isOpen: false,
      isSeries: true,
      enableDragging: true,
      baseOpts: {
        icon: defaultIcons['red1']
      }
    })
    // 折线绘制
    polyline.value.instance = new PolylineDraw(scene, {
      isOpen: false,
      enableSnap: true, // 开启吸附绘制
      matchOverlay: {
        // 自定义吸附点样式
        type: 'Marker',
        icon: new BMapGL.Icon(
          'http://maponline0.bdimg.com/sty/map_icons2x/MapRes/shenghui_1.png',
          new BMapGL.Size(10, 10),
          { offset: new BMapGL.Size(5, 5) }
        )
      }
    })
    // 多边形绘制
    polygon.value.instance = new PolygonDraw(scene, {
      isOpen: false,
      labelOptions: {
        borderRadius: '2px',
        background: '#b5d3fb',
        border: '1px solid #b5d3fb',
        color: '#333',
        fontSize: '12px',
        letterSpacing: '0',
        padding: '5px'
      },
      baseOpts: {
        fillColor: '#fff',
        strokeWeight: 5,
        strokeOpacity: 1,
        fillOpacity: 0.2
      }
    })
    // 圆形绘制
    circle.value.instance = new CircleDraw(scene, {
      isOpen: false,
      labelOptions: {
        borderRadius: '2px',
        background: '#b5d3fb',
        border: '1px solid #b5d3fb',
        color: '#333',
        fontSize: '12px',
        letterSpacing: '0',
        padding: '5px'
      },
      baseOpts: {
        strokeColor: '#6d77f9',
        fillColor: '#fff',
        strokeWeight: 5,
        strokeOpacity: 1,
        fillOpacity: 0.2
      }
    })
    // 矩形绘制
    rectangle.value.instance = new RectDraw(scene, {
      isOpen: false,
      isSeries: true,
      labelOptions: {
        borderRadius: '2px',
        background: '#b5d3fb',
        border: '1px solid #b5d3fb',
        color: '#333',
        fontSize: '12px',
        letterSpacing: '0',
        padding: '5px'
      },
      baseOpts: {
        fillColor: '#fff',
        strokeWeight: 5,
        strokeOpacity: 1,
        fillOpacity: 0.2
      }
    })
  })
}

// api
onMounted(() => {
  myData()
});
const list = ref([])
// const configData = async () => {
//   const data = {
//     // channel_id: -1,
//   };
//   const res = await UserService.getConfig(data);
//   // console.log(res.data);
// }
const mapCenter = ref({
  lng: 106,
  lat: 33
})

const myData = async () => {
  const data = {
    model_id : 1
  }
  const res = await PageArchives.getMyArchives(data)
  // console.log(res.data);
  list.value = res.data.data.archivesList.data
  archiveStore.setArchivesList(res.data.data.archivesList.data)
}
const detail = ref({})

const detailData = async (id) => {
  const archive = archiveStore.archivesList.find(archive => archive.id === id)
  if (archive) {
    // 这里处理找到的文章详情逻辑
    // console.log(archive)
    detail.value = archive
    console.log(detail.value);
    mapCenter.value = {
      lng: Number(detail.value.lng),
      lat: Number(detail.value.lat),
    }
    visible.value = true
    zoom.value = 17
    } else {
      console.error('未找到对应的文章详情')
    }
  }

</script>

<template>
  <div class="h-20 absolute left-0 right-0 z-50 bg-[rgb(255,255,255,0.5)] dark:bg-[rgb(0,0,0,0.5)] border shadow backdrop-filter backdrop-blur-4 flex justify-between px-10 items-center">
    <div class="text-2xl font-bold font-serif dark:text-white">资产分布图<span class="text-[8px] font-auto">v1.0.0</span></div>
    <div class="flex items-center gap-3">

      <el-dropdown>
        <el-button type="primary" size="small">
          地图模式<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeMap(1)">常规模式</el-dropdown-item>
            <el-dropdown-item @click="changeMap(2)">地球模式</el-dropdown-item>
            <el-dropdown-item @click="changeMap(3)">卫星模式</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <el-button type="primary" size="small">
          图形绘制<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="!marker.isDrawing" @click="marker.toggle">绘制点</el-dropdown-item>
            <el-dropdown-item size="small" v-else @click="marker.toggle">禁用绘制点</el-dropdown-item>
            <el-dropdown-item v-if="!polyline.isDrawing" @click="polyline.toggle">绘制线</el-dropdown-item>
            <el-dropdown-item size="small" v-else @click="polyline.toggle">禁用绘制线</el-dropdown-item>
            <el-dropdown-item v-if="!circle.isDrawing" @click="circle.toggle">绘制圆</el-dropdown-item>
            <el-dropdown-item size="small" v-else @click="circle.toggle">禁用绘制圆</el-dropdown-item>
            <el-dropdown-item v-if="!polygon.isDrawing" @click="polygon.toggle">绘制多边形</el-dropdown-item>
            <el-dropdown-item size="small" v-else @click="polygon.toggle">禁用绘制多边形</el-dropdown-item>
            <el-dropdown-item v-if="!rectangle.isDrawing" @click="rectangle.toggle">绘制矩形</el-dropdown-item>
            <el-dropdown-item size="small" v-else @click="rectangle.toggle">禁用绘制矩形</el-dropdown-item>
            <el-dropdown-item size="small" @click="clearFn">清空绘图</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <el-button type="primary" size="small">
          数据测量<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="!distance.isMeasuring" @click="distance.toggle">测量距离</el-dropdown-item>
            <el-dropdown-item v-else @click="distance.toggle">取消测量距离</el-dropdown-item>
            <el-dropdown-item v-if="!measure.isMeasuring" @click="measure.toggle">测量面积</el-dropdown-item>
            <el-dropdown-item v-else @click="measure.toggle">取消测量面积</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown>
        <el-button type="primary" size="small">
          地图控件<el-icon class="el-icon--right"><arrow-down /></el-icon>
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
            <el-checkbox v-model="show" label="简介资产名" size="large" />
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-select class="ml-3" v-model="value" placeholder="快速导航" style="width: 140px" size="small">
        <el-option-group>
          <el-option v-for="item in list" :key="item.id"
            :label="item.nickname" :value="item.nickname" @click="detailData(item.id)" />
        </el-option-group>
      </el-select>
      <el-switch v-model="isDark" :active-icon="Sunny" :inactive-icon="Moon"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" inline-prompt />
        <el-button type="danger" size="small" :icon="SwitchButton" circle @click="loginout"></el-button>
    </div>
  </div>

  <BMap class="map overflow-hidden border-dark-50" :zoom="zoom" :minZoom="3" height="100vh" :mapType="mapStyle"
    :center="mapCenter || { lat: 43.879038, lng: 126.575784 }" @initd="handleInitd" enableScrollWheelZoom
    mapStyleId="980161f3645989feac25a0da15da4178" :enableDragging="mapSetting.enableDragging"
    :enableInertialDragging="mapSetting.enableInertialDragging" :enableContinuousZoom="mapSetting.enableContinuousZoom"
    :enableDoubleClickZoom="mapSetting.enableDoubleClickZoom" :enableKeyboard="mapSetting.enableKeyboard"
    :enablePinchToZoom="mapSetting.enablePinchToZoom" :enableTraffic="mapSetting.enableTraffic">
    <div v-for="(icons, index) in list" :key="index">
      <BMarker :position="{ lat: icons.lat, lng: icons.lng }" icon="simple_red" @click="detailData(icons.id)" />
      <BLabel :content="icons.nickname" v-if="show" :offset="{ x: 20, y: -14 }"
        :position="{ lat: icons.lat, lng: icons.lng }" :style="{
          color: '#fff',
          backgroundColor: 'rgb(0,0,0,0.3)',
          border: 'none',
          borderRadius: '3px',
          padding: '3px 6px',
          fontSize: '14px'
        }" />
        </div>
  </BMap>
  <el-drawer v-model="visible" :show-close="false" size="30%" class="dark:bg-gray-700 dark:text-white">
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass" class="dark:text-white text-xl font-bold">{{ detail.title }}</h4>
    </template>
    <div class="flex flex-col gap-4">
      <div>
        <el-descriptions direction="vertical" :column="4" size="small" border>
          <el-descriptions-item label="资产名称" :span="2">{{ detail.nickname }}</el-descriptions-item>
          <el-descriptions-item label="占地面积" :span="1">{{ detail.cover_area }}</el-descriptions-item>
          <el-descriptions-item label="建筑面积" :span="1">{{ detail.floor_area }}</el-descriptions-item>
          <el-descriptions-item label="管理单位" :span="2">{{ detail.channel.name }}</el-descriptions-item>
          <el-descriptions-item label="负责人">{{ detail.manager }}</el-descriptions-item>
          <el-descriptions-item label="产权证明" :span="1">{{ detail.identification }}</el-descriptions-item>
          <el-descriptions-item label="资产现状" :span="2">{{ detail.status_quo }}</el-descriptions-item>
          <el-descriptions-item label="责任人">{{ detail.just_manager }}</el-descriptions-item>
          <el-descriptions-item label="应急电话">{{ detail.tel }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-html="detail.content"></div>
    </div>
  </el-drawer>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.BMap_Marker {
  width: 50px !important;
}
</style>
