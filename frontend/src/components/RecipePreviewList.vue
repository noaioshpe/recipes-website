<template>
  <div class="container">
    <h3>{{ title }}</h3>

    <div class="recipe-grid">
      <div v-for="r in recipes" :key="r.id">
        <RecipePreview :recipe="r" />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    },
    clickable: {
    type: Boolean,
    default: true,
    }
  },
};
</script>

<style scoped>
.container {
  min-height: 400px;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

</style>
