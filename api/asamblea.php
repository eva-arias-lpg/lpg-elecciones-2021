<?php
header('Content-Type: application/json');

try {
  $file = file_get_contents('documentos/asamblea.json');
  if (json_decode($file, true))
    header('Location: references/asamblea.json');
  else throw new Error("Error al parsear archivo json");
} catch (Throwable $e) {
  echo json_encode([
    "status" => false,
    "content" => "Ha ocurrido un error"
  ]);
}
