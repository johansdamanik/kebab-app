<template>
  <div
    class="h-10 w-10 bg-orange-400 hover:bg-orange-300 rounded-lg flex items-center justify-center cursor-pointer shadow-lg"
  >
    <ion-icon name="star" :style="$route.name === 'bookmark' ? 'color: yellow' : 'color: white'" style="font-size: 30px"></ion-icon>
  </div>
</template>

<script>
export default {
  name: 'BookmarkButton',
}
</script>

<style></style>
