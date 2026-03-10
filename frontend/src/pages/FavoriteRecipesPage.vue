<template>
  <div class="container">
    <h1 class="title">My Favorite Recipes</h1>
    <RecipePreviewList
      :recipes="favoriteRecipes"
      title=""
      :clickable="false"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';

export default {
  components: {
    RecipePreviewList
  },
  setup() {
    const favoriteRecipes = ref([]);

    const loadFavorites = async () => {
      try {
        const res = await window.axios.get('/user/favorites');
        favoriteRecipes.value = res.data;
      } catch (err) {
        console.error('Failed to load favorites:', err);
      }
    };

    onMounted(() => {
      loadFavorites();
    });

    return {
      favoriteRecipes
    };
  }
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
