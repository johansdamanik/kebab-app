<template>
  <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider dark:bg-slate-800 dark:text-white"
              v-for="(column, index) in columns"
              :key="index"
              :class="column.headerClass"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td
              class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left dark:bg-slate-700 dark:text-white"
              v-for="(column, index) in columns"
              :key="index"
              :class="column.class"
            >
              <!-- Image Url -->
              <template v-if="column.field === 'imgUrl'">
                <div>
                  <img
                    :src="item[column.field]"
                    class="lg:w-64 lg:h-40 md:w-36 md:h-24 rounded-lg shadow-md hover:scale-150 ease-in duration-200 md:max-w-xs md:max-h-xs"
                  />
                </div>
              </template>

              <!-- Status -->
              <template v-else-if="column.field === 'status'">
                <div v-if="role === 'admin'" class="relative inline-flex">
                  <svg
                    class="w-2 h-2 absolute top-0 right-0 m-3 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 412 232"
                  >
                    <path
                      d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                      fill="#648299"
                      fill-rule="nonzero"
                    />
                  </svg>
                  <select
                    @change="changeStatus(item.id, $event.target.value)"
                    :class="changeClass(item.status)"
                    class="font-bold border border-gray-300 rounded-full text-gray-600 h-7 pl-5 pr-6 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                  >
                    <option class="bg-white text-black" :selected="item.status == 'Active'">
                      Active
                    </option>
                    <option class="bg-white text-black" :selected="item.status == 'Inactive'">
                      Inactive
                    </option>
                    <option class="bg-white text-black">Archived</option>
                  </select>
                </div>
                <div
                  v-else
                  :class="changeClass(item.status)"
                  class="font-bold border border-gray-300 rounded-full text-gray-600 h-7 pl-5 pr-6 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                >
                  {{ item.status }}
                </div>
              </template>

              <!-- Action -->
              <template v-else-if="column.field === 'action'">
                <div class="flex justify-center items-center h-full">
                  <button @click.prevent="handleEdit(item.id)">
                    <svg
                      class="h-7 w-7 text-orange-500"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                </div>
              </template>

              <!-- Price -->
              <template v-else-if="column.field === 'price'">
                {{ formattedPrice(item[column.field]) }}
              </template>

              <!-- Else -->
              <template v-else>
                {{ item[column.field] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableData',
  props: ['columns', 'data'],
  emits: ['editCuisine', 'changeStatus'],
  data() {
    return {
      currentData: null,
      role: localStorage.getItem('role')
    }
  },
  methods: {
    handleEdit(id) {
      this.$emit('editCuisine', id)
    },
    changeStatus(id, status) {
      const data = { id, status }
      this.$emit('changeStatus', data)
    },
    formattedPrice(price) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    },
    changeClass(status) {
      if (status == 'Active') {
        return 'bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs'
      } else {
        return 'bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-xs'
      }
    }
  }
}
</script>

<style></style>
