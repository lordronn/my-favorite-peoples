<template>
  <div class="container max-w-2xl mx-auto my-10 px-4">
    <PlaceholderComponent v-if="loadingError" type="error" />
    <TablePerson
      :person="person"
      :loading="loading"
      @updateFavorite="cutPerson" />
  </div>
</template>

<script lang="ts">
import TablePerson from "@/components/TablePerson.vue";
import PlaceholderComponent from "@/components/TablePlaceholder.vue";
import { cutApiPerson } from "@/helpers/index";
import { ApiPerson } from "@/interfaces";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    PlaceholderComponent,
    TablePerson,
  },
  computed: {
    ...mapState("search", ["person", "loading", "loadingError"]),
  },
  methods: {
    ...mapActions("search", ["getOnePerson"]),
    ...mapActions("favorites", ["toggleFavorite"]),
    cutPerson(person: ApiPerson) {
      const shortPerson = cutApiPerson(person);
      this.toggleFavorite(shortPerson);
    },
  },
  mounted() {
    this.getOnePerson(this.$route.params.id);
  },
};
</script>
