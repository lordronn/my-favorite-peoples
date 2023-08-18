<template>
  <div class="container max-w-5xl mx-auto my-10 px-4">
    <TablePeoples
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
import TablePeoples from "@/components/TablePeoples.vue";
import PlaceholderComponent from "@/components/TablePlaceholder.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    TablePeoples,
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
