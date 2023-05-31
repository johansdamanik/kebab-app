<template>
  <div class="flex flex-wrap justify-center">
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
      <!--Metric Card-->
      <div class="bg-white border-1 border-b-4 border-[#FF7931] rounded-lg shadow-xl p-5 dark:bg-slate-800 dark:text-white">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <svg
              class="h-16 w-16 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h2 class="font-bold uppercase text-gray-600 dark:text-white">Total Categories</h2>
            <p class="font-bold text-3xl">
              {{ categories.length }}
              <span class="text-yellow-600"><i class="fas fa-caret-up"></i></span>
            </p>
          </div>
        </div>
      </div>
      <!--/Metric Card-->
    </div>
    <div class="w-full md:w-1/2 xl:w-1/3 p-6">
      <!--Metric Card-->
      <div class="bg-white border-1 border-b-4 border-[#FF7931] rounded-lg shadow-xl p-5 dark:bg-slate-800 dark:text-white">
        <div class="flex flex-row items-center">
          <div class="flex-shrink pr-4">
            <svg
              class="h-16 w-16 text-orange-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path
                d="M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-6.8a2 2 0 0 1 -2 -2v-7a.9 .9 0 0 0 -1 -.8"
              />
              <path d="M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a1 1 0 0 1 -1 -1v-4.5" />
            </svg>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h2 class="font-bold uppercase text-gray-600 dark:text-white">Total Cuisines</h2>
            <p class="font-bold text-3xl">
              {{ cuisines.length }}
              <span class="text-yellow-600"><i class="fas fa-caret-up"></i></span>
            </p>
          </div>
        </div>
      </div>
      <!--/Metric Card-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: ['cuisines', 'categories']
}
</script>

<style></style>
