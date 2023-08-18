<template>
  <div class="container max-w-5xl mx-auto my-10 px-4">
    <TableComponent
      v-if="favorites.length"
      class="mt-10"
      :columns="columns"
      :peoples="favorites"
      :loading="false"
      @updateFavorite="toggleFavorite" />
    <PlaceholderComponent v-else type="empty" />
  </div>
</template>

<script lang="ts">
import TableComponent from "@/components/TableComponent.vue";
import PlaceholderComponent from "@/components/TablePlaceholder.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    TableComponent,
    PlaceholderComponent,
  },
  computed: {
    ...mapState("favorites", ["favorites"]),
    ...mapState("peoples", ["columns"]),
  },
  methods: {
    ...mapActions("favorites", ["toggleFavorite"]),
  },
};
</script>
