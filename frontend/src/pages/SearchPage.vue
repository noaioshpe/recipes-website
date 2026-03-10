<template>
  <div class="page-frame">
    <div class="card-clean content-card wide">
      <h2 class="title text-center">📖Search Recipes</h2>

      <div class="search-grid">
        <!-- form -->
        <form @submit.prevent="searchRecipes" class="search-form">
          <!-- Query -->
          <div class="form-group">
            <label>🔎 Search Query</label>
            <input v-model="query" type="text" class="form-input" required />
          </div>

          <!-- Cuisine -->
          <div class="form-group">
            <label>🍲 Cuisine</label>
            <select v-model="cuisine" class="form-input">
              <option value="">-- Any --</option>
              <option v-for="c in cuisines" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>

          <!-- Diet -->
          <div class="form-group">
            <label>🥗 Diet</label>
            <select v-model="diet" class="form-input">
              <option value="">-- Any --</option>
              <option v-for="d in diets" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>

          <!-- Intolerances -->
          <div class="form-group">
            <label>⚠ Intolerances</label>
            <select v-model="intolerances" class="form-input">
              <option value="">-- Any --</option>
              <option v-for="i in intolerancesOptions" :key="i" :value="i">{{ i }}</option>
            </select>
          </div>


          <!-- Number of Results -->
          <div class="form-group">
            <label>🔢 Number of Results</label>
            <select v-model="number" class="form-input">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary w-100 mt-2">🔍 Search</button>
        </form>

        <!-- image -->
        <div class="chef-image">
          <img src="@/assets/chef.jpg" alt="Chef" />
        </div>
      </div>

      <!-- results -->
      <div v-if="recipes.length > 0" class="mt-4">
        <RecipePreviewList :recipes="recipes" title="Search Results" :clickable="true" />
      </div>
      <div v-else-if="searched" class="mt-3">
        <p>No results found.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import RecipePreviewList from '@/components/RecipePreviewList.vue';

export default {
  name: 'SearchPage',
  components: { RecipePreviewList },
  setup() {
    const query = ref('');
    const cuisine = ref('');
    const diet = ref('');
    const intolerances = ref('');
    const number = ref(5);
    const searched = ref(false);
    const recipes = ref([]);

    const cuisines = [
      'African','Asian','American','British','Cajun','Caribbean','Chinese',
      'Eastern European','European','French','German','Greek','Indian','Irish',
      'Italian','Japanese','Jewish','Korean','Latin American','Mediterranean',
      'Mexican','Middle Eastern','Nordic','Southern','Spanish','Thai','Vietnamese'
    ];
    const diets = [
      'Gluten Free','Ketogenic','Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian',
      'Vegan','Pescetarian','Paleo','Primal','Low FODMAP','Whole30'
    ];
    const intolerancesOptions = [
      'Dairy','Egg','Gluten','Grain','Peanut','Seafood','Sesame','Shellfish',
      'Soy','Sulfite','Tree Nut','Wheat'
    ];

    const searchRecipes = async () => {
    try {
      const res = await window.axios.get('/recipes/search', {
        params: {
          query: query.value,
          cuisine: cuisine.value,
          diet: diet.value,
          intolerances: intolerances.value,
          number: number.value
        }
      });

      recipes.value = res.data.recipes.map(r => ({
        ...r,
        source: 'external'
      }));

    } catch (err) {
      recipes.value = [];
      console.error(err);
    } finally {
      searched.value = true;
    }
  };

    return {
      query, cuisine, diet, intolerances, number,
      searched, recipes, cuisines, diets, intolerancesOptions,
      searchRecipes
    };
  }
};
</script>

<style scoped>
.search-grid{
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 28px;
  align-items: start;
}

.search-form{ display: flex; flex-direction: column; gap: 14px; }
.form-group{ display: flex; flex-direction: column; }
.form-group > label{ font-weight: 700; color: #1f2937; margin-bottom: .35rem; }

.form-input{
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
}

.chef-image{ display:flex; align-items:center; justify-content:center; }
.chef-image img{ max-height: 240px; object-fit: contain; }

@media (max-width: 768px){
  .search-grid{ grid-template-columns: 1fr; }
}
</style>