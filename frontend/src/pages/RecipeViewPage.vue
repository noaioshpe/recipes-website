<template>
  <div class="recipe-page container my-4" v-if="recipe">
    <!-- כותרת -->
    <h1 class="page-title text-center mb-4">{{ recipe.title }}</h1>

    <!-- תמונה -->
    <div class="recipe-image-box mb-4">
      <img :src="recipe.image" class="recipe-image" alt="recipe image" />
    </div>

    <!-- פרטים -->
    <div class="meta d-flex justify-content-center gap-4 flex-wrap mb-4">
      <span>⏱ <b>{{ recipe.prep_time_minutes || recipe.readyInMinutes }}</b> min</span>
      <span>🍽 <b>{{ recipe.servings || "—" }}</b> servings</span>
      <span>🏷 <b>{{ recipe.tags || "none" }}</b></span>

       <!-- צמחוני -->
      <span v-if="recipe.is_vegetarian">
        🌱 <b>צמחוני</b>
      </span>

      <span v-if="recipe.has_gluten !== undefined">
        🌾 <b>{{ recipe.has_gluten ? "contains" : "gluten-free" }}</b>
      </span>
      
      <span>👁 viewed: <b>{{ recipe.was_viewed ? "✔" : "—" }}</b></span>
      <span>⭐ favorite: <b>{{ recipe.is_favorite ? "★" : "—" }}</b></span>
    </div>

    <!-- מצרכים והוראות -->
    <div class="row g-4">
      <!-- מצרכים -->
      <div class="col-md-5">
        <div class="card-clean p-4 h-100">
          <h4 class="title">Ingredients</h4>
          <ul class="ingredients">
            <li v-for="(ing, index) in recipe.ingredients" :key="index">
              <span class="name">{{ ing.name }}</span>
              <span class="sep"> — </span>
              <bdi class="amount">{{ ing.amount }}</bdi>
            </li>
          </ul>
        </div>
      </div>

      <!-- הוראות -->
      <div class="col-md-7">
        <div class="card-clean p-4 h-100">
          <h4 class="title">Instructions</h4>
          <ol>
            <li
              v-for="(step, index) in recipe.instructions.split('. ').filter(Boolean)"
              :key="index"
            >
              {{ step }}.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeViewPage",
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    const recipeId = this.$route.params.recipeId;
    const source = this.$route.query.source;

    try {
      const response = await this.axios.get(
        this.$root.store.server_domain + "/recipes/" + recipeId,
        { params: { source } }
      );

      if (response.status !== 200) {
        this.$router.replace("/NotFound");
        return;
      }

      this.recipe = response.data;
    } catch (error) {
      console.error(error);
      this.$router.replace("/NotFound");
    }
  },
};
</script>

<style scoped>
.page-title {
  font-family: "Rubik","Heebo",sans-serif;
  font-weight: 800;
  font-size: clamp(28px, 4vw, 40px);
  background: linear-gradient(90deg,#111827 0%,#7c3aed 65%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.recipe-image-box {
  text-align: center;
}
.recipe-image {
  max-width: 600px;
  width: 100%;
  border-radius: 18px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.meta span {
  font-size: 1rem;
  color: #475569;
}
.meta b {
  color: #0f172a;
}

.card-clean {
  background: #fff;
  border: 1px solid rgba(0,0,0,.05);
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(0,0,0,.08);
}
.title {
  font-family: "Rubik","Heebo",sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 1rem;
  color: #334155;
}

.ingredients {
  padding-left: 1rem;
  line-height: 1.6;
}
.ingredients .name { font-weight: 500; }
.ingredients .sep { opacity: .6; margin: 0 4px; }
.ingredients .amount { color: #555; }

ol {
  padding-left: 1.2rem;
  line-height: 1.6;
}
</style>
