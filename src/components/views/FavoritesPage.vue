<template>
  <div class="container max-w-5xl mx-auto my-10 px-4">
    <TablePeoples
      v-if="favorites.length"
      class="mt-10"
      :columns="columns"
      :peoples="favorites"
      :loading="false"
      @updateFavorite="toggleFavorite" />
    <TableStub v-else type="empty" />
  </div>
</template>

<script lang="ts">
import TablePeoples from "@/components/table-items/TablePeoples.vue";
import TableStub from "@/components/table-items/TableStub.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    TablePeoples,
    TableStub,
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
