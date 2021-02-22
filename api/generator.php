<?php
// Script para generar los documentos JSON de referencia

function replaceAccentOnVowels($stringToReplace) {
  $unwanted_accents = [
    'á' => 'a',
    'é' => 'e',
    'í' => 'i',
    'ó' => 'o',
    'ú' => 'u',
    'ñ' => 'n'
  ];

  $stringToReplace = strtolower($stringToReplace);
  return strtr($stringToReplace, $unwanted_accents);
}

$reference = file_get_contents("static/municipios.json");
$municipios = json_decode($reference, true);

foreach ($municipios["index"] as $key => $value) {
  $departamento = $value["departamento"];
  $municipio = $value["municipio"];
  $departamento_uc = strtoupper(replaceAccentOnVowels($departamento));
  $municipio_filename = str_replace(/ /g, "", replaceAccentOnVowels($municipio)) . "_map.svg";

  $json = json_encode([
    "departamento" => $departamento,
    "municipio" => $municipio,
    "img_municipio" => "static/images/municipios/$departamento_uc/$municipio_filename",
    "ganador" => [
      "partido" => null,
      "img_partido" => "resources/banderas/art_flag.svg",
      "id_partido" => null,
      "candidato" => null,
    ]
  ], JSON_PRETTY_PRINT);

  file_put_contents("documents/$value[id].json", $json);
}

// $departamentos = [
//   "Ahuachapán",
//   "Cabañas",
//   "Chalatenango",
//   "Cuscatlán",
//   "La Libertad",
//   "La Paz",
//   "La Unión",
//   "Morazán",
//   "San Miguel",
//   "San Salvador",
//   "San Vicente",
//   "Santa Ana",
//   "Sonsonate",
//   "Usulután"
// ];

// $reference = file_get_contents("static/municipios.json");
// $municipios = json_decode($reference, true);
// $municipios = $municipios["index"];

// foreach ($departamentos as $key => $value) {
//   echo $value;
//   $filtered_municipios = array_filter($municipios, function($v, $value) {
//     return $v["departamento"] === $value;
//   });
//   print_r($filtered_municipios);
//   // $json = json_encode([

//   // ], JSON_PRETTY_PRINT);
// }