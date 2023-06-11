<template>
    <div class="flex flex-col w-full">
    <div class="header h-[50vh] flex items-center justify-center bg-yellow-300">
      <div class="container mx-auto flex items-center justify-center">
        <a-input-search
          class="w-[30%] mx-auto mt-10 input"
          v-model:value="value"
          placeholder="Enter a city"
          size="large"
          @search="onSearch"
        >
          <template #enterButton>
            <a-button class="bg-black text-white hover:bg-black hover:text-white hover:opacity-90">Search a city</a-button>
          </template>
        </a-input-search>
      </div>
    </div>
    <div class="body h-auto py-2 flex flex-col items-center justify-center container">
      <h1 class="text-3xl font-medium title">About air quality</h1>
      <p class="content w-[50%] mx-auto py-3 font-medium text-lg">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere architecto quia molestias nam temporibus molestiae aut unde tenetur excepturi porro? Sapiente dolore nihil unde sint explicabo numquam aperiam illo hic ullam quo laboriosam ipsa quaerat dolores voluptas impedit recusandae esse, perferendis pariatur quidem exercitationem possimus repellendus magnam velit? Rem repellat nemo earum, deleniti doloremque a itaque laudantium incidunt molestias? Tempora?
      </p>
    </div>
  </div>
   <!-- <Home /> -->
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>


<style scoped>
.input :deep(.ant-input), .input :deep(.ant-btn-lg){
  height: 48px !important;
}
</style>