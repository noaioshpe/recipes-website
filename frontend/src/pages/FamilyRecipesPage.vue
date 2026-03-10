<template>
  <div class="container">
    <h1 class="title">My Family Recipes</h1>

    <div v-if="familyRecipes.length === 0">
      <p class="text-center">עדיין אין מתכונים משפחתיים.</p>
    </div>
    
    <div v-else class="recipe-grid">
      <div
        v-for="r in familyRecipes"
        :key="r.recipe_id"
        class="recipe-card"
      >
        <!-- תמונה -->
        <img
          :src="r.image_url"
          alt="recipe image"
          class="recipe-image"
          @error="e => e.target.src = 'https://via.placeholder.com/280x200?text=No+Image'"
        />

        <!-- גוף הכרטיס -->
        <div class="recipe-body">
          <h5 class="recipe-title">{{ r.recipe_name }}</h5>

          <div class="recipe-info rtl">
            <i class="fas fa-user"></i>
            <span><strong>של מי המתכון:</strong> {{ r.owner }}</span>
          </div>

          <div class="recipe-info rtl">
            <i class="fas fa-calendar-alt"></i>
            <span><strong>מתי מכינים:</strong> {{ r.when_prepared }}</span>
          </div>

          <!-- מרכיבים -->
          <div class="recipe-info rtl ing-list">
            <i class="fas fa-carrot"></i>
            <div>
              <strong>מרכיבים:</strong>
              <ul>
                <li v-for="(ing, i) in parseIngredients(r.ingredients)" :key="i">
                  <span class="ing-name">{{ ing.name }}</span>
                  <span v-if="ing.amount" class="sep"> — </span>
                  <span class="ing-amount" v-if="ing.amount">{{ ing.amount }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="recipe-info rtl">
            <i class="fas fa-utensils"></i>
            <span><strong>אופן הכנה:</strong> {{ r.preparation_method }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'MyFamilyRecipesPage',
  setup() {
    const familyRecipes = ref([]);

    const parseIngredients = (text = '') => {
      return text
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .map(item => {
          const m = item.match(/^(.*?)\s*\((.*?)\)\s*$/);
          return m ? { name: m[1], amount: m[2] } : { name: item, amount: '' };
        });
    };

    const loadFamilyRecipes = async () => {
      try {
        const res = await window.axios.get('/user/family');
        familyRecipes.value = res.data.recipes;
      } catch (err) {
        console.error('❌ Failed to load family recipes:', err);
      }
    };

    onMounted(loadFamilyRecipes);

    return { familyRecipes, parseIngredients };
  }
};
</script>

<style scoped>
.title {
  margin: 20px 0;
  text-align: center;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.recipe-card {
  background: transparent;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 280px;
  height: auto;
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
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6px;
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 10px;
}

.recipe-info i {
  color: #666;
  margin-top: 4px;
}

.rtl {
  direction: rtl;
  text-align: right;
}

.ing-list ul {
  margin: .35rem 0 0;
  padding-right: 1.2rem;
  padding-left: 0;
  list-style: disc;
}

.ing-list li {
  margin: .25rem 0;
  line-height: 1.5;
}
.ing-name { font-weight: 600; }
.sep { margin: 0 .3rem; opacity: .8; }
.ing-amount { color: #444; }
</style>
