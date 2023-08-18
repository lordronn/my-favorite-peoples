<template>
  <div class="placeholder mx-auto mt-10 px-4">
    <div v-if="type === 'empty'" class="placeholder__message">
      <span class="material-icons placeholder__icon">inbox</span>
      <p class="text-lg font-semibold">The list is empty!</p>
      <p>You can add your favorites from the</p>
      <button @click="goToPeoples" class="placeholder__button">
        <span>Peoples list</span>
        <span class="material-icons">arrow_right_alt</span>
      </button>
    </div>
    <div v-if="type === 'error'" class="placeholder__message">
      <span class="material-icons placeholder__icon">error_outline</span>
      <p>
        An error occurred.
        <button @click="reloadPage" class="placeholder__button">
          Please try again.
          <span class="material-icons">refresh</span>
        </button>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: (value: string) => ["empty", "error"].includes(value),
    },
  },
  methods: {
    goToPeoples() {
      this.$router.push({ name: "Peoples" });
    },
    reloadPage() {
      location.reload();
    },
  },
};
</script>

<style scoped>
.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 400px;
  background-color: aliceblue;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 1rem;
}

.placeholder__message {
  text-align: center;
}

.placeholder__icon {
  font-size: 3rem;
  color: #aaa;
  margin-bottom: 1rem;
}

.placeholder__button {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 10px auto;
  padding: 0.25rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.placeholder__button:hover {
  background-color: #2563eb;
}
</style>
