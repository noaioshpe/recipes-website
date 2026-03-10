<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
    <RecipePreviewList
      :recipes="myRecipes"
      title=""
      :clickable="true"
    />
  </div>
</template>

<script>
import { onMounted, ref, onActivated } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import RecipePreviewList from '../components/RecipePreviewList.vue';

export default {
  components: {
    RecipePreviewList
  },
  setup() {
    const myRecipes = ref([]);
    const loading = ref(false);

    const loadMyRecipes = async () => {
      loading.value = true;
      try {
        const res = await window.axios.get('/user/recipes');
        myRecipes.value = res.data.recipes;
      } catch (err) {
        console.error('Failed to load my recipes:', err);
      }
      finally {
        loading.value = false;
      }
    };

    // first load
    onMounted(loadMyRecipes);

    onActivated(loadMyRecipes);

    onBeforeRouteUpdate((to, from, next) => {
      loadMyRecipes().finally(() => next());
    });
    
    return {
      myRecipes,
      loading,
      loadMyRecipes
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