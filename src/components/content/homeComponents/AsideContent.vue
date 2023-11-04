<template>
  <div class="asideContent">
    <hot-tags/>
    <hot-articles/>
    <last-read/>
    <div class="viewCount">
      总浏览量：
      <!-- <span class="iconfont icon-liulanliang"></span> -->
      {{ viewCount }}
    </div>
  </div>
</template>

<script>
import { getViewCount } from '@/request/api'
import HotArticles from './asideItems/HotArticles.vue'
import HotTags from './asideItems/HotTags.vue'
import LastRead from './asideItems/LastRead.vue'

export default {
  data() {
    return {
      hotTagChartWidth: null,
      viewCount: ''
    }
  },
  components: {
    // HotTagChart,
    // InterestChart
    HotTags,
    HotArticles,
    LastRead
  },
  mounted() {
    getViewCount().then(res => {
      this.viewCount = res.data.viewCount
    })
  }
}
</script>

<style scoped>
.viewCount {
  position: absolute;
  bottom: 2%;
  right: 20%;
  color: var(--font-color);
  font-size: 10px;
  line-height: 12px;
}

.asideContent {
  position: relative;
    width: 20%;
    height: 75%;
    border-radius: 15px;
  background-color: var(--infocard-bg-color);
}


</style>