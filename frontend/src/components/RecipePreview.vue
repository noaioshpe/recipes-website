<template>
  <div class="recipe-card">
    <!-- תמונה עם לינק לעמוד מתכון -->
    <router-link :to="`/recipe/${localRecipe.id}?source=${localRecipe.source}`">
      <img
        v-if="localRecipe.image"
        :src="localRecipe.image"
        class="recipe-image"
        alt="recipe image"
      />
    </router-link>

    <!-- גוף הכרטיס -->
    <div class="recipe-body">
      <!-- שם מתכון -->
      <h5 class="recipe-title">{{ localRecipe.title }}</h5>

      <!-- זמן הכנה -->
      <div class="recipe-info">
        <i class="fas fa-clock"></i>
        <span>{{ localRecipe.prep_time_minutes || localRecipe.readyInMinutes }} min</span>
      </div>

      <!-- צמחוני/טבעוני -->
      <div class="recipe-info" v-if="localRecipe.tags">
        <i class="fas fa-leaf"></i>
        <span>{{ localRecipe.tags }}</span>
      </div>

      <!-- גלוטן -->
      <div class="recipe-info" v-if="localRecipe.has_gluten !== undefined">
        <i class="fas fa-bread-slice"></i>
        <span>{{ localRecipe.has_gluten ? "contains gluten" : "gluten-free" }}</span>
      </div>

      <!-- אינדיקציה לצפייה -->
      <div class="recipe-info">
        <i class="fas fa-eye"></i>
        <span>{{ localRecipe.was_viewed ? "already viewed" : "not viewed" }}</span>
      </div>

      <!-- אינדיקציה למועדפים -->
      <div class="recipe-actions">
        <button @click.stop="toggleFavorite" title="Toggle Favorite">
          <i :class="localRecipe.is_favorite ? 'fas fa-heart favorite' : 'far fa-heart'"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, inject } from "vue";

export default {
  name: "RecipePreview",
  props: {
    recipe: { type: Object, required: true }
  },
  setup(props) {
    const localRecipe = ref({ ...props.recipe });
    const store = inject('store');

    watch(() => props.recipe, (newRecipe) => {
      localRecipe.value = { ...newRecipe };
    }, { deep: true });

    const toggleFavorite = async () => {
      if (!store?.username?.value) {
        alert("You must be logged in to add favorites.");
        return;
      }
      try {
        if (!localRecipe.value.is_favorite) {
          await window.axios.post("/user/favorites", {
            recipeId: localRecipe.value.id
          });
          localRecipe.value.is_favorite = true;
        } else {
          alert("Already in favorites.");
        }
      } catch (err) {
        console.error("Failed to mark as favorite:", err);
        alert("Failed to save recipe as favorite.");
      }
    };

    return { localRecipe, toggleFavorite };
  }
};
</script>

<style scoped>
.recipe-card {
  background: transparent;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 280px;
  height: 460px;
  max-width: 100%; 
  margin: auto;
  font-family: "Arial", sans-serif;
}
.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}
.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.recipe-body {
  padding: 14px;
  text-align: center;
}
.recipe-title {
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 12px;
}
.recipe-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 8px;
}
.recipe-info i {
  color: #666;
}
.recipe-actions button {
  border: none;
  background: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #444;
  transition: color 0.2s ease;
}
.recipe-actions .favorite {
  color: #e63946;
}
</style>
