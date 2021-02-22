let MunicipalesSeleccion = {
  template: `
    <div>
      <div class="is-flex is-justify-content-center m-4">
        <div class="field">
          <label class="label">Departamento</label>
          <div class="control">
            <div class="select is-large is-link">
              <select
                v-model="departamentoSeleccionadoKey"
                @change="municipioSeleccionadoId = 0"
              >
                <option disabled selected value="0">
                  Selecciona departamento
                </option>
                <option
                  v-for="departamento in departamentosList"
                  :value="departamento"
                >
                  {{ departamento }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="is-flex is-justify-content-center m-4">
        <div class="field">
          <label class="label">Municipios</label>
          <div class="control">
            <div class="select is-large is-info">
              <select
                v-model.number="municipioSeleccionadoId"
                :disabled="municipiosList.length <= 0"
              >
                <option disabled selected value="0">
                  Selecciona municipio
                </option>
                <option
                  v-for="municipio in municipiosList"
                  :value="municipio.id"
                >
                  {{ municipio.municipio }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="is-flex is-justify-content-center m-4">
        <router-link
          :to="{ name: 'municipioData', params: { id: municipioSeleccionadoId } }"
          class="button is-large is-info"
          :disabled="municipioSeleccionadoId <= 0">
          Siguiente
        </router-link>
      </div>
    </div>
  `,
  data() {
    return {
      departamentos: {},
      departamentoSeleccionadoKey: "0",
      municipioSeleccionadoId: 0,
    };
  },
  mounted() {
    // Obtenmos la lista de departamentos con sus municipios.
    axios
      .get("https://lpg-elecciones.ngrok.io/api/departamentos")
      .then((response) => {
        if (response.data && response.data.status)
          this.departamentos = response.data.content;
      });
  },
  computed: {
    apiURL() {
      return this.$root.apiBaseURL;
    },
    departamentosList() {
      return Object.keys(this.departamentos);
    },
    municipiosList() {
      return this.departamentoSeleccionadoKey !== "0"
        ? this.departamentos[this.departamentoSeleccionadoKey]
        : [];
    },
    municipioSeleccionado() {
      if (
        this.municipioSeleccionadoId !== 0 &&
        this.departamentoSeleccionadoKey !== "0"
      ) {
        departamentos[this.departamentoSeleccionadoKey].filter(
          (v) => v.id === this.municipioSeleccionadoId
        );
      }
    },
  },
};
