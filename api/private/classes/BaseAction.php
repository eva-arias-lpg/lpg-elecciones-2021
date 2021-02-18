<?php
// require "../vendor/autoload.php";

class BaseAction {
  public $json;
  public $data;

  function __construct($json_decoded, $actionName) {
    if ($this->validateJSON($json_decoded, $actionName)) {
      // Exponemos la data en un array asociativo
      $json_encoded = json_encode($json_decoded);
      $this->data = json_decode($json_encoded, true);
    }
  }

  private function validateJSON($json_decoded, $actionName) {
    $validator = new JsonSchema\Validator;
    $validator->validate($json_decoded, (object)['$ref' => 'file://' . realpath("validation/$actionName.schema.json")]);

    if ($validator->isValid()) {
      return true;
    } else {
      $error_msg = "";

      foreach ($validator->getErrors() as $error) {
        $error_msg .= $error['property'] . " - ". $error['message'];
      }

      throw new Error($error_msg);
    }
  }

}