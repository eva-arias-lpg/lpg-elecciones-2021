<?php
require_once('BaseAction.php');

class Asamblea extends BaseAction {
  public $documentFilename = "";
  public $updatedDataString = "";

  function __construct($jsonDecoded, $actionName = "asamblea") {
    parent::__construct($jsonDecoded, $actionName);
    $this->documentFilename = realpath("../documents/") . "/asamblea.json";
  }

  public function updateDocument() {
    if (file_exists($this->documentFilename)) {
      $originalJsonFile = file_get_contents($this->documentFilename);
      $originalJsonDecoded = json_decode($originalJsonFile, true);

      $updatedJsonDecoded = $this->updateKeyValues($originalJsonDecoded, $this->data);
      $updatedJsonFile = json_encode($updatedJsonDecoded, JSON_PRETTY_PRINT);
      $this->data = $updatedJsonDecoded;

      return file_put_contents($this->documentFilename, $updatedJsonFile) 
        ? true 
        : false;
    } else throw new Error("El documento no puede actualizarse porque no existe.");
  }

  public function isEscaniosSumValid() {
    // Vamos a ver que la suma de escaños no sobrepasa 84
    $sum = 0;
    
    foreach($this->data["escanios"] as $key => $value) {
      $sum = $sum + $value;
    }

    if ($sum > 84) throw new Error("Suma de escaños excede 84.");
    else return true;
  }

  private function updateKeyValues($current, $new) {
    foreach ($new as $key => $value) {
      if ($key == "escanios") {
        foreach ($new["escanios"] as $key => $value) {
          $current["escanios"][$key] = $value;
        }
      } else {
        $current[$key] = $value;
      }
    }
    return $current;
  }
}
