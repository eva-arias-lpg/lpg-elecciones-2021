let Asamblea = {
  template: `
    <div class="container mt-6">
      <div class="box p-6">
        <p class="title is-2">Resultados Asamblea</p>
        <p class="subtitle is-5">
          Asegúrate de guardar tus cambios antes de salir de la página
        </p>
        <hr />
        <div class="field column ">
          <label class="label">PORCENTAJE DE ESCRUTINIO</label>
          <div class="control">
            <input
              v-model="partidos.porcentaje_escrutinio"
              :class="['input', partidos.porcentaje_escrutinio > 100 || partidos.porcentaje_escrutinio < 0 ? 'is-danger' : '']"
              type="text"
              placeholder="Escaños obtenidos"
              style="max-width: 250px; min-width: 250px"
            />
          </div>
        </div>
        <hr />
        <h3 class="title is-4 mb-0">Escaños por partidos políticos</h3>
        <div class="is-flex is-flex-wrap-wrap">
          <div
            class="column m-4"
            style="max-width: 250px; min-width: 250px"
            v-for="(value, name) in partidos.escanios"
          >
            <div class="field">
              <label class="label">{{ name }}</label>
              <div class="control">
                <input
                  :id="name"
                  v-model="partidos['escanios'][name]"
                  class="input"
                  type="text"
                  placeholder="Escaños obtenidos"
                  style="max-width: 250px; min-width: 250px"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="column m-4">
          <div class="field">
            <label class="label">TOTAL ESCAÑOS</label>
            <div class="control">
              <input
                id="total_escanios"
                readonly
                :value="totalEscanios"
                :class="['input is-static is-large', totalEscanios > 84 ? 'is-danger' : '']"
                type="text"
                placeholder="Total"
              />
            </div>
          </div>
        </div>
        <div class="is-flex is-justify-content-center">
          <button @click.prevent="" class="button is-success is-large">Guardar</button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      partidos: { escanios: {}, porcentaje_escrutinio: 0 },
    };
  },
  computed: {
    totalEscanios() {
      return Object.values(this.partidos.escanios).reduce((a, c) => +a + +c, 0);
    },
    apiURL() {
      return this.$root.apiBaseURL;
    },
  },
  mounted() {
    axios
      .get("https://lpg-elecciones.ngrok.io/api/asamblea")
      .then((response) => {
        console.log(response);
        this.partidos.escanios = response.data.escanios
          ? { ...response.data.escanios }
          : {};
        this.partidos.porcentaje_escrutinio = response.data
          .porcentaje_escrutinio
          ? response.data.porcentaje_escrutinio
          : 0;
      });
  },
  methods: {
    uploadCambiosAsamblea() {
      axios.post(this.apiURL + "/asamblea", this.partidos);
    },
  },
};
