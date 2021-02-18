<?php
require_once('BaseAction.php');

class Municipales extends BaseAction {
  public $id = "";
  public $documentFilename = "";
  public $updatedDataString = "";

  function __construct($idMunicipio, $jsonDecoded, $actionName = "municipales") {
    parent::__construct($jsonDecoded, $actionName);

    $this->id = $idMunicipio;
    $this->documentFilename = realpath("../documents/") . "/" . $this->id . ".json";
  }

  public function updateDocument() {
    if (file_exists($this->documentFilename)) {
      $originalJsonFile = file_get_contents($this->documentFilename);
      $originalJsonDecoded = json_decode($originalJsonFile, true);

      $updatedJsonDecoded = $this->updateKeyValues($originalJsonDecoded, $this->data);
      $updatedJsonFile = json_encode($updatedJsonDecoded, JSON_PRETTY_PRINT);
      $this->data = $updatedJsonDecoded;

      return file_put_contents($this->documentFilename, $updatedJsonFile) ? true : false;
    } else throw new Error("El documento no existe.");
  }

  private function updateKeyValues($current, $new) {
    foreach ($new as $key => $value) {
      $current["ganador"][$key] = $value;
    }
    return $current;
  }
}
