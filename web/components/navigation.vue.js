let Navigation = {
  data: function () {
    return {};
  },
  template: `<nav
    class="navbar is-info"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://laprensagrafica.com">
          <img src="/web/assets/images/lpg-logo.png" width="150" height="30" />
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

          <router-link class="navbar-item has-text-weight-bold" to="asamblea"> Resultados Asamblea </router-link>

          <router-link to="municipales" class="navbar-item has-text-weight-bold">
            Resultados Municipales
          </router-link>
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
    </div>
  </nav>`,
};
