<template>
  <div class="container max-w-2xl mx-auto my-10 px-4">
    <TableStub v-if="loadingError" type="error" />
    <TablePerson
      :person="person"
      :loading="loading"
      @updateFavorite="toggleFavorite" />
  </div>
</template>

<script lang="ts">
import TablePerson from "@/components/table-items/TablePerson.vue";
import TableStub from "@/components/table-items/TableStub.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    TableStub,
    TablePerson,
  },
  computed: {
    ...mapState("search", ["person", "loading", "loadingError"]),
  },
  methods: {
    ...mapActions("search", ["getOnePerson"]),
    ...mapActions("favorites", ["toggleFavorite"]),
  },
  mounted() {
    this.getOnePerson(this.$route.params.id);
  },
};
</script>
