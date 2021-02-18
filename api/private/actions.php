<?php
require("vendor/autoload.php");

header('Content-Type: application/json');
$action = isset($_GET['value']) ? $_GET['value'] : "";
$upload = isset($_GET['upload']) ? $_GET['upload'] : ""; 
$id = isset($_GET['id']) ? $_GET['id'] : "";

function validateJSONRequestBody() {
  // Recibimos un JSON, para actualizar los campos del documento de referencia.
  // 1. Validamos que efectivamente sea un documento JSON.
  $request_body = file_get_contents('php://input');
  $json_decoded = json_decode($request_body);

  if (is_null($json_decoded)) {
    throw new Error("JSON no válido.");
  } else return $json_decoded;
}

try {
  if ($action === "municipales" && !empty($id)) {
    // $json_decoded = json_decode($_POST) 
    if ($upload === 'file' && isset($_FILES["new_file"])) {
      // Vamos a subir una nueva bandera de ganador...
      $file = $_FILES["new_file"];
      $filename = "resources/banderas/" . time() . ".svg";

      $success = move_uploaded_file($file['tmp_name'], "../" . $filename);

      if ($success) {
        // Actualizamos el documento para reflejar el nuevo recurso
        require_once('classes/Municipales.php');
        $json = json_decode('{ "img_partido": "' . $filename . '" }');
        $municipal = new Municipales($id, $json);
        $success = $municipal->updateDocument();
      }

      echo json_encode([
        "status" => $success,
        "content" => $filename,
      ]);
      
    } else {
      $json_decoded = validateJSONRequestBody();
      
      require_once('classes/Municipales.php');
      $municipal = new Municipales($id, $json_decoded);
      $isUpdated = $municipal->updateDocument();
      
      echo json_encode([
        "status" => $isUpdated,
        "content" => $municipal->data
      ]);
    }
    // $data = new Municipales('{ "departamento": "San Salvador", "ganador": { "partido": "NT" } }');
  } else if ($action === "asamblea") {
    $json_decoded = validateJSONRequestBody();

    require_once('classes/Asamblea.php');
    $asamblea = new Asamblea($json_decoded);

    if ($asamblea->isEscaniosSumValid()) {
      $isUpdated = $asamblea->updateDocument();

      echo json_encode([
        "status" => $isUpdated,
        "content" => $asamblea->data
      ]);
    }
  }

} catch (Throwable $e) {
  echo json_encode([
    "status" => false,
    "content" => 
      "Ocurrio un error: ". PHP_EOL . $e->getMessage()
  ]);
  exit();
}
