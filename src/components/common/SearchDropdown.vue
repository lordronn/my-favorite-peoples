<template>
  <div class="relative" ref="searchComponent">
    <input
      v-model="searchQuery"
      @blur="handleClickOutside"
      class="p-2 border focus:border-sky-500 outline-none rounded w-full"
      placeholder="Search..." />
    <div
      v-if="visibleWindow"
      class="absolute border mt-2 w-64 rounded-md shadow-lg z-10 bg-white">
      <div v-if="loading" class="py-3">
        <div class="loader m-auto"></div>
      </div>
      <div v-else-if="results.length" class="rounded-md shadow-lg">
        <ul class="py-1">
          <li
            v-for="result in results"
            :key="result.name"
            @click="goToPerson(result.id)"
            class="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer">
            {{ result.name }}
          </li>
        </ul>
      </div>
      <div v-else class="px-4 py-2 cursor-not-allowed">Nothing found...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from "vuex";

export default {
  name: "searchDropdown",
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    ...mapState("search", ["results", "loading"]),
    visibleWindow() {
      return this.searchQuery.length;
    },
  },
  methods: {
    ...mapActions("search", ["searchPerson", "resetResults"]),
    goToPerson(id: string) {
      this.$router.push({ name: "PeoplesDetail", params: { id } });
    },
    handleClickOutside() {
      setTimeout(() => {
        this.searchQuery = "";
        this.resetResults();
      }, 500);
    },
  },
  watch: {
    searchQuery(newValue) {
      if (newValue) {
        this.searchPerson(newValue);
      }
    },
  },
};
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
