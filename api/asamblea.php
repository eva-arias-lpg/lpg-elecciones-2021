<?php
header('Content-Type: application/json');

try {
  $file = file_get_contents('documents/asamblea.json');
  if (json_decode($file, true))
    header('Location: documents/asamblea.json');
  else throw new Error("Error al parsear archivo json");
} catch (Throwable $e) {
  echo json_encode([
    "status" => false,
    "content" => "Ha ocurrido un error"
  ]);
}
