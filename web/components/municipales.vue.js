let Municipales = {
  template: `
    <div class="container mt-6">
      <div class="box p-6">
        <p class="title is-2">Resultados Municipales</p>
        <p class="subtitle is-5">
          Asegúrate de guardar tus cambios antes de salir de la página
        </p>
        <hr />
        <router-view></router-view>
      </div>
    </div>
  `,
  data() {
    return {};
  },
  computed: {
    // changesToAsamblea() {
    //   let changes = { escanios: {} };
    //   // Comparamos los cambios en el objeto "escanios"
    //   for (let key of Object.keys(this.asamblea_original["escanios"])) {
    //     if (
    //       this.asamblea_original.escanios[key] !== this.asamblea.escanios[key]
    //     ) {
    //       changes.escanios[key] = this.asamblea.escanios[key];
    //     }
    //   }
    //   // por ultimo, porcentaje escrutinio...
    //   if (
    //     this.asamblea_original.porcentaje_escrutinio !==
    //     this.asamblea.porcentaje_escrutinio
    //   ) {
    //     changes.porcentaje_escrutinio = this.asamblea.porcentaje_escrutinio;
    //   }
    //   return changes;
    // },
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
