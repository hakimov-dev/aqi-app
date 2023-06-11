<template>
  <div v-if="!loading" class="flex flex-col w-full">
    <headerNav :data="airQualityData" />
    <div
    :class="`bg-${airQualityData.color}-300`"  
    class="header h-[50vh] flex items-center justify-center">
      <div class="container mx-auto flex flex-col items-center justify-start">
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
        <h1 class="w-auto ml-0 mt-1 text-xl font-medium float-left">
          AQI: {{ aqi !== 0 ? aqi : "Loading..." }}
        </h1>
      </div>
    </div>
    <div class="body h-auto py-2 mt-6 flex flex-col items-center justify-center">
      <div class="container w-[50%] tabs">
        <a-tabs v-model:activeKey="activeKey" type="card">
          <a-tab-pane key="1" tab="About air quality">
            <p class="content mx-auto py-3 font-medium text-lg">
              The air quality is generally acceptable, but there may be a
              moderate level of pollutants present. This may cause minor
              discomfort for sensitive individuals such as those with
              respiratory issues, children, and the elderly. Most people can
              continue with their regular activities without significant adverse
              effects.
            </p>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Advices">
            <p class="content mx-auto py-3 font-medium text-lg">
              Sensitive individuals may want to limit prolonged or heavy outdoor
              exertion. It is advisable to check air quality updates and take
              breaks if experiencing discomfort.
            </p>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
  <!-- Loading page -->
  <Loading v-else />
</template>

<script lang="ts">
import Vue from "vue";
import { getIP, getAbout, getAQI } from "@/services/index";
import { getAirQualityFromAQI } from "@/utils/index"

export default Vue.extend({
  name: "IndexPage",

  data() {
    return {
      value: "",
      activeKey: "1",
      loading: true,
      aqi: 0,
      airQualityData: {
        quality: '',
        color: 'gray',
      }
    };
  },

  mounted() {
    this.getIPAdress();
  },

  methods: {
    getIPAdress() {
      getIP()
        .then((res) => {
          this.getIPInfo(res);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getIPInfo(about: { ip: "" }) {
      getAbout(about?.ip).then((res) => {
        this.value = res?.city;
        this.searchCity(this.value);
      });
    },

    searchCity(city: String) {
      this.aqi = 0
      this.airQualityData.color = 'gray'
      getAQI(city).then((res) => {
        this.calculateAQI(res?.CO?.aqi)
      });
    },

    // Calculate aqi by CO
    calculateAQI(concentration: Number) {
      const coConcentration = concentration || 0;
      const breakpoints = [
        { lowConcentration: 0, lowAQI: 0 },
        { lowConcentration: 4.4, lowAQI: 50 },
        { lowConcentration: 9.4, lowAQI: 100 },
        { lowConcentration: 12.4, lowAQI: 150 },
        { lowConcentration: 15.4, lowAQI: 200 },
        { lowConcentration: 30.4, lowAQI: 300 },
        { lowConcentration: 40.4, lowAQI: 400 },
        { lowConcentration: 50.4, lowAQI: 500 },
      ];

      if (coConcentration < 0 || coConcentration > 50.4) {
        this.$notification.error({message: "Invalid CO concentration"})
      }

      for (let i = 0; i < breakpoints.length - 1; i++) {
        const { lowConcentration, lowAQI } = breakpoints[i];
        const { lowConcentration: highConcentration, lowAQI: highAQI } =
          breakpoints[i + 1];

        if (
          coConcentration >= lowConcentration &&
          coConcentration <= highConcentration
        ) {
          const aqi =
            ((highAQI - lowAQI) / (highConcentration - lowConcentration)) *
              (coConcentration - lowConcentration) +
            lowAQI;
           this.aqi = Math.round(aqi)
           this.airQualityData = getAirQualityFromAQI(this.aqi)
        }
      }
    },
  },
});
</script>

<style scoped>
.input :deep(.ant-input),
.input :deep(.ant-btn-lg) {
  height: 48px !important;
}

.tabs :deep(.ant-tabs-tab:hover) {
  color: black !important;
}

.tabs :deep(.ant-tabs-tab) {
  font-weight: 500;
}
.tabs :deep(.ant-tabs-tab-active) {
  background: black !important;
  color: white !important;
}

.tabs :deep(.ant-tabs-tab-active:hover) {
  background: black !important;
  color: white !important;
}
</style>
