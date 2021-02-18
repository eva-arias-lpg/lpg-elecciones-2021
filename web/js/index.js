let Navigation = {
  data: function () {
    return {};
  },
  template: `<nav
    class="navbar is-info"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="https://laprensagrafica.com">
        <img src="assets/images/lpg-logo.png" width="150" height="30" />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navBarMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navBarMenu" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item"></div>

        <a class="navbar-item has-text-weight-bold"> Diputados </a>

        <a class="navbar-item has-text-weight-bold"> Municipales </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-light">
              <span class="icon is-small">
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <span>Salir</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>`,
};

window.addEventListener("load", function () {
  new Vue({
    el: "#app",
    components: {
      navigation: Navigation,
    },
    data: {
      dptoData: {},
    },
    computed: {
      departamentos() {
        return Object.keys(this.dptoData);
      },
    },
    mounted() {
      axios
        .get("https://lpg-elecciones.ngrok.io/api/departamentos")
        .then(
          (response) =>
            (this.dptoData =
              response.data && response.data.status
                ? response.data.content
                : {})
        );
    },
    methods: {},
  });
});
