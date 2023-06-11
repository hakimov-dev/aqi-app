<template>
  <div v-if="!loading" class="flex flex-col w-full">
    <headerNav :data="airQualityData" />
    <div
      :class="`bg-${airQualityData.color}-300`"
      class="header h-[50vh] flex items-center justify-center"
    >
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
        <h1 class="w-auto ml-0 mt-1 text-xl font-medium float-left">
          {{ advices }}
        </h1>
      </div>
    </div>
    <div
      class="body h-auto py-2 mt-6 flex flex-col items-center justify-center"
    >
      <div class="container w-[50%] border-2 text-center shadow-xl p-2">
        <h1 class="text-xl font-medium">About of result AQI</h1>
        <p class="text-base font-medium my-3">
          {{ about }}
        </p>
      </div>
    </div>
  </div>
  <!-- Loading page -->
  <Loading v-else />
</template>

<script lang="ts">
import Vue from "vue";
import { getIP, getAbout, getAQI } from "@/services/index";
import { getAirQualityFromAQI, getAirQualityAbout } from "@/utils/index";

export default Vue.extend({
  name: "IndexPage",

  data() {
    return {
      value: "",
      activeKey: "1",
      loading: true,
      aqi: 0,
      airQualityData: {
        quality: "",
        color: "gray",
      },
      about: "",
      advices: "",
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
      this.aqi = 0;
      this.airQualityData.color = "gray";
      this.about = "";
      this.advices = "";
      getAQI(city).then((res) => {
        this.calculateAQI(res?.CO?.aqi);
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
        this.$notification.error({ message: "Invalid CO concentration" });
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
          this.aqi = Math.round(aqi);
          this.airQualityData = getAirQualityFromAQI(this.aqi);
          const abouts = getAirQualityAbout(this.aqi);
          this.about = abouts.additionalText;
          this.advices = abouts.advice;
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
</style>
