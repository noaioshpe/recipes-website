<template>
  <div class="container-fluid page">
    <h1 class="page-title text-center">🌐Main Page</h1>

    <div class="main-grid">
    <div class="row g-4 align-items-stretch">
      <!-- Left: Random recipes -->
      <div class="col-md-6">
        <div class="card-clean p-4 h-100">
          <h2 class="title mb-3 text-center">Explore these recipes</h2>

          <RecipePreviewList :recipes="randomRecipes" />

          <div class="text-center mt-3">
            <button class="btn btn-primary" @click="loadRandomRecipes">Load New</button>
          </div>
        </div>
      </div>

      <!-- Right: LoginForm or ViewedRecipes -->
      <div class="col-12 col-lg-6 d-flex">
        <div class="card-clean p-4 w-100">

          <template v-if="store?.username?.value">
            <h2 class="title mb-3 text-center">Last watched recipes</h2>
            <RecipePreviewList :recipes="viewedRecipes" />
          </template>

          <template v-else>
            <LoginForm @logged-in="loadViewedRecipes" />
          </template>
        
        </div>
      </div>
    </div>
  </div>
  </div>
      
</template>

<script>
import { ref, onMounted, watch, inject } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";
import LoginForm from '../components/LoginForm.vue';
import "../scss/theme.scss";

export default {
  components: {
    RecipePreviewList,
    LoginForm
  },
  setup() {
    const store = inject('store');
    
    const randomRecipes = ref([]);
    const viewedRecipes = ref([]);

    const loadRandomRecipes = async () => {
      try {
        const res = await window.axios.get('/recipes/3random');
        randomRecipes.value = res.data.recipes;
      } catch (err) {
        console.error("Failed to load random recipes", err);
      }
    };

    const loadViewedRecipes = async () => {
      try {
        const res = await window.axios.get('/user/recent');
        
        const unique = res.data.recipes.filter(
          (r, index, self) =>
            index === self.findIndex((x) => x.id === r.id)
        );
        
        viewedRecipes.value = unique.slice(0, 3);
      } catch (err) {
        console.error('Failed to load viewed recipes', err);
      }
    };


    onMounted(async () => {
      console.log("username:", store?.username?.value);

      await loadRandomRecipes();
      if (store?.username?.value) {
        await loadViewedRecipes();
      }
    });
    
    if (store?.username) {
      watch(
        () => store.username.value,
        async (newUsername) => {
          if (newUsername) {
            await loadViewedRecipes();
          } else {
            viewedRecipes.value = [];
          }
        }
      );
    }

    return { store, randomRecipes, viewedRecipes, loadRandomRecipes, loadViewedRecipes };
  }
};
</script>

<style scoped>
.card-clean {
  height: 100%;
  background: none !important;  
  box-shadow: none !important;   
  border: none !important;       
}

.page {
  min-height: 100vh;
  padding: 30px 15px;
  font-family: 'Poppins','Assistant',sans-serif;
}

.page::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: var(--band-h);
  background: linear-gradient(180deg, rgba(109, 80, 255, .18), rgba(109, 80, 255, 0));
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  pointer-events: none;
}

.page-title {
  position: absolute;
  top: calc(var(--band-h) / 2 - 6px);
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;

  color: #342c56;
  background: none !important;
  -webkit-background-clip: initial !important;
  background-clip: initial !important;
  -webkit-text-fill-color: currentColor !important;

  font-weight: 800;
}

</style>