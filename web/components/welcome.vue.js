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
          <a href="./asamblea" class="column block button is-medium is-link">Resultados Asamblea</a>
          <a href="./municipales" class="column block button is-medium is-info">Resultados Municipales</a>
        </div>
      </div>
    </div>
  `,
};
