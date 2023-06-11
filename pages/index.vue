<template>
  <div v-if="!loading" class="flex flex-col w-full">
    <headerNav />
    <div class="header h-[50vh] flex items-center justify-center bg-yellow-300">
      <div class="container mx-auto flex items-center justify-center">
        <a-input-search
          class="w-[50%] mx-auto mt-10 input"
          v-model:value="value"
          placeholder="Enter a city"
          size="large"
          @search="searchCity(value)"
        >
          <template #enterButton>
            <a-button
              class="bg-black text-white hover:bg-black hover:text-white hover:opacity-90"
              >Search a city</a-button
            >
          </template>
        </a-input-search>
      </div>
    </div>
    <div class="body h-auto py-2 flex flex-col items-center justify-center">
      <div class="container w-[50%] tabs">
        <a-tabs v-model:activeKey="activeKey" type="card">
          <a-tab-pane key="1" tab="About air quality">
            <p class="content mx-auto py-3 font-medium text-lg">
              The air quality is generally acceptable, but there may be a moderate level of pollutants present. This may cause minor discomfort for sensitive individuals such as those with respiratory issues, children, and the elderly. Most people can continue with their regular activities without significant adverse effects.
            </p>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Advices">
            <p class="content mx-auto py-3 font-medium text-lg">
               Sensitive individuals may want to limit prolonged or heavy outdoor exertion. It is advisable to check air quality updates and take breaks if experiencing discomfort.
            </p>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
  <!-- <Home /> -->
</template>

<script lang="ts">
import Vue from "vue";
import { getIP, getAbout, getAQI } from '@/services/index'

export default Vue.extend({
  name: "IndexPage",

  data() {
    return {
      value: '',
      activeKey: '1',
      loading: true,
    }
  },

  mounted() {
    this.getIPAdress()
  },

  methods: {
    getIPAdress(){
      getIP()
      .then(res => {
       this.getIPInfo(res)
      })
      .finally(() => {
        this.loading = false
      })
    },

    getIPInfo(about: {ip: ''}){
       getAbout(about?.ip)
         .then(res => {
          this.value = res?.city
          this.searchCity(this.value)
         })
    },

    searchCity(city: String){
        getAQI(city)
        .then((res) => {
          console.log(res)
        })
    }
  },
});
</script>

<style scoped>
.input :deep(.ant-input),
.input :deep(.ant-btn-lg) {
  height: 48px !important;
}

.tabs :deep(.ant-tabs-tab:hover){
   color: black !important;
}

.tabs :deep(.ant-tabs-tab){
  font-weight: 500;
}
.tabs :deep(.ant-tabs-tab-active){
  background: black !important;
  color: white !important;
}

.tabs :deep(.ant-tabs-tab-active:hover){
  background: black !important;
  color: white !important;
}
</style>
