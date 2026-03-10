<template>
  <div class="page container-narrow">
    <div class="card-clean p-4 w-100">
      <h1 class="title text-center">🌍About Our Project</h1>

      <p>
        This web application was developed as part of the web development environments course.<br />
        The goal of the project is to provide users with a platform to explore, save, and manage recipes - 
        both from external sources and personal creations.
      </p>

      <p>
        The system supports features such as user authentication, favorite recipes, recently viewed recipes,
        family recipes, and personal recipe creation with images and preparation steps.
      </p>

      <h2 class="title">Development Team</h2>
      <ul class="pretty-bullets">
        <li>Noa Ioshpe</li>
        <li>Noa Revivo</li>
      </ul>

      <h2 class="title">Project Repositories</h2>
      <p>
        <a class="pill-link" href="https://wed-2023.github.io/318773876/" target="_blank">
          Noa Ioshpe first website
        </a>
      </p>
      <p>
        <a class="pill-link" href="https://wed-2023.github.io/314940453/" target="_blank">
          Noa Revivo first website
        </a>
      </p>
      <p>
        <a class="pill-link" href="https://wed-2023.github.io/assignment2-318773876_314940453_assignment2/" target="_blank">
          SpaceShip Game
        </a>
      </p>
      <p>
        <a class="pill-link" href="https://github.com/WED-2023/assignment3-2-318773876_314940453_assignment2" target="_blank">
          GitHub Repository Part 3-2 Backend
        </a>
      </p>
      <p>
        <a class="pill-link" href="https://github.com/WED-2023/assignment3-3-318773876_314940453_assignment2.git" target="_blank">
          GitHub Repository Part 3-3 Frontend
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default { name: "AboutPage" };
</script>

<style scoped>
.pretty-bullets { list-style: none; padding: 0; margin: .25rem 0 1rem; }
.pretty-bullets li { position: relative; padding-left: 1.15rem; margin: .35rem 0; }
.pretty-bullets li::before { content: "•"; position: absolute; left: 0; top: 0; color: #7c3aed; font-weight: 900; }

.pill-link {
  color: #7c3aed; text-decoration: none; font-weight: 650;
  border-bottom: 2px solid transparent; border-radius: 10px; padding: 2px 6px;
  transition: color .18s, background-color .18s, border-color .18s, transform .18s;
}
.pill-link:hover {
  color: #fff; background: #6d28d9; border-color: #6d28d9; transform: translateY(-1px);
}
</style>
