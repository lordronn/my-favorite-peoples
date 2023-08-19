<template>
  <nav class="bg-gray-800 p-4 flex items-center justify-center">
    <router-link
      v-for="route in routes"
      :key="route.name"
      :to="route.link"
      exact
      class="text-white flex no-underline mx-4 py-2 px-4 rounded transition-colors duration-300 hover:bg-gray-600"
      active-class=" bg-gray-600">
      <span v-if="route.name">{{ route.name }}</span>
      <span v-if="route.img" class="material-icons">{{ route.img }}</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  data: () => ({
    routes: [
      {
        name: "",
        link: "/",
        img: "home",
      },
      {
        name: "Peoples",
        link: "/peoples",
        img: "",
      },
      {
        name: "Favorites",
        link: "/favorites",
        img: "",
      },
    ],
  }),
};
</script>
