<?php
header('Content-Type: application/json;charset=utf8');
error_reporting(0);

$dpto_index = [
  "AHUACHAPAN",
  "CABANAS",
  "CHALATENANGO",
  "CUSCATLAN",
  "LA LIBERTAD",
  "LA PAZ",
  "LA UNION",
  "MORAZAN",
  "SAN MIGUEL",
  "SAN SALVADOR",
  "SAN VICENTE",
  "SANTA ANA",
  "SONSONATE",
  "USULUTAN"
];

$idDepartamento = isset($_GET['id']) ? intval($_GET['id']) : 0;

$json_file = file_get_contents("static/departamentos.json");
$dpto_data = json_decode(utf8_encode($json_file), true);

if ($idDepartamento > 0) {
  $dpto_key = isset($dpto_index[$idDepartamento - 1]) ? $dpto_index[$idDepartamento - 1] : false;
  $dpto_municipios = $dpto_data[$dpto_key];

  if ($dpto_key) {
    echo json_encode([
      "status" => true,
      "content" => $dpto_municipios
    ]);
  } else {
    echo json_encode([
      "status" => false,
      "content" => "Departamento no existe."
    ]);
  }

} else {
  // Devolvemos la data de todos los departamentos
  echo json_encode([
    "status" => true,
    "content" => $dpto_data
  ]);
}
