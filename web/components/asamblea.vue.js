let Asamblea = {
  template: `
    <div class="container mt-6">
      <div class="box p-6">
        <p class="title is-2">Resultados Asamblea</p>
        <p class="subtitle is-5">
          Asegúrate de guardar tus cambios antes de salir de la página
        </p>
        <hr />
        <div class="field column">
          <label class="label">PORCENTAJE DE ESCRUTINIO</label>
          <div class="control">
            <input
              v-model="asamblea.porcentaje_escrutinio"
              :class="['input', asamblea.porcentaje_escrutinio > 100 || asamblea.porcentaje_escrutinio < 0 ? 'is-danger' : '']"
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
            v-for="(value, name) in asamblea.escanios"
          >
            <div class="field">
              <label class="label">{{ name }}</label>
              <div class="control">
                <input
                  :id="name"
                  v-model.number="asamblea['escanios'][name]"
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
                :class="['input is-static is-large', totalEscanios > 84 ? 'has-text-danger' : '']"
                type="text"
                placeholder="Total"
              />
            </div>
          </div>
        </div>
        <article v-if="showUploadFailMsg" class="message is-danger">
          <div class="message-body">
            Ocurrió un error al subir los cambios.<br />
            {{ uploadErrorMsg != '' ? uploadErrorMsg : 'Error inesperado.' }}
          </div>
        </article>

        <article v-if="showUploadSuccessMsg" class="message is-success">
          <div class="message-body">¡Se han subido los cambios con éxito!</div>
        </article>

        <div class="is-flex is-justify-content-center">
          <button
            @click.prevent="uploadCambiosAsamblea"
            :class="['button is-success is-large', isBtnLoading ? 'is-loading' : '' ]"
            :disabled="totalEscanios > 84"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      asamblea: { escanios: {}, porcentaje_escrutinio: 0 },
      asamblea_original: { escanios: {}, porcentaje_escrutinio: 0 },
      isBtnLoading: false,
      showUploadSuccessMsg: false,
      showUploadFailMsg: false,
      uploadErrorMsg: "",
    };
  },
  computed: {
    totalEscanios() {
      return Object.values(this.asamblea.escanios).reduce((a, c) => +a + +c, 0);
    },
    apiURL() {
      return this.$root.apiBaseURL;
    },
    changesToAsamblea() {
      let changes = { escanios: {} };
      // Comparamos los cambios en el objeto "escanios"
      for (let key of Object.keys(this.asamblea_original["escanios"])) {
        if (
          this.asamblea_original.escanios[key] !== this.asamblea.escanios[key]
        ) {
          changes.escanios[key] = this.asamblea.escanios[key];
        }
      }

      // por ultimo, porcentaje escrutinio...
      if (
        this.asamblea_original.porcentaje_escrutinio !==
        this.asamblea.porcentaje_escrutinio
      ) {
        changes.porcentaje_escrutinio = this.asamblea.porcentaje_escrutinio;
      }

      return changes;
    },
  },
  mounted() {
    axios
      .get("https://lpg-elecciones.ngrok.io/api/asamblea")
      .then((response) => {
        console.log(response);
        this.asamblea.escanios = response.data.escanios
          ? { ...response.data.escanios }
          : {};
        this.asamblea.porcentaje_escrutinio = response.data
          .porcentaje_escrutinio
          ? response.data.porcentaje_escrutinio
          : 0;

        this.asamblea_original.escanios = response.data.escanios
          ? { ...response.data.escanios }
          : {};
        this.asamblea_original.porcentaje_escrutinio = response.data
          .porcentaje_escrutinio
          ? response.data.porcentaje_escrutinio
          : 0;
      });
  },
  methods: {
    uploadCambiosAsamblea() {
      this.isBtnLoading = true;
      axios
        .post(this.apiURL + "/asamblea", this.changesToAsamblea)
        .then((response) => {
          console.log(response);
          this.isBtnLoading = false;

          if (response.data && response.data.status) {
            this.showUploadSuccessMsg = true;
            this.asamblea = response.data.content;
          } else if (response.data.hasOwnProperty("content")) {
            this.showUploadFailMsg = true;
            this.uploadErrorMsg = response.data.content;
          }
          setInterval(() => {
            (this.showUploadFailMsg = false),
              (this.showUploadSuccessMsg = false),
              (this.uploadErrorMsg = "");
          }, 15000);
        });
    },
  },
};
