let MunicipalesData = {
  template: `
    <div>
      <div class="content is-flex is-justify-content-space-between">
        <router-link
          :to="{ name: 'municipioSeleccion'}"
          class="button is-normal is-info is-light"
        >
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
          <span> Regresar </span>
        </router-link>
        <div>{{ $route.params.id }}</div>
      </div>
      <div>
        <p class="title is-3 has-text-centered">{{ municipio.municipio }}</p>
        <p class="subtitle is-6 has-text-centered">
          Municipio de {{ municipio.departamento }}
        </p>
      </div>
      <div class="is-flex is-justify-content-center mt-3">
        <img
          :src="apiURL + '/' + municipio.img_municipio"
          alt=""
          style="margin:auto; max-width: 300px; max-height: 300px"
        />
      </div>
      <hr />
      <p class="mt-5 title is-3">Ganador</p>
      <div id="resultados" class="mt-5">
        <div class="field">
          <label class="label is-uppercase">Nombre del Candidato Ganador</label>
          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="Nombre del Candidato"
              style="max-width: 450px"
            />
          </div>
        </div>
        <p class="label is-uppercase">Partido Ganador</p>
        <div class="is-flex is-flex-wrap-wrap">
          <div v-for="partido in partidos" :key="partido.nombre" class="card">
            <div class="card-image">
              <figure class="image is-128x128">
                <img
                  :src="apiURL + '/' + partido.img"
                  :alt="'Bandera del ' + partido.nombre"
                />
              </figure>
            </div>
            <div class="card-content">
              <div class="media-content">
                <p class="title is-4">{{ partido.nombre }}</p>
                <p class="subtitle is-6">@johnsmith</p>
              </div>

              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                <a href="#">#css</a> <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      partidos: [
        {
          nombre: "ARENA",
          img: "resources/banderas/ARENA_flag.svg",
        },
        {
          nombre: "CD",
          img: "resources/banderas/CD_flag.svg",
        },
        {
          nombre: "DS",
          img: "resources/banderas/DS_flag.svg",
        },
        {
          nombre: "FPS",
          img: "resources/banderas/FPS_flag.svg",
        },
        {
          nombre: "FMLN",
          img: "resources/banderas/FMLN_flag.svg",
        },
        {
          nombre: "GANA",
          img: "resources/banderas/GANA_flag.svg",
        },
        {
          nombre: "NI",
          img: "resources/banderas/NI_flag.svg",
        },
        {
          nombre: "NT",
          img: "resources/banderas/NT_flag.svg",
        },
        {
          nombre: "PCN",
          img: "resources/banderas/PCN_flag.svg",
        },
        {
          nombre: "PDC",
          img: "resources/banderas/PDC_flag.svg",
        },
        {
          nombre: "PSD",
          img: "resources/banderas/PSD_flag.svg",
        },
        {
          nombre: "PSP",
          img: "resources/banderas/PSP_flag.svg",
        },
        {
          nombre: "VAMOS",
          img: "resources/banderas/VAMOS_flag.svg",
        },
      ],
      municipio: {},
    };
  },
  computed: {
    apiURL() {
      return this.$root.apiPublicBaseURL;
    },
  },
  mounted() {
    axios
      .get(this.apiURL + "/municipales/" + this.$route.params.id)
      .then((response) => {
        if (response.data && typeof response.data === "object") {
          this.municipio = response.data;
        }
      });
  },
};
