window.addEventListener("load", function () {
  const municipios = axios
    .get("https://lpg-elecciones.ngrok.io/api/departamentos/1")
    .then(function (response) {
      console.log(response);
    });

  new Vue({
    el: "#app",
    data: {
      departamentos: ["Ahuachapan", "Sonsonate"],
    },
  });
});
