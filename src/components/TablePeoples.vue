<template>
  <table class="divide-y divide-gray-200">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody v-if="loading">
      <tr v-for="item in 10" :key="item">
        <td
          v-for="column in columns"
          :key="column.key"
          class="p-6"
          :class="column.key === 'name' ? 'w-2/6' : 'w-1/5'">
          <div class="animate-pulse bg-gray-300 rounded w-full h-5"></div>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="person in peoples" :key="person.name">
        <td
          v-for="column in columns"
          :key="'person-' + column.key"
          :class="column.key === 'name' ? 'w-2/6' : 'w-1/5'">
          <button v-if="column.key === 'name'" @click="goToPerson(person.id)">
            <span>
              {{ person[column.key] }}
            </span>
          </button>
          <button
            v-else-if="column.key === 'favorite'"
            class="flex items-center mx-auto w-6 h-6"
            @click="updateFavorite(person)">
            <span
              class="material-icons"
              :class="person.favorite ? 'text-yellow-400' : 'text-gray-400'">
              star
            </span>
          </button>
          <span v-else>
            {{ person[column.key] }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Person, TableColumn } from "@/interfaces/index";

export default {
  props: {
    columns: {
      type: Array as () => TableColumn[],
      required: true,
    },
    peoples: {
      type: Array as () => Person[],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateFavorite(person: Person) {
      this.$emit("updateFavorite", person);
    },
    goToPerson(id: string) {
      this.$router.push({ name: "PeoplesDetail", params: { id } });
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

tr > *:not(:first-child) {
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>
