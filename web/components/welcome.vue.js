let Welcome = {
  data: function () {
    return {};
  },
  template: `
    <div class="container mt-6">
      <div class="box p-6">
        <p class="title is-2">¡Bienvenido!</p>
        <p class="subtitle is-5">
          Selecciona qué resultado electoral deseas administrar.
        </p>
        <div style="max-width: 350px">
          <router-link to="asamblea" class="column block button is-medium is-link">Resultados Asamblea</router-link>
          <router-link to="municipales" class="column block button is-medium is-info">Resultados Municipales</router-link>
        </div>
      </div>
    </div>
  `,
};
