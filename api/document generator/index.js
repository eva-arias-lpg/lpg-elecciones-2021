const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const partidos = {
  NUESTRO_TIEMPO: { img_bandera: "/resources/banderas/NT_flag.svg" },
  FMLN: { img_bandera: "/resources/banderas/FMLN_flag.svg" },
  NUEVAS_IDEAS: { img_bandera: "/resources/banderas/NI_flag.svg" },
  PDC: { img_bandera: "/resources/banderas/PDC_flag.svg" },
  VAMOS: { img_bandera: "/resources/banderas/VAMOS_flag.svg" },
  PCN: { img_bandera: "/resources/banderas/PCN_flag.svg" },
  GANA: { img_bandera: "/resources/banderas/GANA_flag.svg" },
  CD: { img_bandera: "/resources/banderas/CD_flag.svg" },
  ARENA: { img_bandera: "/resources/banderas/ARENA_flag.svg" },
};

let departamentos = {};
const municipales = [];

function uc_words(text) {
  return text
    .split(" ")
    .reduce(
      (a, c) => a + c.charAt(0).toUpperCase() + c.slice(1, c.length) + " ",
      ""
    )
    .trim();
}

fs.createReadStream(path.resolve(__dirname, "assets", "municipios.csv"))
  .pipe(csv.parse({ headers: true, delimiter: ";", encoding: "latin1" }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    // console.log(row);
    let idDocumento = parseInt(row.idMunicipio, 10),
      departamento = row["Departamento"].replace(/-/gi, " "),
      municipio = row["Municipio"].replace(/-/gi, " ");

    let document = {
      id: idDocumento,
      departamento: row.dpto_desc,
      municipio: row.muni_desc,
      municipio_normalizado: municipio,
      departamento_normalizado: departamento,
      img_municipio: encodeURI(
        `static/images/municipios/${departamento.toUpperCase()}/${municipio
          .toLowerCase()
          .replace(/ /g, "")}_map.svg`
      ),
      ganador: {
        partido: null,
        candidato: null,
        img_partido: null,
      },
      partidos_participantes: {},
    };

    // Agregamos los partidos participantes al document
    for (let [key, value] of Object.entries(partidos)) {
      if (row.hasOwnProperty(key.replace(/_/, " ")) && row[key] !== "")
        document.partidos_participantes[key] = value;
    }

    fs.writeFileSync(
      path.resolve("..", "documents", `${idDocumento}.json`),
      JSON.stringify(document, null, 2),
      { encoding: "latin1" }
    );

    // Agregamos la entrada al JSON de Departamentos
    let municipioData = {
      id: document.id,
      departamento: document.departamento,
      municipio: document.municipio,
      departamento_normalizado: document.departamento_normalizado,
      municipio_normalizado: document.municipio_normalizado,
      img_municipio: document.img_municipio,
    };

    if (!departamentos.hasOwnProperty(departamento.toUpperCase())) {
      departamentos[departamento.toUpperCase()] = [];
    }

    // Agregamos la entrada al listado del departamento
    departamentos[departamento.toUpperCase()].push(municipioData);

    // Agregamos la entrada al listado de municipales
    municipales.push(document);

    console.log(
      `${document.id}\t${document.departamento} [${row.numero}]\t${document.municipio}\n`
    );
  })
  .on("end", (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
    // Guardamos el JSON consolidad de municipios y departamentos
    fs.writeFileSync(
      path.resolve("../", "static", `municipios.json`),
      JSON.stringify({ index: [...municipales] }, null, 2),
      { encoding: "latin1" }
    );
    fs.writeFileSync(
      path.resolve("../", "static", `departamentos.json`),
      JSON.stringify({ ...departamentos }, null, 2),
      { encoding: "latin1" }
    );
  });
