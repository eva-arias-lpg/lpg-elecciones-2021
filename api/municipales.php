<?php
header('Content-Type: application/json;charset=utf8');

$idMunicipio = isset($_GET['id']) ? $_GET['id'] : false;
error_reporting(0);

if ($idMunicipio) {
  $json_filename = "documents/$idMunicipio.json";
  $json_file = file_exists($json_filename) ? file_get_contents($json_filename) : false;

  if ($json_file) {
    // header("Location: ../$json_filename");
    echo utf8_encode($json_file);
  } else {
    http_response_code(404);
    echo json_encode([
      "status" => false,
      "content" => "No data."
    ]);
  }
} else {
  $reference = file_exists('static/municipios.json') ? file_get_contents('static/municipios.json') : '{ "index": [] }';
  
  $json = utf8_encode($reference);
  $json_array = json_decode(utf8_encode($json), true);
  if (isset($json["index"]) && count($json["index"]) > 0) {
    // header('Location: static/municipios.json');
    echo $json;
  } else {
    http_response_code(500);
    echo json_encode([
      "status" => false,
      "content" => "Hubo un problema con el archivo JSON"
    ]);
  }
}
