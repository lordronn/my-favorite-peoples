<template>
  <TableStub v-if="loadingError" type="error" />
  <div v-else class="container max-w-5xl mx-auto my-10 px-4">
    <div class="flex flex-col sm:flex-row gap-7 justify-between">
      <SearchDropdown />
      <PaginationComponent
        :currentPage="currentPage"
        :totalPages="totalPages"
        @changePage="updatePage" />
    </div>
    <TablePeoples
      class="mt-10"
      :columns="columns"
      :peoples="peoples"
      :loading="loading"
      @updateFavorite="toggleFavorite" />
  </div>
</template>

<script lang="ts">
import PaginationComponent from "@/components/common/PaginationComponent.vue";
import SearchDropdown from "@/components/common/SearchDropdown.vue";
import TablePeoples from "@/components/table-items/TablePeoples.vue";
import TableStub from "@/components/table-items/TableStub.vue";

import { mapActions, mapState } from "vuex";

export default {
  components: {
    TablePeoples,
    TableStub,
    PaginationComponent,
    SearchDropdown,
  },
  computed: {
    ...mapState("peoples", [
      "peoples",
      "loading",
      "loadingError",
      "currentPage",
      "totalPages",
      "columns",
    ]),
  },
  methods: {
    ...mapActions("favorites", ["toggleFavorite"]),
    ...mapActions("peoples", ["fetchPerson", "updatePage"]),
  },
  mounted() {
    if (!this.peoples.length) {
      this.fetchPerson();
    }
  },
};
</script>
