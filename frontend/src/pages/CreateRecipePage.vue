<template>
  <div class="container">
    <div class="text-center my-4">
      <b-button variant="primary" @click="show = true">Create New Recipe</b-button>
    </div>

    <!-- Modal יצירת מתכון -->
    <b-modal v-model="show" title="Create Recipe" hide-footer @hidden="onHidden" size="lg">
      <b-form @submit.prevent="submitRecipe">
        <!-- Image URL -->
        <b-form-group label="Image URL">
          <b-form-input v-model="form.image" placeholder="https://..." />
        </b-form-group>

        <!-- Title -->
        <b-form-group label="Title">
          <b-form-input v-model="form.title" required />
        </b-form-group>

        <!-- time + servings -->
        <div class="row">
          <div class="col-md-6">
            <b-form-group label="time in minutes">
              <b-form-input v-model.number="form.prep_time_minutes" type="number" min="1" />
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="servings">
              <b-form-input v-model.number="form.servings" type="number" min="1" />
            </b-form-group>
          </div>
        </div>

        <!-- tags + gluten -->
        <div class="row">
          <div class="col-md-6">
            <b-form-group label="tags">
              <b-form-select
                v-model="form.tags"
                :options="[
                  { value: null, text: '— none —' },
                  { value: 'צמחוני', text: 'צמחוני' },
                  { value: 'טבעוני', text: 'טבעוני' }
                ]"
              />
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="gluten">
              <b-form-select
                v-model="form.has_gluten"
                :options="[
                  { value: true, text: 'contains' },
                  { value: false, text: 'gluten-free' }
                ]"
              />
            </b-form-group>
          </div>
        </div>

        <!-- Ingredients -->
        <b-form-group label="Ingredients list">
          <div v-for="(ing, i) in form.ingredients" :key="i" class="d-flex gap-2 mb-2">
            <b-form-input v-model="ing.amount" placeholder="amount (e.g. 2 cups)" class="me-2" />
            <b-form-input v-model="ing.name" placeholder="name (e.g. flour)" class="me-2" />
            <b-button size="sm" variant="outline-danger" @click="removeIngredient(i)">Remove</b-button>
          </div>
          <b-button size="sm" variant="outline-primary" @click="addIngredient">+ Add ingredient</b-button>
        </b-form-group>

        <!-- Instructions -->
        <b-form-group label="Instructions (one step per line)">
          <b-form-textarea
            v-model="form.instructions"
            rows="6"
            placeholder="Write each step on a new line"
          />
        </b-form-group>

        <!-- Actions -->
        <div class="d-flex justify-content-end gap-2">
          <b-button variant="secondary" @click="show = false">Cancel</b-button>
          <b-button type="submit" variant="success" :disabled="submitting">
            {{ submitting ? 'Saving…' : 'Save Recipe' }}
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance, inject } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CreateRecipePage',
  setup() {
    const router = useRouter();
    const show = ref(false);
    const submitting = ref(false);
    const store = inject('store'); 

    const emptyForm = () => ({
      image: '',
      title: '',
      prep_time_minutes: null,
      tags: null,          
      has_gluten: true,    
      ingredients: [{ name: '', amount: '' }],
      instructions: '',
      servings: null
    });

    const form = reactive(emptyForm());

    const addIngredient = () => form.ingredients.push({ name: '', amount: '' });
    const removeIngredient = (idx) => form.ingredients.splice(idx, 1);

    const { appContext } = getCurrentInstance();
    const toast = appContext.config.globalProperties.toast;

    const submitRecipe = async () => {
      if (!store?.username?.value) {
        alert('You must be logged in to create recipes.');
        return;
      }
      if (!form.title || !form.instructions || form.ingredients.length === 0) {
        alert('Please fill Title, Ingredients and Instructions.');
        return;
      }

      submitting.value = true;
      try {
        await window.axios.post('/recipes/new', {
          image: form.image,
          title: form.title,
          prep_time_minutes: form.prep_time_minutes,
          tags: form.tags,
          has_gluten: form.has_gluten,
          ingredients: form.ingredients,
          instructions: form.instructions,
          servings: form.servings
        });

        toast('Recipe created', 'Your recipe was saved successfully', 'success');
        show.value = false;
        router.push('/my-recipes');
        Object.assign(form, emptyForm());
      } catch (err) {
        const msg = err?.response?.data?.message || 'Failed to create recipe';
        toast('Error', msg, 'danger');
      } finally {
        submitting.value = false;
      }
    };

    const onHidden = () => Object.assign(form, emptyForm());

    onMounted(() => { show.value = true; });

    return {
      show, submitting, form,
      addIngredient, removeIngredient,
      submitRecipe, onHidden
    };
  }
};
</script>

<style scoped>
.gap-2 { gap: .5rem; }

.modal-content {
  border-radius: 1rem;          
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  border: none;
}

.modal-header {
  border-bottom: 2px solid #f2f2f2;
  font-weight: 600;
  font-size: 1.25rem;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.3rem;
}

.form-control {
  border-radius: 0.6rem;
  border: 1px solid #ddd;
  transition: border-color 0.2s;
}
.form-control:focus {
  border-color: #6f42c1; 
  box-shadow: 0 0 0 0.2rem rgba(111,66,193,.15);
}

.ingredient-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.btn {
  border-radius: 0.6rem;
}

.btn-outline-danger {
  font-size: 0.85rem;
  padding: 0.25rem 0.6rem;
}

.btn-outline-primary {
  font-size: 0.85rem;
  padding: 0.25rem 0.6rem;
}

.modal-footer {
  border-top: none;
  padding-top: 0;
}

</style>