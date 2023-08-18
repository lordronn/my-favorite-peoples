<template>
  <div class="container max-w-2xl mx-auto my-10 px-4">
    <PlaceholderComponent v-if="loadingError" type="error" />

    <table v-else class="min-w-full divide-y divide-gray-200">
      <tbody v-if="loading">
        <tr v-for="item in 5" :key="item" class="flex">
          <td class="w-1/3 p-3 border bg-gray-100 font-semibold text-lg">
            <div class="animate-pulse bg-gray-300 rounded w-full h-5"></div>
          </td>
          <td class="w-2/3 p-3 border flex items-center">
            <div class="animate-pulse bg-gray-300 rounded w-full h-5"></div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(value, key) in person" :key="key" class="flex">
          <td class="w-1/3 p-3 border bg-gray-100 font-semibold text-lg">
            {{ key }}
          </td>
          <td class="w-2/3 p-3 border flex items-center">
            <div v-if="Array.isArray(value)">
              <ul>
                <li v-for="(item, index) in value" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
            <button
              v-else-if="key.toString() === 'favorite'"
              class="w-6 h-6"
              @click="toggleFavorite(person)">
              <span
                class="material-icons"
                :class="person.favorite ? 'text-yellow-400' : 'text-gray-400'">
                star
              </span>
            </button>
            <div v-else>
              {{ value }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import PlaceholderComponent from "@/components/TablePlaceholder.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    PlaceholderComponent,
  },
  computed: {
    ...mapState("search", ["person", "loading", "loadingError"]),
  },
  methods: {
    ...mapActions("search", ["getOnePerson"]),
    ...mapActions("favorites", ["toggleFavorite"]),
  },
  created() {
    this.getOnePerson(this.$route.params.id);
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

td {
  vertical-align: top;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
  padding-left: 0;
}
</style>
