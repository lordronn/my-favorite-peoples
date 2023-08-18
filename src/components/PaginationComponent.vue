<template>
  <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      :class="[
        'pagination__button',
        { 'pagination__button--active': currentPage === page },
      ]"
      @click="changePage(page)">
      {{ page }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page: number) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.pagination__button {
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  background-color: #f3f4f6;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.pagination__button:hover {
  background-color: #93c5fd;
}

.pagination__button--active {
  background-color: #3b82f6;
  color: white;
}

@media (max-width: 640px) {
  .pagination {
    display: flex;
    justify-content: space-between;
  }
  .pagination__button {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
