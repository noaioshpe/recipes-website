<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="app-navbar">
    <b-navbar-brand to="/" tag="router-link" class="brand">Nav Bar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- צד שמאל: קישורים ראשיים -->
      <b-navbar-nav class="me-auto main-links">
        <b-nav-item to="/" tag="router-link">Home</b-nav-item>
        <b-nav-item to="/search" tag="router-link">Search</b-nav-item>
        <b-nav-item to="/about" tag="router-link">About</b-nav-item>
      </b-navbar-nav>

      <!-- צד ימין: משתמש / התחברות -->
      <b-navbar-nav class="user-links">
        <template v-if="store.username.value">
          <b-nav-text class="me-2 hello">Hello {{ store.username.value }}</b-nav-text>

          <b-nav-item-dropdown text="Personal Area" right toggle-class="nav-link">
            <b-dropdown-item to="/favorites" tag="router-link">My Favorites</b-dropdown-item>
            <b-dropdown-item to="/my-recipes" tag="router-link">My Recipes</b-dropdown-item>
            <b-dropdown-item to="/family" tag="router-link">Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item to="/create" tag="router-link">Create Recipe</b-nav-item>
          <b-nav-item @click="logout">Logout</b-nav-item>
        </template>

        <template v-else>
          <b-nav-text class="me-2">Hello guest</b-nav-text>
          <b-nav-item to="/login" tag="router-link">Login</b-nav-item>
          <b-nav-item to="/register" tag="router-link">Register</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: "NavBar",
  setup() {
    const store = window.store;
    const router = useRouter();

    const logout = async () => {
      try {
        await window.axios.post("/logout");
      } catch (err) {
        console.error("Logout failed", err);
      } finally {
        store.logout ? store.logout() : (store.username.value = null);
        router.replace('/');
      }
    };

    return { store, logout };
  },
};
</script>


<style scoped>
.app-navbar {
  --link-hover:   #6d28d9;
  --link-active:  #7c3aed;
  --cta-bg:       #0ea5e9;
  --cta-bg-hov:   #0284c7;
  --ink:          #1f2937;

  background: #fff;
  font-family: "Rubik","Heebo",system-ui,sans-serif;
  border-bottom: 2px solid #ccc;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.app-navbar :deep(.navbar-brand),
.app-navbar ::v-deep(.navbar-brand){
  font-weight:700;
  color: var(--link-active) !important;
  letter-spacing:.2px;
}

.app-navbar :deep(.navbar-nav .nav-link),
.app-navbar ::v-deep(.navbar-nav .nav-link){
  font-weight:600;
  color: var(--ink) !important;
  padding:.45rem .85rem;
  border-radius:999px;
  transition: background-color .18s, color .18s, transform .18s;
}

.app-navbar :deep(.navbar-nav .nav-item:hover),
.app-navbar ::v-deep(.navbar-nav .nav-item:hover){
  background-color: var(--link-hover) !important;
  border-radius:999px;
}

.app-navbar :deep(.navbar-nav .nav-item:hover > .nav-link),
.app-navbar ::v-deep(.navbar-nav .nav-item:hover > .nav-link){
  color:#fff !important;
  transform: translateY(-1px);
}
.app-navbar :deep(.navbar-nav .router-link-active),
.app-navbar :deep(.navbar-nav .router-link-exact-active),
.app-navbar ::v-deep(.navbar-nav .router-link-active),
.app-navbar ::v-deep(.navbar-nav .router-link-exact-active){
  background-color: var(--link-active) !important;
  color:#fff !important;
}

.hello{ font-weight:600; color: var(--link-active); }

.app-navbar :deep(.nav-cta > .nav-link),
.app-navbar ::v-deep(.nav-cta > .nav-link){
  background-color: var(--cta-bg) !important;
  color:#fff !important;
  font-weight:700;
  box-shadow: 0 6px 14px rgba(14,165,233,.25);
}

.app-navbar :deep(.nav-cta > .nav-link:hover),
.app-navbar ::v-deep(.nav-cta > .nav-link:hover){
  background-color: var(--cta-bg-hov) !important;
}

.me-2{ margin-inline-end:1rem; }
</style>
